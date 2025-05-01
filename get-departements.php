<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");  
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");  
header("Access-Control-Allow-Headers: Content-Type");  

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// الاتصال بقاعدة بيانات PostgreSQL
$host = 'switchyard.proxy.rlwy.net';
$port = '56259';
$dbname = 'railway';
$user = 'postgres';
$pass = 'vKOhEOvtszntLHaqpCIWTGKdojWMCZeU';

try {
    $connect = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $pass);
    $connect->exec("set names utf8");
    
    $query = "SELECT iddep, nomdep FROM departement";
    $stmt = $connect->prepare($query);
    $stmt->execute();

    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
