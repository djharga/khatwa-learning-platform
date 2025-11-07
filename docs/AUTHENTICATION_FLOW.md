# Authentication Flow - Backend Implementation Guide

دليل شامل لتنفيذ نظام المصادقة في Backend.

## Overview

النظام يستخدم **httpOnly cookies** لتخزين session tokens، مع **CSRF protection** لجميع الطلبات.

---

## 1. Login Flow

### Step 1: User Submits Login Form

```
Frontend → POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123",
  "rememberMe": false
}
```

### Step 2: Backend Validates Credentials

1. التحقق من وجود المستخدم في قاعدة البيانات
2. التحقق من صحة كلمة المرور (bcrypt comparison)
3. التحقق من حالة المستخدم (active/suspended)

### Step 3: Create Session

1. إنشاء session ID عشوائي وآمن
2. إنشاء CSRF token عشوائي
3. حفظ Session في database/Redis:
   ```json
   {
     "sessionId": "session-abc123",
     "userId": "user-123",
     "role": "student",
     "createdAt": "2024-01-01T00:00:00Z",
     "expiresAt": "2024-01-01T00:30:00Z",  // 30 minutes
     "rememberMe": false
   }
   ```

### Step 4: Set Cookies

```http
Set-Cookie: session=session-abc123; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=1800
Set-Cookie: csrf-token=csrf-xyz789; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=1800
```

**ملاحظات:**
- `HttpOnly`: منع JavaScript من الوصول للـ cookie
- `Secure`: إرسال cookie فقط عبر HTTPS
- `SameSite=Strict`: منع CSRF attacks
- `Max-Age`: 1800 ثانية (30 دقيقة) أو 2592000 (30 يوم) إذا كان rememberMe = true

### Step 5: Return User Data

```json
{
  "user": {
    "id": "user-123",
    "name": "أحمد محمد",
    "email": "user@example.com",
    "role": "student",
    "avatar": "https://example.com/avatar.jpg",
    "isPremium": false
  }
}
```

---

## 2. Authenticated Request Flow

### Step 1: Frontend Sends Request

```http
GET /api/courses
Cookie: session=session-abc123
X-CSRF-Token: csrf-xyz789
```

### Step 2: Backend Middleware Checks

1. **Extract Session ID** من cookie
2. **Validate Session**:
   - التحقق من وجود session في database/Redis
   - التحقق من expiration
   - التحقق من active status
3. **Validate CSRF Token**:
   - قراءة CSRF token من cookie
   - مقارنته مع header `X-CSRF-Token`
   - يجب أن تكونا متطابقتين
4. **Load User Data** من database
5. **Attach User to Request** (req.user)

### Step 3: Process Request

- الوصول لـ `req.user` في route handler
- تنفيذ العملية المطلوبة
- إرجاع النتيجة

---

## 3. Logout Flow

### Step 1: Frontend Sends Logout Request

```http
POST /api/auth/logout
Cookie: session=session-abc123
X-CSRF-Token: csrf-xyz789
```

### Step 2: Backend Invalidates Session

1. حذف session من database/Redis
2. Clear cookies:

```http
Set-Cookie: session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0
Set-Cookie: csrf-token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0
```

### Step 3: Return Success

```json
{
  "message": "تم تسجيل الخروج بنجاح"
}
```

---

## 4. Session Refresh Flow

### Step 1: Frontend Detects Expiring Session

عندما تقترب الجلسة من الانتهاء (مثلاً قبل 5 دقائق)، Frontend يرسل:

```http
POST /api/auth/refresh
Cookie: session=session-abc123
X-CSRF-Token: csrf-xyz789
```

### Step 2: Backend Refreshes Session

1. التحقق من صحة session الحالية
2. إنشاء session جديد
3. تحديث expiration time
4. إرجاع cookies جديدة

```http
Set-Cookie: session=session-new456; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=1800
Set-Cookie: csrf-token=csrf-new789; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=1800
```

---

## 5. Authorization Flow (RBAC)

### Step 1: Check User Role

في middleware أو route handler:

```javascript
// Example (Node.js/Express)
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    next();
  };
}

// Usage
app.get('/api/admin/users', requireAuth, requireRole('admin'), getUsers);
```

### Step 2: Resource-Level Authorization

التحقق من صلاحيات المستخدم على مورد محدد:

