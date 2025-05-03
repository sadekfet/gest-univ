<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");  
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");  
header("Access-Control-Allow-Headers: Content-Type");  

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// بيانات الاتصال بقاعدة البيانات على InfinityFree
$host = 'sql312.infinityfree.com';        // MySQL Host
$dbname = 'if0_38878069_pfe';            // اسم قاعدة البيانات
$username = 'if0_38878069';              // اسم المستخدم
$password = 'ZrxaWeCHqvt6sLI';           // كلمة المرور

try {
    $connect = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $connect->exec("set names utf8");
} catch (PDOException $e) {
    die(json_encode(['success' => false, 'message' => 'فشل الاتصال بقاعدة البيانات: ' . $e->getMessage()]));
}

$query = "SELECT iddep, nomdep FROM departement";
$stmt = $connect->prepare($query);
$stmt->execute();

// إرسال النتيجة بتنسيق JSON
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>
