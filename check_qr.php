<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// إعدادات الاتصال بقاعدة بيانات PostgreSQL
$host = 'switchyard.proxy.rlwy.net';  // استبدل بـ بياناتك الخاصة
$port = '56259';  // استبدل بـ بياناتك الخاصة
$dbname = 'railway';  // استبدل بـ اسم قاعدة بياناتك
$username = 'postgres';  // استبدل بـ اسم المستخدم الخاص بك
$password = 'vKOhEOvtszntLHaqpCIWTGKdojWMCZeU';  // استبدل بـ كلمة المرور الخاصة بك

try {
    // الاتصال بقاعدة بيانات PostgreSQL
    $conn = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(['success' => false, 'message' => 'فشل الاتصال بقاعدة البيانات: ' . $e->getMessage()]));
}

$data = json_decode(file_get_contents('php://input'), true);
$qrCode = $data['code'];
 

$stmt = $conn->prepare("SELECT * FROM etudiant WHERE idetudiant = ?");
$stmt->bind_param("s", $qrCode);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}

$stmt->close();
$conn->close();
?>
