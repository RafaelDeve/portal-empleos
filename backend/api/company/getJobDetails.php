<?php
// Habilitar CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "GET" || !isset($_GET["id"])) {
    http_response_code(400);
    echo json_encode(["error" => "ID de vacante requerido"]);
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

$id = $_GET["id"];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);

    // Obtener vacante
    $stmt = $pdo->prepare("
        SELECT j.*, d.description, d.requirements, d.benefits, d.publication_date
        FROM jobs j
        LEFT JOIN jobdetails d ON j.id = d.job_id
        WHERE j.id = ?
    ");
    $stmt->execute([$id]);
    $vacante = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($vacante) {
        echo json_encode($vacante);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Vacante no encontrada"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
