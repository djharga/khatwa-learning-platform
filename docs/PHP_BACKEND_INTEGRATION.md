# 🔗 دليل ربط PHP Backend مع منصة خطى (Next.js)

**دليل شامل للمبرمج الباك اند (PHP) لربط Backend مع Frontend**

---

## 📋 جدول المحتويات

1. [نظرة عامة](#نظرة-عامة)
2. [المتطلبات الأساسية](#المتطلبات-الأساسية)
3. [إعداد PHP Backend](#إعداد-php-backend)
4. [هيكل API المطلوب](#هيكل-api-المطلوب)
5. [ربط PHP مع Next.js](#ربط-php-مع-nextjs)
6. [المصادقة والتفويض](#المصادقة-والتفويض)
7. [معالجة الأخطاء](#معالجة-الأخطاء)
8. [أمثلة عملية](#أمثلة-عملية)
9. [أفضل الممارسات](#أفضل-الممارسات)
10. [استكشاف الأخطاء](#استكشاف-الأخطاء)

---

## 🎯 نظرة عامة

منصة خطى تستخدم **Next.js 14** كـ Frontend مع **App Router**. جميع طلبات API يتم توجيهها من خلال Next.js API Routes (`/api/*`) والتي بدورها تتواصل مع PHP Backend.

### البنية المعمارية:

```
Frontend (Next.js) → API Routes (/api/*) → PHP Backend → Database
```

### المزايا:
- ✅ **أمان محسّن**: API Routes تعمل كطبقة وسيطة
- ✅ **CORS محسّن**: لا حاجة لإعداد CORS معقد في PHP
- ✅ **Type Safety**: TypeScript في Next.js يضمن نوعية البيانات
- ✅ **Error Handling**: معالجة موحدة للأخطاء

---

## 📦 المتطلبات الأساسية

### في PHP Backend:
- PHP 7.4+ أو 8.0+
- Composer (لإدارة المكتبات)
- PDO أو MySQLi (للاتصال بقاعدة البيانات)
- JSON Extension (مدمج في PHP 7.4+)

### المكتبات الموصى بها:
```json
{
  "require": {
    "php": ">=7.4",
    "guzzlehttp/guzzle": "^7.0",
    "firebase/php-jwt": "^6.0",
    "vlucas/phpdotenv": "^5.0"
  }
}
```

### في Next.js:
- Next.js 14+
- Axios (مدمج في المشروع)
- Environment Variables (`.env.local`)

---

## 🛠 إعداد PHP Backend

### 1. هيكل المشروع الموصى به

```
php-backend/
├── api/
│   ├── index.php              # نقطة الدخول الرئيسية
│   ├── config/
│   │   ├── database.php       # إعدادات قاعدة البيانات
│   │   ├── cors.php           # إعدادات CORS
│   │   └── auth.php           # إعدادات المصادقة
│   ├── controllers/
│   │   ├── CourseController.php
│   │   ├── UserController.php
│   │   └── AuthController.php
│   ├── models/
│   │   ├── Course.php
│   │   └── User.php
│   ├── middleware/
│   │   ├── AuthMiddleware.php
│   │   └── ValidationMiddleware.php
│   └── utils/
│       ├── Response.php
│       └── Validator.php
├── .env                        # متغيرات البيئة
└── composer.json
```

### 2. ملف `api/index.php` (نقطة الدخول)

```php
<?php
/**
 * نقطة الدخول الرئيسية لـ API
 * منصة خطى - Khatwa Learning Platform
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: http://localhost:5000'); // Next.js dev server
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-CSRF-Token');
header('Access-Control-Allow-Credentials: true');

// معالجة OPTIONS request (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// تحميل Composer autoload
require_once __DIR__ . '/../vendor/autoload.php';

// تحميل ملفات الإعداد
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/config/cors.php';
require_once __DIR__ . '/utils/Response.php';

// استخراج المسار والطريقة
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = str_replace('/api', '', $path); // إزالة /api من المسار

// توجيه الطلبات
try {
    $router = new Router();
    $router->handle($method, $path);
} catch (Exception $e) {
    Response::error($e->getMessage(), 500);
}
```

### 3. ملف `config/database.php`

```php
<?php
/**
 * إعدادات قاعدة البيانات
 */

class Database {
    private static $instance = null;
    private $connection;

    private function __construct() {
        $host = $_ENV['DB_HOST'] ?? 'localhost';
        $dbname = $_ENV['DB_NAME'] ?? 'khatwa_db';
        $username = $_ENV['DB_USER'] ?? 'root';
        $password = $_ENV['DB_PASS'] ?? '';

        try {
            $this->connection = new PDO(
                "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
                $username,
                $password,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]
            );
        } catch (PDOException $e) {
            throw new Exception("فشل الاتصال بقاعدة البيانات: " . $e->getMessage());
        }
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->connection;
    }
}
```

### 4. ملف `utils/Response.php`

```php
<?php
/**
 * فئة مساعدة لإرسال الاستجابات الموحدة
 */

class Response {
    /**
     * إرسال استجابة نجاح
     */
    public static function success($data = null, $message = 'نجح', $statusCode = 200) {
        http_response_code($statusCode);
        echo json_encode([
            'success' => true,
            'message' => $message,
            'data' => $data,
            'timestamp' => date('Y-m-d H:i:s')
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }

    /**
     * إرسال استجابة خطأ
     */
    public static function error($message = 'حدث خطأ', $statusCode = 400, $errors = null) {
        http_response_code($statusCode);
        echo json_encode([
            'success' => false,
            'message' => $message,
            'errors' => $errors,
            'timestamp' => date('Y-m-d H:i:s')
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }

    /**
     * إرسال استجابة مع pagination
     */
    public static function paginated($data, $pagination, $message = 'نجح') {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => $message,
            'data' => $data,
            'pagination' => $pagination,
            'timestamp' => date('Y-m-d H:i:s')
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }
}
```

---

## 📡 هيكل API المطلوب

### 1. هيكل الاستجابة الموحد

جميع استجابات API يجب أن تتبع هذا الهيكل:

#### ✅ استجابة نجاح:
```json
{
  "success": true,
  "message": "تم بنجاح",
  "data": {
    // البيانات هنا
  },
  "timestamp": "2025-01-15 10:30:00"
}
```

#### ❌ استجابة خطأ:
```json
{
  "success": false,
  "message": "حدث خطأ",
  "errors": {
    "field": ["رسالة الخطأ"]
  },
  "timestamp": "2025-01-15 10:30:00"
}
```

#### 📄 استجابة مع Pagination:
```json
{
  "success": true,
  "message": "تم بنجاح",
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  },
  "timestamp": "2025-01-15 10:30:00"
}
```

### 2. Endpoints المطلوبة

#### 📚 الدورات (Courses)

**GET `/api/courses`** - الحصول على قائمة الدورات
```
Query Parameters:
- search: string (اختياري)
- category: string (اختياري)
- level: string (اختياري) - beginner, intermediate, advanced
- status: string (اختياري) - draft, published, archived
- isFeatured: boolean (اختياري)
- isPublished: boolean (اختياري)
- page: number (افتراضي: 1)
- limit: number (افتراضي: 10)
- sortBy: string (افتراضي: createdAt)
- sortDir: string (افتراضي: desc) - asc, desc
```

**GET `/api/courses/{courseId}`** - الحصول على تفاصيل دورة
```
Response:
{
  "success": true,
  "data": {
    "course": {
      "id": "string",
      "title": "string",
      "description": "string",
      "instructor": {...},
      "modules": [...],
      "price": number,
      "rating": number,
      "studentsCount": number
    }
  }
}
```

**POST `/api/courses`** - إنشاء دورة جديدة
```
Request Body (FormData):
- title: string (مطلوب)
- description: string (مطلوب)
- instructorId: string (مطلوب)
- category: string (مطلوب)
- level: string (مطلوب)
- price: number
- image: File (اختياري)
- startDate: string (اختياري)
- endDate: string (اختياري)
```

**PUT `/api/courses/{courseId}`** - تحديث دورة
```
Request Body (JSON):
{
  "title": "string",
  "description": "string",
  "price": number,
  ...
}
```

**DELETE `/api/courses/{courseId}`** - حذف دورة

#### 👤 المستخدمون (Users)

**GET `/api/admin/users`** - قائمة المستخدمين
**GET `/api/admin/users/{userId}`** - تفاصيل مستخدم
**POST `/api/admin/users`** - إنشاء مستخدم
**PUT `/api/admin/users/{userId}`** - تحديث مستخدم
**DELETE `/api/admin/users/{userId}`** - حذف مستخدم

#### 📧 التواصل (Contact)

**POST `/api/contact`** - إرسال رسالة تواصل
```
Request Body (JSON):
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

---

## 🔗 ربط PHP مع Next.js

### الطريقة 1: استخدام Next.js API Routes كوسيط (موصى به)

#### في Next.js (`src/app/api/courses/route.ts`):

```typescript
import { NextRequest, NextResponse } from 'next/server';

const PHP_API_URL = process.env.PHP_API_URL || 'http://localhost:8000/api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // بناء URL مع query parameters
    const queryString = searchParams.toString();
    const url = `${PHP_API_URL}/courses?${queryString}`;
    
    // إرسال الطلب إلى PHP Backend
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('Authorization') || '',
      },
      cache: 'no-store', // عدم التخزين المؤقت
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'فشل جلب الدورات' },
        { status: response.status }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'فشل الاتصال بالخادم' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // إرسال FormData مباشرة إلى PHP
    const response = await fetch(`${PHP_API_URL}/courses`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': request.headers.get('Authorization') || '',
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'فشل إنشاء الدورة' },
        { status: response.status }
      );
    }
    
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: 'فشل الاتصال بالخادم' },
      { status: 500 }
    );
  }
}
```

#### في PHP (`api/controllers/CourseController.php`):

```php
<?php
require_once __DIR__ . '/../models/Course.php';
require_once __DIR__ . '/../utils/Response.php';

class CourseController {
    private $courseModel;

    public function __construct() {
        $this->courseModel = new Course();
    }

    /**
     * GET /api/courses
     */
    public function index() {
        try {
            // استخراج query parameters
            $filters = [
                'search' => $_GET['search'] ?? null,
                'category' => $_GET['category'] ?? null,
                'level' => $_GET['level'] ?? null,
                'status' => $_GET['status'] ?? null,
                'isFeatured' => isset($_GET['isFeatured']) ? $_GET['isFeatured'] === 'true' : null,
                'isPublished' => isset($_GET['isPublished']) ? $_GET['isPublished'] === 'true' : null,
            ];

            $sort = [
                'field' => $_GET['sortBy'] ?? 'created_at',
                'direction' => $_GET['sortDir'] ?? 'desc',
            ];

            $page = (int)($_GET['page'] ?? 1);
            $limit = (int)($_GET['limit'] ?? 10);

            // جلب البيانات من قاعدة البيانات
            $result = $this->courseModel->getAll($filters, $sort, $page, $limit);

            Response::paginated(
                $result['courses'],
                [
                    'page' => $page,
                    'limit' => $limit,
                    'total' => $result['total'],
                    'totalPages' => ceil($result['total'] / $limit),
                ],
                'تم جلب الدورات بنجاح'
            );
        } catch (Exception $e) {
            Response::error($e->getMessage(), 500);
        }
    }

    /**
     * GET /api/courses/{id}
     */
    public function show($id) {
        try {
            $course = $this->courseModel->findById($id);
            
            if (!$course) {
                Response::error('الدورة غير موجودة', 404);
            }

            Response::success(['course' => $course], 'تم جلب الدورة بنجاح');
        } catch (Exception $e) {
            Response::error($e->getMessage(), 500);
        }
    }

    /**
     * POST /api/courses
     */
    public function store() {
        try {
            // التحقق من البيانات
            $data = [
                'title' => $_POST['title'] ?? null,
                'description' => $_POST['description'] ?? null,
                'instructor_id' => $_POST['instructorId'] ?? null,
                'category' => $_POST['category'] ?? null,
                'level' => $_POST['level'] ?? null,
                'price' => $_POST['price'] ?? 0,
            ];

            // التحقق من الحقول المطلوبة
            $required = ['title', 'description', 'instructor_id'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    Response::error("الحقل $field مطلوب", 400);
                }
            }

            // معالجة الصورة إذا كانت موجودة
            if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
                $data['image'] = $this->handleImageUpload($_FILES['image']);
            }

            // حفظ في قاعدة البيانات
            $course = $this->courseModel->create($data);

            Response::success(['course' => $course], 'تم إنشاء الدورة بنجاح', 201);
        } catch (Exception $e) {
            Response::error($e->getMessage(), 500);
        }
    }

    /**
     * PUT /api/courses/{id}
     */
    public function update($id) {
        try {
            // قراءة JSON body
            $input = json_decode(file_get_contents('php://input'), true);

            $data = [
                'title' => $input['title'] ?? null,
                'description' => $input['description'] ?? null,
                'price' => $input['price'] ?? null,
            ];

            // إزالة القيم الفارغة
            $data = array_filter($data, function($value) {
                return $value !== null;
            });

            $course = $this->courseModel->update($id, $data);

            if (!$course) {
                Response::error('الدورة غير موجودة', 404);
            }

            Response::success(['course' => $course], 'تم تحديث الدورة بنجاح');
        } catch (Exception $e) {
            Response::error($e->getMessage(), 500);
        }
    }

    /**
     * DELETE /api/courses/{id}
     */
    public function destroy($id) {
        try {
            $deleted = $this->courseModel->delete($id);

            if (!$deleted) {
                Response::error('الدورة غير موجودة', 404);
            }

            Response::success(null, 'تم حذف الدورة بنجاح');
        } catch (Exception $e) {
            Response::error($e->getMessage(), 500);
        }
    }

    /**
     * معالجة رفع الصورة
     */
    private function handleImageUpload($file) {
        $uploadDir = __DIR__ . '/../../uploads/courses/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $filename = uniqid() . '.' . $extension;
        $filepath = $uploadDir . $filename;

        if (move_uploaded_file($file['tmp_name'], $filepath)) {
            return '/uploads/courses/' . $filename;
        }

        throw new Exception('فشل رفع الصورة');
    }
}
```

### الطريقة 2: الاتصال المباشر من Frontend (غير موصى به للإنتاج)

إذا كنت تريد الاتصال المباشر من Frontend إلى PHP:

```typescript
// في Frontend
const response = await fetch('http://your-php-server.com/api/courses', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  credentials: 'include', // لإرسال cookies
});
```

**⚠️ ملاحظة**: هذه الطريقة تتطلب إعداد CORS في PHP.

---

## 🔐 المصادقة والتفويض

### 1. JWT Authentication

#### في PHP (`api/middleware/AuthMiddleware.php`):

```php
<?php
require_once __DIR__ . '/../../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthMiddleware {
    private $secretKey;

    public function __construct() {
        $this->secretKey = $_ENV['JWT_SECRET'] ?? 'your-secret-key';
    }

    /**
     * التحقق من JWT token
     */
    public function verifyToken() {
        $headers = getallheaders();
        $token = null;

        // استخراج token من Header
        if (isset($headers['Authorization'])) {
            $authHeader = $headers['Authorization'];
            if (preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
                $token = $matches[1];
            }
        }

        if (!$token) {
            Response::error('Token غير موجود', 401);
        }

        try {
            $decoded = JWT::decode($token, new Key($this->secretKey, 'HS256'));
            return $decoded;
        } catch (Exception $e) {
            Response::error('Token غير صالح', 401);
        }
    }

    /**
     * إنشاء JWT token
     */
    public function generateToken($userId, $userRole) {
        $payload = [
            'user_id' => $userId,
            'role' => $userRole,
            'iat' => time(),
            'exp' => time() + (60 * 60 * 24), // 24 ساعة
        ];

        return JWT::encode($payload, $this->secretKey, 'HS256');
    }
}
```

#### في Next.js (`src/app/api/courses/route.ts`):

```typescript
export async function GET(request: NextRequest) {
  try {
    // الحصول على token من cookies أو headers
    const token = request.cookies.get('auth-token')?.value || 
                  request.headers.get('Authorization')?.replace('Bearer ', '');

    const response = await fetch(`${PHP_API_URL}/courses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    // ... باقي الكود
  }
}
```

### 2. Session-based Authentication

#### في PHP:

```php
<?php
session_start();

class AuthController {
    public function login($email, $password) {
        // التحقق من بيانات المستخدم
        $user = $this->validateUser($email, $password);
        
        if ($user) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_role'] = $user['role'];
            
            Response::success([
                'user' => $user,
                'session_id' => session_id()
            ], 'تم تسجيل الدخول بنجاح');
        } else {
            Response::error('بيانات الدخول غير صحيحة', 401);
        }
    }

    public function logout() {
        session_destroy();
        Response::success(null, 'تم تسجيل الخروج بنجاح');
    }
}
```

---

## ⚠️ معالجة الأخطاء

### في PHP:

```php
<?php
class ErrorHandler {
    public static function handle($error, $statusCode = 500) {
        // تسجيل الخطأ
        error_log($error->getMessage());

        // إرسال استجابة موحدة
        Response::error(
            'حدث خطأ في الخادم',
            $statusCode,
            [
                'message' => $error->getMessage(),
                'file' => $error->getFile(),
                'line' => $error->getLine(),
            ]
        );
    }

    public static function validateRequest($data, $rules) {
        $errors = [];

        foreach ($rules as $field => $rule) {
            $rulesArray = explode('|', $rule);

            foreach ($rulesArray as $singleRule) {
                if ($singleRule === 'required' && empty($data[$field])) {
                    $errors[$field][] = "الحقل $field مطلوب";
                }

                if ($singleRule === 'email' && !filter_var($data[$field], FILTER_VALIDATE_EMAIL)) {
                    $errors[$field][] = "البريد الإلكتروني غير صحيح";
                }

                // إضافة المزيد من القواعد...
            }
        }

        if (!empty($errors)) {
            Response::error('خطأ في التحقق من البيانات', 400, $errors);
        }
    }
}
```

### في Next.js:

```typescript
export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${PHP_API_URL}/courses`);

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || 'حدث خطأ' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'فشل الاتصال بالخادم' },
      { status: 500 }
    );
  }
}
```

---

## 💡 أمثلة عملية

### مثال 1: جلب قائمة الدورات

#### Frontend (React Component):

```typescript
'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api/client';

