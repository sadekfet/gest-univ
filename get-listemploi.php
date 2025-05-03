<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");  
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");  
header("Access-Control-Allow-Headers: Content-Type");  

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// معلومات الاتصال بقاعدة البيانات على InfinityFree
$host = 'sql312.infinityfree.com';        // MySQL Host
$dbname = 'if0_38878069_pfe';            // اسم قاعدة البيانات
$username = 'if0_38878069';              // اسم المستخدم
$password = 'ZrxaWeCHqvt6sLI';           // كلمة المرور

try {
    // الاتصال بقاعدة البيانات
    $connect = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $connect->exec("set names utf8");

    // استقبال المعطيات من الطلب
    $iddep = $_GET['iddep'];
    $idspc = $_GET['idspc'];
    $idcycle = $_GET['idcycle'];
    $niveau = $_GET['niveau'];
    $groupe = $_GET['groupe'];

    // الاستعلام لجلب البيانات
    $query = "SELECT day, `08:30-10:00`, `10:00-11:30`, `11:30-13:00`, `13:30-15:00`, `15:00-16:30`
              FROM tabemploi
              WHERE iddep = ? AND idspc = ? AND idcycle = ? AND niveau = ? AND groupe = ?";

    $stmt = $connect->prepare($query);
    $stmt->execute([$iddep, $idspc, $idcycle, $niveau, $groupe]);

    // إرجاع النتيجة بتنسيق JSON
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

} catch (PDOException $e) {
    echo json_encode(["error" => "خطأ في الاتصال بقاعدة البيانات: " . $e->getMessage()]);
}
?>
