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
$host = 'switchyard.proxy.rlwy.net';
$port = '56259';
$db = 'railway';
$user = 'postgres';
$pass = 'vKOhEOvtszntLHaqpCIWTGKdojWMCZeU';

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $studentId = $_GET['id'] ?? '';

    if (!$studentId) {
        echo json_encode(["error" => "رقم الطالب غير موجود"]);
        exit;
    }

    $stmt = $pdo->prepare("
        SELECT 
            t.day, 
            t.\"08:30-10:00\", 
            t.\"10:00-11:30\",
            t.\"11:30-13:00\",
            t.\"13:30-15:00\",
            t.\"15:00-16:30\",
            e.groupe,
            e.niveau,
            d.nomdep,
            c.nomcycle,
            s.nomspc
        FROM tabemploi t
        LEFT JOIN etudiant e 
            ON e.iddep = t.iddep 
            AND e.niveau = t.niveau
            AND e.idspc = t.idspc 
            AND e.idcycle = t.idcycle 
            AND e.groupe = t.groupe
        LEFT JOIN departement d ON  d.iddep = t.iddep
        LEFT JOIN cycle c ON  c.idcycle = t.idcycle
        LEFT JOIN specialite s ON  s.idspc = t.idspc
        WHERE e.idetudiant = ?
    ");

    $stmt->execute([$studentId]);

    $emplois = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($emplois) {
        echo json_encode($emplois);
    } else {
        echo json_encode(["error" => "لا يوجد جدول لهذا الطالب"]);
    }

} catch (PDOException $e) {
    echo json_encode(["error" => "خطأ في الاتصال بقاعدة البيانات: " . $e->getMessage()]);
}
?>
