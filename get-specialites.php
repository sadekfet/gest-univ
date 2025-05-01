<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");  
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");  
header("Access-Control-Allow-Headers: Content-Type");  

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// معلومات الاتصال بقاعدة بيانات PostgreSQL
$host = 'switchyard.proxy.rlwy.net';  // استبدل هذا بالقيم الخاصة بك
$port = '56259';  // استبدل هذا بالقيم الخاصة بك
$db = 'railway';  // استبدل هذا بالقيم الخاصة بك
$user = 'postgres';  // استبدل هذا بالقيم الخاصة بك
$pass = 'vKOhEOvtszntLHaqpCIWTGKdojWMCZeU';  // استبدل هذا بالقيم الخاصة بك

try {
    // الاتصال بقاعدة بيانات PostgreSQL
    $connect = new PDO("pgsql:host=$host;port=$port;dbname=$db", $user, $pass);
    $connect->exec("set names utf8");

    // الاستعلام لجلب بيانات التخصصات
    $query = "SELECT idspc, nomspc FROM specialite";
    $stmt = $connect->prepare($query);
    $stmt->execute();

    // إرجاع النتيجة بتنسيق JSON
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

} catch (PDOException $e) {
    echo json_encode(["error" => "خطأ في الاتصال بقاعدة البيانات: " . $e->getMessage()]);
}
?>
