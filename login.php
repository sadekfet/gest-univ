<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// إعدادات الاتصال بقاعدة البيانات
$host = 'sql312.infinityfree.com';         // MySQL Host
$dbname = 'if0_38878069_pfe';             // اسم قاعدة البيانات
$username = 'if0_38878069';               // اسم المستخدم
$password = 'ZrxaWeCHqvt6sLI';            // كلمة المرور

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(['success' => false, 'message' => 'فشل الاتصال بقاعدة البيانات: ' . $e->getMessage()]));
}

// استقبال البيانات القادمة من React
$data = json_decode(file_get_contents('php://input'), true);

$iduser = $data['iduser'] ?? '';
$motpass = $data['motpass'] ?? '';

// تحقق من أن البيانات غير فارغة
if (empty($iduser) || empty($motpass)) {
    echo json_encode(['success' => false, 'message' => 'الرجاء إدخال اسم المستخدم وكلمة المرور']);
    exit;
}

// تحضير الاستعلام
$stmt = $pdo->prepare("SELECT * FROM user WHERE iduser = :iduser AND motpass = :motpass");
$stmt->bindParam(':iduser', $iduser);
$stmt->bindParam(':motpass', $motpass);

$stmt->execute();

// تحقق إذا كان هناك مستخدم مطابق
if ($stmt->rowCount() > 0) {
    echo json_encode(['success' => true, 'message' => 'تم تسجيل الدخول بنجاح']);
} else {
    echo json_encode(['success' => false, 'message' => 'اسم المستخدم أو كلمة المرور خاطئة']);
}
?>
