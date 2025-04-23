<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);
$jobId = isset($input["job_id"]) ? intval($input["job_id"]) : 0;

if (!$jobId) {
    http_response_code(400);
    echo json_encode(["error" => "ID de vacante no válido"]);
    exit;
}

$host = 'serverjobapp2.mysql.database.azure.com';
$db   = 'portal-empleos';
$user = 'UserAdministrator1';
$pass = 'Ry02122002!';
$charset = 'utf8mb4';
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

try {
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);

    $stmt = $pdo->prepare("
        SELECT cv.*
        FROM applications
        JOIN cv ON applications.user_id = cv.user_id
        WHERE applications.job_id = ?
    ");
    $stmt->execute([$jobId]);
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($results);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Error en base de datos",
        "details" => $e->getMessage()
    ]);
}
