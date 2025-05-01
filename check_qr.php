<?php
// إعدادات CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// إعداد الاتصال بقاعدة بيانات PostgreSQL
$host = 'switchyard.proxy.rlwy.net';
$port = '56259';
$dbname = 'railway';
$user = 'postgres';
$pass = 'vKOhEOvtszntLHaqpCIWTGKdojWMCZeU';

try {
    $conn = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(['success' => false, 'error' => 'فشل في الاتصال بقاعدة البيانات']));
}

// استقبال البيانات
$data = json_decode(file_get_contents('php://input'), true);
$qrCode = $data['code'] ?? '';

if (!$qrCode) {
    echo json_encode(['success' => false, 'error' => 'لم يتم إرسال الكود']);
    exit();
}

// تنفيذ الاستعلام
$stmt = $conn->prepare("SELECT * FROM etudiant WHERE idetudiant = :code");
$stmt->bindParam(':code', $qrCode, PDO::PARAM_STR);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
