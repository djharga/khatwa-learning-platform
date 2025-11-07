# API Documentation - Backend Requirements

هذا التوثيق يوضح جميع API endpoints المطلوبة من Backend للـ Frontend.

## Base URL

```
{API_URL}/api
```

حيث `API_URL` هو قيمة `NEXT_PUBLIC_API_URL` من environment variables.

## Authentication

جميع الطلبات (ما عدا `/auth/login` و `/auth/register`) تتطلب authentication.

### Headers المطلوبة

```
Authorization: Bearer {token}  // Optional - إذا كان Backend يستخدم Bearer tokens
Cookie: session={session_id}    // Required - httpOnly cookie
X-CSRF-Token: {csrf_token}      // Required - CSRF protection
```

---

## Authentication Endpoints

### POST /auth/login

تسجيل الدخول.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "rememberMe": false
}
```

**Response (200 OK):**
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

**Response Headers:**
- `Set-Cookie: session={session_id}; HttpOnly; Secure; SameSite=Strict`
- `Set-Cookie: csrf-token={csrf_token}; HttpOnly; Secure; SameSite=Strict`

**Errors:**
- `401 Unauthorized` - بيانات الدخول غير صحيحة
- `422 Validation Error` - البيانات المدخلة غير صحيحة

---

### POST /auth/register

التسجيل كـ مستخدم جديد.

**Request Body:**
```json
{
  "name": "أحمد محمد",
  "email": "user@example.com",
  "password": "password123",
  "userType": "student",
  "companyName": "شركة مثال",  // Optional - مطلوب إذا كان userType = "company"
  "phone": "+966501234567"      // Optional
}
```

**Response (201 Created):**
```json
{
  "user": {
    "id": "user-123",
    "name": "أحمد محمد",
    "email": "user@example.com",
    "role": "student",
    "isPremium": false
  }
}
```

**Errors:**
- `400 Bad Request` - البيانات غير صحيحة
- `409 Conflict` - البريد الإلكتروني موجود مسبقاً

---

### POST /auth/logout

تسجيل الخروج.

**Response (200 OK):**
```json
{
  "message": "تم تسجيل الخروج بنجاح"
}
```

**Response Headers:**
- `Set-Cookie: session=; HttpOnly; Secure; SameSite=Strict; Max-Age=0`
- `Set-Cookie: csrf-token=; HttpOnly; Secure; SameSite=Strict; Max-Age=0`

---

### GET /auth/me

التحقق من حالة المصادقة الحالية.

**Response (200 OK):**
```json
{
  "user": {
    "id": "user-123",
    "name": "أحمد محمد",
    "email": "user@example.com",
    "role": "student",
    "avatar": "https://example.com/avatar.jpg",
    "isPremium": false
  },
  "isAuthenticated": true
}
```

**Response (401 Unauthorized):**
```json
{
  "isAuthenticated": false
}
```

---

### POST /auth/refresh

تحديث session token.

**Response (200 OK):**
```json
{
  "message": "تم تحديث الجلسة"
}
```

**Response Headers:**
- `Set-Cookie: session={new_session_id}; HttpOnly; Secure; SameSite=Strict`

---

## User Endpoints

### GET /users/:userId

الحصول على بيانات مستخدم.

**Response (200 OK):**
```json
{
  "id": "user-123",
  "name": "أحمد محمد",
  "email": "user@example.com",
  "role": "student",
  "avatar": "https://example.com/avatar.jpg",
  "isPremium": false,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

---

### PUT /users/:userId

تحديث بيانات مستخدم.

**Request Body:**
```json
{
  "name": "أحمد محمد",
  "email": "newemail@example.com",
  "phone": "+966501234567",
  "bio": "وصف المستخدم"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "user-123",
    "name": "أحمد محمد",
    "email": "newemail@example.com",
    ...
  }
}
```

---

## Courses Endpoints

### GET /courses

الحصول على قائمة الدورات.

**Query Parameters:**
- `search` (optional) - نص البحث
- `category` (optional) - الفئة
- `level` (optional) - المستوى
- `status` (optional) - الحالة
- `page` (optional, default: 1) - رقم الصفحة
- `limit` (optional, default: 10) - عدد النتائج

**Response (200 OK):**
```json
{
  "courses": [
    {
      "id": "course-123",
      "title": "دورة المحاسبة المالية",
      "description": "...",
      "category": "المحاسبة المالية",
      "level": "beginner",
      "instructor": {
        "id": "instructor-123",
        "name": "د. محمد أحمد"
      },
      "price": 299,
      "image": "https://example.com/image.jpg"
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 10
}
```

---

### GET /courses/:courseId

الحصول على تفاصيل دورة.

**Response (200 OK):**
```json
{
  "id": "course-123",
  "title": "دورة المحاسبة المالية",
  "description": "...",
  "modules": [
    {
      "id": "module-123",
      "title": "المحاسبة الأساسية",
      "lessons": [...]
    }
  ]
}
```

---

### POST /courses/:courseId/enroll

التسجيل في دورة.

**Response (201 Created):**
```json
{
  "message": "تم التسجيل في الدورة بنجاح",
  "enrollment": {
    "id": "enrollment-123",
    "courseId": "course-123",
    "userId": "user-123",
    "enrolledAt": "2024-01-01T00:00:00Z"
  }
}
```

---

## Storage Endpoints

### GET /storage/files

الحصول على ملفات المستخدم.

**Query Parameters:**
- `userId` (required) - معرف المستخدم
- `folderId` (optional) - معرف المجلد
- `type` (optional) - نوع الملف
- `search` (optional) - نص البحث
- `limit` (optional) - عدد النتائج
- `offset` (optional) - الإزاحة

**Response (200 OK):**
```json
{
  "files": [
    {
      "id": "file-123",
      "name": "document.pdf",
      "type": "document",
      "size": 1024000,
      "mimeType": "application/pdf",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 10
}
```

---

### POST /storage/files

رفع ملف جديد.

**Request (multipart/form-data):**
- `file` (File) - الملف
- `userId` (string) - معرف المستخدم
- `folderId` (string, optional) - معرف المجلد
- `metadata` (JSON string, optional) - البيانات الوصفية

**Response (201 Created):**
```json
{
  "file": {
    "id": "file-123",
    "name": "document.pdf",
    "type": "document",
    "size": 1024000,
    "storageKey": "users/user-123/files/document.pdf",
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "uploadUrl": "https://storage.example.com/files/file-123"
}
```

**Errors:**
- `400 Bad Request` - نوع الملف غير مسموح أو حجمه كبير جداً
- `413 Payload Too Large` - حجم الملف كبير جداً

---

### DELETE /storage/files/:fileId

حذف ملف.

**Query Parameters:**
- `userId` (required) - معرف المستخدم

**Response (200 OK):**
```json
{
  "message": "تم حذف الملف بنجاح"
}
```

---

### GET /storage/files/:fileId/download

الحصول على رابط تحميل مؤقت.

**Query Parameters:**
- `userId` (required) - معرف المستخدم

**Response (200 OK):**
```json
{
  "url": "https://storage.example.com/files/file-123?token=temp-token",
  "expiresIn": 3600
}
```

---

## Admin Endpoints

### GET /admin/users

الحصول على قائمة المستخدمين (Admin only).

**Query Parameters:**
- `search` (optional) - نص البحث
- `userType` (optional) - نوع المستخدم
- `status` (optional) - الحالة

**Response (200 OK):**
```json
{
  "users": [
    {
      "id": "user-123",
      "name": "أحمد محمد",
      "email": "user@example.com",
      "userType": "student",
      "status": "active",
      "storageUsed": 1200,
      "storageLimit": 5120
    }
  ],
  "total": 100
}
```

---

### POST /admin/users

إضافة مستخدم جديد (Admin only).

**Request Body:**
```json
{
  "name": "أحمد محمد",
  "email": "user@example.com",
  "phone": "+966501234567",
  "userType": "student",
  "companyName": "شركة مثال",
  "storageLimit": 5120
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "user": {
    "id": "user-123",
    ...
  }
}
```

---

## Error Responses

جميع الأخطاء تتبع هذا التنسيق:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "message": "رسالة الخطأ بالعربية",
  "errors": {
    "field": "رسالة خطأ للحقل"
  }
}
```

### Status Codes

- `400 Bad Request` - البيانات غير صحيحة
- `401 Unauthorized` - غير مصرح (غير مسجل دخول)
- `403 Forbidden` - ليس لديك صلاحية
- `404 Not Found` - المورد غير موجود
- `409 Conflict` - تعارض (مثل: البريد موجود مسبقاً)
- `422 Validation Error` - خطأ في التحقق من البيانات
- `429 Too Many Requests` - تم تجاوز الحد المسموح
- `500 Internal Server Error` - خطأ في الخادم

---

## Rate Limiting

يُنصح بتطبيق rate limiting على جميع endpoints:

- **Authentication endpoints**: 5 requests per minute per IP
- **File upload**: 10 requests per minute per user
- **General API**: 100 requests per minute per user
- **Admin endpoints**: 50 requests per minute per user

Response headers عند تجاوز الحد:
```
Retry-After: 60
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1234567890
```

---

## File Upload Specifications

### Allowed File Types

- **Images**: jpg, jpeg, png, gif, webp, svg (max 10MB)
- **Documents**: pdf, doc, docx, xls, xlsx, ppt, pptx, txt (max 50MB)
- **Videos**: mp4, webm, ogg, mov (max 500MB)
- **Audio**: mp3, wav, ogg, webm (max 50MB)

### Validation Requirements

1. **MIME Type validation** - التحقق من MIME type الفعلي للملف
2. **File extension validation** - التحقق من extension
3. **File size validation** - التحقق من الحجم
4. **File name sanitization** - تنظيف اسم الملف
5. **Virus scanning** (recommended) - فحص الفيروسات

---

## Notes

1. جميع التواريخ في تنسيق ISO 8601 (UTC)
2. جميع النصوص بالعربية (UTF-8)
3. استخدام pagination للقوائم الكبيرة
4. تطبيق caching حيثما أمكن
5. استخدام compression للاستجابات الكبيرة

