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
$host = 'sql312.infinityfree.com';       // المضيف لقاعدة البيانات
$db = 'if0_38878069_pfe';               // اسم قاعدة البيانات
$user = 'if0_38878069';                 // اسم المستخدم
$pass = 'ZrxaWeCHqvt6sLI';              // كلمة المرور

try {
    // الاتصال بقاعدة البيانات
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
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
