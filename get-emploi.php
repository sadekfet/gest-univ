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
    // الاتصال بقاعدة البيانات
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // جلب رقم الطالب من الرابط
    $studentId = $_GET['id'] ?? '';

    if (!$studentId) {
        echo json_encode(["error" => "رقم الطالب غير موجود"]);
        exit;
    }

    // تحضير الاستعلام
    $stmt = $pdo->prepare("
        SELECT 
            t.day, 
            t.t1, 
            t.t2,
            t.t3,
            t.t4,
            t.t5,
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

    // تنفيذ الاستعلام مع رقم الطالب الصحيح
    $stmt->execute([$studentId]);

    // جلب النتائج
    $emplois = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($emplois) {
        echo json_encode($emplois);
    } else {
        echo json_encode(["error" => "لا يوجد جدول لهذا الطالب"]);
    }

} catch (PDOException $e) {
    die(json_encode(['success' => false, 'message' => 'فشل الاتصال بقاعدة البيانات: ' . $e->getMessage()]));
}
?>