export default function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses', {
        params: {
          page: 1,
          limit: 10,
          isPublished: true,
        },
      });
      setCourses(response.data.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>جاري التحميل...</div>;

  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>{course.title}</div>
      ))}
    </div>
  );
}
```

#### PHP Backend:

```php
// في CourseController.php
public function index() {
    $filters = [
        'isPublished' => $_GET['isPublished'] === 'true',
    ];
    
    $page = (int)($_GET['page'] ?? 1);
    $limit = (int)($_GET['limit'] ?? 10);
    
    $result = $this->courseModel->getAll($filters, [], $page, $limit);
    
    Response::paginated($result['courses'], [
        'page' => $page,
        'limit' => $limit,
        'total' => $result['total'],
        'totalPages' => ceil($result['total'] / $limit),
    ]);
}
```

### مثال 2: إنشاء دورة جديدة

#### Frontend:

```typescript
const createCourse = async (formData: FormData) => {
  try {
    const response = await api.post('/courses', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    console.log('Course created:', response.data);
  } catch (error) {
    console.error('Error creating course:', error);
  }
};
```

#### PHP Backend:

```php
public function store() {
    $data = [
        'title' => $_POST['title'],
        'description' => $_POST['description'],
        'instructor_id' => $_POST['instructorId'],
        'category' => $_POST['category'],
        'level' => $_POST['level'],
        'price' => (float)$_POST['price'],
    ];

    // معالجة الصورة
    if (isset($_FILES['image'])) {
        $data['image'] = $this->handleImageUpload($_FILES['image']);
    }

    $course = $this->courseModel->create($data);
    Response::success(['course' => $course], 'تم إنشاء الدورة بنجاح', 201);
}
```

---

## ✅ أفضل الممارسات

### 1. الأمان

- ✅ **استخدم HTTPS** في الإنتاج
- ✅ **تحقق من جميع المدخلات** (Input Validation)
- ✅ **استخدم Prepared Statements** لمنع SQL Injection
- ✅ **تحقق من الصلاحيات** قبل كل عملية
- ✅ **استخدم Rate Limiting** لمنع Abuse

### 2. الأداء

- ✅ **استخدم Caching** للبيانات الثابتة
- ✅ **استخدم Pagination** للقوائم الكبيرة
- ✅ **استخدم Indexes** في قاعدة البيانات
- ✅ **قلل من عدد Queries** باستخدام JOINs

### 3. الكود

- ✅ **استخدم PSR Standards** في PHP
- ✅ **اكتب Comments** واضحة
- ✅ **استخدم Type Hints** في PHP 7.4+
- ✅ **افصل الـ Logic** عن الـ Presentation

### 4. معالجة الأخطاء

- ✅ **استخدم Try-Catch** في جميع العمليات الحرجة
- ✅ **سجل الأخطاء** في ملف Log
- ✅ **لا تعرض تفاصيل الأخطاء** للمستخدمين
- ✅ **استخدم Error Codes** موحدة

---

## 🔧 استكشاف الأخطاء

### مشكلة: CORS Error

**الحل:**
```php
// في config/cors.php
header('Access-Control-Allow-Origin: http://localhost:5000');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
```

### مشكلة: JSON Encoding للعربية

**الحل:**
```php
echo json_encode($data, JSON_UNESCAPED_UNICODE);
```

### مشكلة: File Upload لا يعمل

**الحل:**
```php
// تحقق من upload_max_filesize في php.ini
// استخدم move_uploaded_file() بدلاً من copy()
```

### مشكلة: Authentication Token غير صالح

**الحل:**
- تحقق من JWT Secret في كلا الجانبين
- تحقق من Expiration Time
- تأكد من إرسال Token في Header بشكل صحيح

---

## 📝 Checklist للربط

- [ ] إعداد PHP Backend مع Composer
- [ ] إعداد قاعدة البيانات
- [ ] إنشاء API Endpoints المطلوبة
- [ ] إعداد CORS
- [ ] إعداد Authentication
- [ ] إعداد Error Handling
- [ ] اختبار جميع Endpoints
- [ ] ربط Next.js API Routes مع PHP
- [ ] اختبار التكامل الكامل
- [ ] إعداد Environment Variables
- [ ] اختبار الأمان
- [ ] تحسين الأداء

---

## 📞 الدعم

إذا واجهت أي مشاكل:

1. راجع ملفات Log في PHP
2. راجع Console في Next.js
3. استخدم Postman لاختبار API مباشرة
4. تحقق من Network Tab في DevTools

---

**آخر تحديث:** يناير 2025  
**الإصدار:** 1.0.0

**فريق تطوير منصة خطى** 🎓✨

