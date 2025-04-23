<?php
// CORS Headers (deben ir antes de cualquier output)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// 👉 Si es una solicitud preflight (OPTIONS), solo respondemos y salimos
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 👇 Lógica para manejar POST normal
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
    exit;
}

// Leer datos del cuerpo
$input = json_decode(file_get_contents('php://input'), true);

// Validar campos
if (!isset(
    $input['title'],
    $input['schedule'],
    $input['min_salary'],
    $input['max_salary'],
    $input['company_name'],
    $input['company_location'],
    $input['company_id']
)) {
    http_response_code(400);
    echo json_encode(["error" => "Faltan campos"]);
    exit;
}

// Configuración de conexión MySQL (Azure)
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

    $stmt = $pdo->prepare("
        INSERT INTO jobs (
            title, schedule, min_salary, max_salary,
            company_name, company_location, company_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $input['title'],
        $input['schedule'],
        $input['min_salary'],
        $input['max_salary'],
        $input['company_name'],
        $input['company_location'],
        $input['company_id']
    ]);

    echo json_encode(["message" => "Vacante guardada correctamente"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Error en la base de datos",
        "details" => $e->getMessage()
    ]);
}
