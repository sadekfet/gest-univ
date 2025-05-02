<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");  
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");  
header("Access-Control-Allow-Headers: Content-Type");  

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// إعدادات الاتصال بقاعدة بيانات PostgreSQL
$host = 'switchyard.proxy.rlwy.net';  // استبدل بـ بياناتك الخاصة
$port = '56259';  // استبدل بـ بياناتك الخاصة
$dbname = 'railway';  // استبدل بـ اسم قاعدة بياناتك
$username = 'postgres';  // استبدل بـ اسم المستخدم الخاص بك
$password = 'vKOhEOvtszntLHaqpCIWTGKdojWMCZeU';  // استبدل بـ كلمة المرور الخاصة بك

try {
    // الاتصال بقاعدة بيانات PostgreSQL
    $connect = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $username, $password);
    $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(['success' => false, 'message' => 'فشل الاتصال بقاعدة البيانات: ' . $e->getMessage()]));
}
$connect->exec("set names utf8");
$query = "SELECT idspc, nomspc FROM specialite";
$stmt = $connect->prepare($query);
$stmt->execute();
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>
