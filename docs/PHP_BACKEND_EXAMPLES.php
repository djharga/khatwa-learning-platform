<?php
/**
 * أمثلة كود جاهزة للاستخدام - PHP Backend
 * منصة خطى - Khatwa Learning Platform
 * 
 * هذا الملف يحتوي على أمثلة عملية جاهزة للنسخ والاستخدام
 */

// ============================================
// 1. ملف إعدادات قاعدة البيانات
// ============================================

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

// ============================================
// 2. فئة Response الموحدة
// ============================================

class Response {
    public static function success($data = null, $message = 'نجح', $statusCode = 200) {
        http_response_code($statusCode);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'success' => true,
            'message' => $message,
            'data' => $data,
            'timestamp' => date('Y-m-d H:i:s')
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }

    public static function error($message = 'حدث خطأ', $statusCode = 400, $errors = null) {
        http_response_code($statusCode);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'success' => false,
            'message' => $message,
            'errors' => $errors,
            'timestamp' => date('Y-m-d H:i:s')
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }

    public static function paginated($data, $pagination, $message = 'نجح') {
        http_response_code(200);
        header('Content-Type: application/json; charset=utf-8');
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

// ============================================
// 3. Model للدورات (Course)
// ============================================

class Course {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    /**
     * الحصول على جميع الدورات مع الفلاتر
     */
    public function getAll($filters = [], $sort = [], $page = 1, $limit = 10) {
        $where = [];
        $params = [];

        // بناء WHERE clause
        if (!empty($filters['search'])) {
            $where[] = "(title LIKE :search OR description LIKE :search)";
            $params[':search'] = '%' . $filters['search'] . '%';
        }

        if (!empty($filters['category'])) {
            $where[] = "category = :category";
            $params[':category'] = $filters['category'];
        }

        if (!empty($filters['level'])) {
            $where[] = "level = :level";
            $params[':level'] = $filters['level'];
        }

        if (isset($filters['isPublished']) && $filters['isPublished'] !== null) {
            $where[] = "is_published = :isPublished";
            $params[':isPublished'] = $filters['isPublished'] ? 1 : 0;
        }

        $whereClause = !empty($where) ? 'WHERE ' . implode(' AND ', $where) : '';

        // بناء ORDER BY
        $sortField = $sort['field'] ?? 'created_at';
        $sortDir = strtoupper($sort['direction'] ?? 'DESC');
        $orderBy = "ORDER BY $sortField $sortDir";

        // Pagination
        $offset = ($page - 1) * $limit;

        // Query للحصول على البيانات
        $sql = "SELECT * FROM courses $whereClause $orderBy LIMIT :limit OFFSET :offset";
        $stmt = $this->db->prepare($sql);
        
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        
        $stmt->execute();
        $courses = $stmt->fetchAll();

        // Query للحصول على العدد الإجمالي
        $countSql = "SELECT COUNT(*) as total FROM courses $whereClause";
        $countStmt = $this->db->prepare($countSql);
        foreach ($params as $key => $value) {
            $countStmt->bindValue($key, $value);
        }
        $countStmt->execute();
        $total = $countStmt->fetch()['total'];

        return [
            'courses' => $courses,
            'total' => (int)$total,
        ];
    }

    /**
     * الحصول على دورة واحدة
     */
    public function findById($id) {
        $sql = "SELECT * FROM courses WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':id', $id);
        $stmt->execute();
        return $stmt->fetch();
    }

    /**
     * إنشاء دورة جديدة
     */
    public function create($data) {
        $sql = "INSERT INTO courses (title, description, instructor_id, category, level, price, image, created_at, updated_at) 
                VALUES (:title, :description, :instructor_id, :category, :level, :price, :image, NOW(), NOW())";
        
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':title', $data['title']);
        $stmt->bindValue(':description', $data['description']);
        $stmt->bindValue(':instructor_id', $data['instructor_id']);
        $stmt->bindValue(':category', $data['category']);
        $stmt->bindValue(':level', $data['level']);
        $stmt->bindValue(':price', $data['price'] ?? 0);
        $stmt->bindValue(':image', $data['image'] ?? null);
        
        $stmt->execute();
        
        $id = $this->db->lastInsertId();
        return $this->findById($id);
    }

    /**
     * تحديث دورة
     */
    public function update($id, $data) {
        $fields = [];
        $params = [':id' => $id];

        foreach ($data as $key => $value) {
            $fields[] = "$key = :$key";
            $params[":$key"] = $value;
        }

        $fields[] = "updated_at = NOW()";
        $sql = "UPDATE courses SET " . implode(', ', $fields) . " WHERE id = :id";
        
        $stmt = $this->db->prepare($sql);
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        
        $stmt->execute();
        return $this->findById($id);
    }

    /**
     * حذف دورة
     */
    public function delete($id) {
        $sql = "DELETE FROM courses WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':id', $id);
        return $stmt->execute();
    }
}

// ============================================
// 4. Controller للدورات
// ============================================

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

