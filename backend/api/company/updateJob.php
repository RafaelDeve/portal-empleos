<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "PUT") {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

if (!isset(
    $input["id"],
    $input["title"],
    $input["schedule"],
    $input["min_salary"],
    $input["max_salary"],
    $input["company_name"],
    $input["company_location"]
)) {
    http_response_code(400);
    echo json_encode(["error" => "Faltan campos requeridos"]);
    exit;
}

// Configuración
$host = 'serverjobapp2.mysql.database.azure.com';
$db   = 'portal-empleos';
$user = 'UserAdministrator1';
$pass = 'Ry02122002!';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);

    $stmt = $pdo->prepare("
        UPDATE jobs
        SET title = ?, schedule = ?, min_salary = ?, max_salary = ?, company_name = ?, company_location = ?
        WHERE id = ?
    ");

    $stmt->execute([
        $input["title"],
        $input["schedule"],
        $input["min_salary"],
        $input["max_salary"],
        $input["company_name"],
        $input["company_location"],
        $input["id"]
    ]);

    echo json_encode(["message" => "Vacante actualizada correctamente"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error en base de datos", "details" => $e->getMessage()]);
}
