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
$host = 'sql312.infinityfree.com';        // المضيف لقاعدة البيانات
$db = 'if0_38878069_pfe';                // اسم قاعدة البيانات
$user = 'if0_38878069';                  // اسم المستخدم
$pass = 'ZrxaWeCHqvt6sLI';               // كلمة المرور

try {
    // الاتصال بقاعدة البيانات
    $connect = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $connect->exec("set names utf8");

    // تنفيذ الاستعلام
    $query = "SELECT idspc, nomspc FROM specialite";
    $stmt = $connect->prepare($query);
    $stmt->execute();

    // إرجاع النتائج في صيغة JSON
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

} catch (PDOException $e) {
    echo json_encode(["error" => "خطأ في الاتصال بقاعدة البيانات: " . $e->getMessage()]);
}
?>