            // معالجة الصورة
            if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
                $data['image'] = $this->handleImageUpload($_FILES['image']);
            }

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
            $input = json_decode(file_get_contents('php://input'), true);

            $data = [];
            if (isset($input['title'])) $data['title'] = $input['title'];
            if (isset($input['description'])) $data['description'] = $input['description'];
            if (isset($input['price'])) $data['price'] = $input['price'];

            if (empty($data)) {
                Response::error('لا توجد بيانات للتحديث', 400);
            }

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
        $uploadDir = __DIR__ . '/../uploads/courses/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!in_array($file['type'], $allowedTypes)) {
            throw new Exception('نوع الملف غير مسموح');
        }

        $maxSize = 5 * 1024 * 1024; // 5MB
        if ($file['size'] > $maxSize) {
            throw new Exception('حجم الملف كبير جداً');
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

// ============================================
// 5. Router بسيط
// ============================================

class Router {
    public function handle($method, $path) {
        // إزالة الـ slashes الزائدة
        $path = trim($path, '/');
        $segments = explode('/', $path);

        // توجيه الدورات
        if ($segments[0] === 'courses') {
            $controller = new CourseController();

            if ($method === 'GET' && count($segments) === 1) {
                // GET /api/courses
                $controller->index();
            } elseif ($method === 'GET' && count($segments) === 2) {
                // GET /api/courses/{id}
                $controller->show($segments[1]);
            } elseif ($method === 'POST' && count($segments) === 1) {
                // POST /api/courses
                $controller->store();
            } elseif ($method === 'PUT' && count($segments) === 2) {
                // PUT /api/courses/{id}
                $controller->update($segments[1]);
            } elseif ($method === 'DELETE' && count($segments) === 2) {
                // DELETE /api/courses/{id}
                $controller->destroy($segments[1]);
            } else {
                Response::error('المسار غير موجود', 404);
            }
        } else {
            Response::error('المسار غير موجود', 404);
        }
    }
}

// ============================================
// 6. CORS Configuration
// ============================================

function setupCORS() {
    $allowedOrigins = [
        'http://localhost:5000',  // Next.js dev
        'http://localhost:3000',  // Next.js alt
        'https://yourdomain.com', // Production
    ];

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    
    if (in_array($origin, $allowedOrigins)) {
        header("Access-Control-Allow-Origin: $origin");
    }

    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-CSRF-Token');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400'); // 24 hours

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
}

// ============================================
// 7. مثال على نقطة الدخول الرئيسية
// ============================================

/*
// في ملف api/index.php

<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/utils/Response.php';
require_once __DIR__ . '/controllers/CourseController.php';
require_once __DIR__ . '/Router.php';

setupCORS();

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = str_replace('/api', '', $path);

try {
    $router = new Router();
    $router->handle($method, $path);
} catch (Exception $e) {
    Response::error($e->getMessage(), 500);
}
*/

// ============================================
// 8. مثال على Validation
// ============================================

class Validator {
    public static function validateEmail($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }

    public static function validateRequired($value) {
        return !empty($value);
    }

    public static function validateLength($value, $min, $max) {
        $length = mb_strlen($value, 'UTF-8');
        return $length >= $min && $length <= $max;
    }

    public static function validate($data, $rules) {
        $errors = [];

        foreach ($rules as $field => $fieldRules) {
            $fieldRulesArray = explode('|', $fieldRules);
            $value = $data[$field] ?? null;

            foreach ($fieldRulesArray as $rule) {
                if ($rule === 'required' && !self::validateRequired($value)) {
                    $errors[$field][] = "الحقل $field مطلوب";
                }

                if ($rule === 'email' && !self::validateEmail($value)) {
                    $errors[$field][] = "البريد الإلكتروني غير صحيح";
                }

                if (strpos($rule, 'min:') === 0) {
                    $min = (int)substr($rule, 4);
                    if (!self::validateLength($value, $min, PHP_INT_MAX)) {
                        $errors[$field][] = "الحقل $field يجب أن يكون على الأقل $min حرف";
                    }
                }

                if (strpos($rule, 'max:') === 0) {
                    $max = (int)substr($rule, 4);
                    if (!self::validateLength($value, 0, $max)) {
                        $errors[$field][] = "الحقل $field يجب أن يكون على الأكثر $max حرف";
                    }
                }
            }
        }

        if (!empty($errors)) {
            Response::error('خطأ في التحقق من البيانات', 400, $errors);
        }
    }
}

// مثال الاستخدام:
// Validator::validate($_POST, [
//     'title' => 'required|min:3|max:100',
//     'email' => 'required|email',
// ]);

?>

