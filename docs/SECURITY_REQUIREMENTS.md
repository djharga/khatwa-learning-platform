# Security Requirements - Backend

متطلبات الأمان التي يجب تطبيقها في Backend.

## 1. Authentication & Authorization

### 1.1 Authentication Method

- استخدام **httpOnly cookies** لتخزين session tokens
- استخدام **JWT tokens** (اختياري) للـ stateless authentication
- **عدم** استخدام localStorage أو sessionStorage للـ tokens

### 1.2 Session Management

- Session timeout: 30 دقيقة من عدم النشاط
- Remember me: تمديد الجلسة إلى 30 يوم
- Secure flag: تفعيل Secure flag في cookies (HTTPS only)
- SameSite: استخدام `SameSite=Strict` لمنع CSRF

### 1.3 Password Security

- **Hashing**: استخدام bcrypt أو Argon2
- **Salt**: استخدام salt عشوائي لكل كلمة مرور
- **Minimum length**: 8 أحرف على الأقل
- **Complexity**: يتطلب حرف صغير، حرف كبير، ورقم على الأقل
- **Password reset**: استخدام tokens آمنة مع expiration

### 1.4 Role-Based Access Control (RBAC)

الصلاحيات المطلوبة:
- `student` - طالب
- `instructor` - مدرب
- `admin` - مدير
- `company` - شركة

**Authorization checks:**
- التحقق من الصلاحيات في كل endpoint
- منع الوصول للموارد غير المصرح بها
- تسجيل محاولات الوصول غير المصرح بها

---

## 2. CSRF Protection

### 2.1 CSRF Tokens

- إنشاء CSRF token لكل session
- تخزين CSRF token في httpOnly cookie
- إرسال CSRF token في header `X-CSRF-Token` أو `X-XSRF-TOKEN`
- التحقق من CSRF token في كل POST/PUT/DELETE request

### 2.2 Double Submit Cookie Pattern

- إرسال CSRF token في cookie و header
- مقارنة القيمتين للتأكد من صحتهما

---

## 3. Input Validation & Sanitization

### 3.1 Server-Side Validation

**يجب تطبيق validation على Backend حتى لو تم تطبيقه في Frontend**

- **Email**: التحقق من format صحيح
- **Phone**: التحقق من format صحيح (Saudi numbers)
- **File uploads**: التحقق من MIME type، extension، وحجم الملف
- **SQL Injection**: استخدام parameterized queries
- **XSS**: تنظيف جميع user inputs

### 3.2 Sanitization

- تنظيف HTML من script tags
- Escape special characters
- Sanitize file names
- Validate URLs

---

## 4. File Upload Security

### 4.1 File Type Validation

- **Whitelist approach**: السماح فقط بالأنواع المحددة
- التحقق من MIME type الفعلي (ليس فقط extension)
- التحقق من file signature (magic numbers)

### 4.2 File Size Limits

- **Images**: 10MB
- **Documents**: 50MB
- **Videos**: 500MB
- **Audio**: 50MB

### 4.3 File Storage

- تخزين الملفات خارج web root
- استخدام secure storage paths
- Generate unique file names
- Scan for viruses (recommended)

### 4.4 File Access Control

- التحقق من صلاحيات المستخدم قبل السماح بالتحميل
- استخدام signed URLs للتحميل المؤقت
- منع الوصول المباشر للملفات

---

## 5. Rate Limiting

### 5.1 Rate Limits

- **Authentication endpoints**: 5 requests/minute per IP
- **File upload**: 10 requests/minute per user
- **General API**: 100 requests/minute per user
- **Admin endpoints**: 50 requests/minute per user

### 5.2 Implementation

- استخدام Redis أو memory store
- IP-based limiting للـ authentication
- User-based limiting للـ API calls
- Return appropriate headers (Retry-After, X-RateLimit-*)

---

## 6. Security Headers

### 6.1 Required Headers

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'; ...
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

### 6.2 CORS

- تحديد allowed origins بدقة
- استخدام credentials: true
- تحديد allowed methods و headers

---

## 7. Error Handling

### 7.1 Error Messages

- **عدم** كشف معلومات حساسة في error messages
- رسائل خطأ عامة للمستخدمين
- تسجيل تفاصيل الخطأ في logs (للمطورين فقط)

### 7.2 Logging

- تسجيل جميع محاولات الوصول المشبوهة
- تسجيل failed login attempts
- تسجيل unauthorized access attempts
- عدم تسجيل passwords أو tokens في logs

---

## 8. Database Security

### 8.1 SQL Injection Prevention

- استخدام parameterized queries
- استخدام ORM (Object-Relational Mapping)
- عدم استخدام string concatenation في queries

### 8.2 Database Access

- استخدام least privilege principle
- استخدام connection pooling
- Encrypt sensitive data at rest

---

## 9. API Security

### 9.1 API Authentication

- التحقق من authentication في كل request
- استخدام middleware للتحقق من الصلاحيات
- منع access للموارد غير المصرح بها

### 9.2 API Versioning

- استخدام versioning للـ API
- Deprecation strategy واضح

---

## 10. Environment Variables

### 10.1 Secrets Management

- **عدم** commit secrets في git
- استخدام environment variables للـ secrets
- استخدام secret management service (AWS Secrets Manager, etc.)

### 10.2 Required Secrets

```
JWT_SECRET=your-secret-key-here
SESSION_SECRET=your-session-secret-here
CSRF_SECRET=your-csrf-secret-here
DATABASE_URL=your-database-url-here
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
```

---

## 11. Monitoring & Alerting

### 11.1 Security Monitoring

- مراقبة failed login attempts
- مراقبة unauthorized access attempts
- مراقبة unusual patterns
- Alerting عند اكتشاف threats

### 11.2 Logging

- Centralized logging
- Log retention policy
- Log analysis tools

---

## 12. Compliance

### 12.1 Data Protection

- تطبيق GDPR principles (إذا كان مطلوباً)
- تطبيق data retention policies
- User data deletion capabilities

### 12.2 Privacy

- Privacy policy
- Terms of service
- Cookie consent (إذا كان مطلوباً)

---

## Checklist

- [ ] httpOnly cookies للـ sessions
- [ ] CSRF protection
- [ ] Input validation & sanitization
- [ ] File upload security
- [ ] Rate limiting
- [ ] Security headers
- [ ] Error handling آمن
- [ ] SQL injection prevention
- [ ] Password hashing (bcrypt/Argon2)
- [ ] Role-based access control
- [ ] Logging & monitoring
- [ ] Environment variables management
- [ ] HTTPS only (production)
- [ ] Regular security updates

---

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP API Security](https://owasp.org/www-project-api-security/)
- [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/)

