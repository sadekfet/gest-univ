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
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $username, $password);
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
    die(json_encode(['success' => false, 'message' => 'فشل الاتصال بقاعدة البيانات: ' . $e->getMessage()]));
}
?>
