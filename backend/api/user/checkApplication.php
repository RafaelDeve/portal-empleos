<?php
// Habilitar CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Manejo de preflight (CORS)
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

// Validar método
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405); // Método no permitido
    echo json_encode(["error" => "Método no permitido"]);
    exit;
}

// Leer datos del body JSON
$input = json_decode(file_get_contents("php://input"), true);
$user_id = $input["user_id"] ?? null;
$job_id = $input["job_id"] ?? null;

if (!$user_id || !$job_id) {
    http_response_code(400);
    echo json_encode(["error" => "Faltan campos"]);
    exit;
}
$host = 'serverjobapp2.mysql.database.azure.com'; // cámbialo por el tuyo
$db   = 'portal-empleos';
$user = 'UserAdministrator1'; // respeta este formato
$pass = 'Ry02122002!';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options); // Cambia tus credenciales si es necesario
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verificar si ya existe una postulación
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM applications WHERE user_id = ? AND job_id = ?");
    $stmt->execute([$user_id, $job_id]);
    $exists = $stmt->fetchColumn() > 0;

    echo json_encode(["alreadyApplied" => $exists]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error en base de datos", "details" => $e->getMessage()]);
}