```javascript
// Example: Check if user owns the resource
async function checkResourceOwnership(req, res, next) {
  const fileId = req.params.fileId;
  const file = await getFile(fileId);
  
  if (file.userId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  next();
}
```

---

## 6. Error Handling

### 6.1 Unauthenticated (401)

```json
{
  "error": "Unauthorized",
  "message": "غير مصرح لك بالوصول. يرجى تسجيل الدخول",
  "code": "UNAUTHORIZED"
}
```

### 6.2 Unauthorized (403)

```json
{
  "error": "Forbidden",
  "message": "ليس لديك صلاحية للوصول إلى هذا المورد",
  "code": "FORBIDDEN"
}
```

### 6.3 Invalid CSRF Token

```json
{
  "error": "Invalid CSRF Token",
  "message": "رمز CSRF غير صحيح",
  "code": "INVALID_CSRF"
}
```

### 6.4 Session Expired

```json
{
  "error": "Session Expired",
  "message": "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى",
  "code": "SESSION_EXPIRED"
}
```

---

## 7. Implementation Example (Node.js/Express)

### 7.1 Session Middleware

```javascript
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  name: 'session',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 60 * 1000, // 30 minutes
  },
}));
```

### 7.2 CSRF Middleware

```javascript
const csrf = require('csurf');

const csrfProtection = csrf({ 
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  }
});

app.use(csrfProtection);

// Make CSRF token available to frontend
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
```

### 7.3 Authentication Middleware

```javascript
async function requireAuth(req, res, next) {
  const sessionId = req.cookies.session;
  
  if (!sessionId) {
    return res.status(401).json({ 
      error: 'Unauthorized',
      message: 'غير مصرح لك بالوصول. يرجى تسجيل الدخول'
    });
  }
  
  // Validate session
  const session = await getSession(sessionId);
  
  if (!session || session.expiresAt < new Date()) {
    return res.status(401).json({ 
      error: 'Session Expired',
      message: 'انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى'
    });
  }
  
  // Load user
  const user = await getUserById(session.userId);
  req.user = user;
  
  next();
}
```

### 7.4 Login Route

```javascript
app.post('/api/auth/login', async (req, res) => {
  const { email, password, rememberMe } = req.body;
  
  // Validate input
  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ 
      error: 'Invalid credentials',
      message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
    });
  }
  
  // Verify password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ 
      error: 'Invalid credentials',
      message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
    });
  }
  
  // Create session
  const sessionId = generateSessionId();
  const csrfToken = generateCsrfToken();
  const expiresAt = rememberMe 
    ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    : new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
  
  await saveSession({
    sessionId,
    userId: user.id,
    csrfToken,
    expiresAt,
  });
  
  // Set cookies
  res.cookie('session', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 30 * 60 * 1000,
  });
  
  res.cookie('csrf-token', csrfToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 30 * 60 * 1000,
  });
  
  // Return user data (without sensitive info)
  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      isPremium: user.isPremium,
    },
  });
});
```

---

## 8. Security Best Practices

1. **Never store passwords in plain text**
2. **Use strong session IDs** (cryptographically random)
3. **Rotate CSRF tokens** periodically
4. **Implement session timeout**
5. **Log security events** (failed logins, unauthorized access)
6. **Use HTTPS** in production
7. **Validate all inputs** on server-side
8. **Implement rate limiting** on authentication endpoints
9. **Monitor for suspicious activity**
10. **Regular security audits**

---

## 9. Testing

### Test Cases

1. ✅ Login with valid credentials
2. ✅ Login with invalid credentials
3. ✅ Login with expired session
4. ✅ Access protected route without authentication
5. ✅ Access protected route with invalid CSRF token
6. ✅ Access admin route as non-admin user
7. ✅ Logout and verify session is invalidated
8. ✅ Session refresh before expiration
9. ✅ Session refresh after expiration
10. ✅ Remember me functionality

---

## 10. Troubleshooting

### Common Issues

1. **Cookies not being set**
   - Check Secure flag (must be false in development)
   - Check SameSite policy
   - Check domain/path settings

2. **CSRF token mismatch**
   - Ensure token is read from cookie correctly
   - Ensure token is sent in header correctly
   - Check token expiration

3. **Session not persisting**
   - Check session store configuration
   - Check Redis connection (if using Redis)
   - Check session expiration settings

