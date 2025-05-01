<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");  
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");  
header("Access-Control-Allow-Headers: Content-Type");  

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// معلومات الاتصال بقاعدة البيانات
$host = 'localhost';
$db = 'pfe';
$user = 'root';
$pass = '';

try {
    // الاتصال بقاعدة البيانات
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // جلب رقم الطالب من الرابط
    $studentId = $_GET['id'] ?? '';

    if (!$studentId) {
        echo json_encode(["error" => "رقم الطالب غير موجود"]);
        exit;
    }

    // تنفيذ الاستعلام مع JOIN
    $stmt = $pdo->prepare("
        SELECT 
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
        WHERE e.idetudiant = ?
    ");
    
    $stmt->execute([$studentId]);

    $student = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($student) {
        echo json_encode($student);
    } else {
        echo json_encode(["error" => "الطالب غير موجود"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "خطأ في الاتصال بقاعدة البيانات: " . $e->getMessage()]);
}
?>
