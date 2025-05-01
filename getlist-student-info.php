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
    // الاتصال بقاعدة البيانات PostgreSQL
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // تنفيذ الاستعلام لجلب جميع الطلبة مع تفاصيلهم
    $stmt = $pdo->prepare("
        SELECT 
            e.idetudiant, 
            e.nom, 
            e.prenom, 
            e.dnais,        -- تاريخ الميلاد
            e.lnais,        -- مكان الميلاد
            e.niveau,       -- المستوى
            e.groupe,       -- الفوج
            i.nomdep,       -- اسم المعهد (القسم)
            s.nomspc,       -- اسم التخصص
            c.nomcycle      -- اسم الحلقة
        FROM etudiant e
        LEFT JOIN departement i ON e.iddep = i.iddep
        LEFT JOIN specialite s ON e.idspc = s.idspc
        LEFT JOIN cycle c ON e.idcycle = c.idcycle
    ");

    $stmt->execute();

    // جلب كل الطلبة
    $students = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($students) {
        echo json_encode($students);
    } else {
        echo json_encode(["error" => "لا توجد بيانات للطلبة"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "خطأ في الاتصال بقاعدة البيانات: " . $e->getMessage()]);
}
?>
