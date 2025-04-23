<?php
// Habilitar CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Content-Type: application/json");

// Manejo de preflight
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

// Validación de método
if ($_SERVER["REQUEST_METHOD"] !== "DELETE") {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
    exit;
}

// Obtener ID de la URL
$deleteData = json_decode(file_get_contents("php://input"), true);
$jobId = isset($deleteData["id"]) ? intval($deleteData["id"]) : 0;

if (!$jobId) {
    http_response_code(400);
    echo json_encode(["error" => "ID de vacante inválido o no especificado"]);
    exit;
}

// Configuración de conexión a MySQL (Azure)
$host = 'serverjobapp2.mysql.database.azure.com';
$db   = 'portal-empleos';
$user = 'UserAdministrator1';
$pass = 'Ry02122002!';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);

    // Eliminar vacante
    $stmt = $pdo->prepare("DELETE FROM jobs WHERE id = ?");
    $stmt->execute([$jobId]);

    echo json_encode(["message" => "Vacante eliminada correctamente"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Error en la base de datos",
        "details" => $e->getMessage()
    ]);
}
