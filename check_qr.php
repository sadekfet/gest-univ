<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// التعامل مع طلبات OPTIONS لتفادي مشاكل CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// بيانات الاتصال بقاعدة البيانات على InfinityFree
$host = 'sql312.infinityfree.com';        // MySQL host
$user = 'if0_38878069';                  // اسم المستخدم
$pass = 'ZrxaWeCHqvt6sLI';               // كلمة المرور
$db = 'if0_38878069_pfe';                // اسم قاعدة البيانات

// الاتصال بقاعدة البيانات
$conn = new mysqli($host, $user, $pass, $db);

// التحقق من الاتصال
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'error' => 'فشل في الاتصال بقاعدة البيانات: ' . $conn->connect_error]));
}

// قراءة البيانات المرسلة في الطلب
$data = json_decode(file_get_contents('php://input'), true);
$qrCode = $data['code'] ?? null;

if (!$qrCode) {
    echo json_encode(['success' => false, 'error' => 'رمز QR غير موجود']);
    exit();
}

// الاستعلام عن الطالب باستخدام الـ QR Code
$stmt = $conn->prepare("SELECT * FROM etudiant WHERE idetudiant = ?");
$stmt->bind_param("s", $qrCode);
$stmt->execute();
$result = $stmt->get_result();

// التحقق من وجود الطالب
if ($result->num_rows > 0) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}

// إغلاق الاتصال
$stmt->close();
$conn->close();

?>
