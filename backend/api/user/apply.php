<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input["user_id"], $input["job_id"])) {
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
    $pdo = new PDO($dsn, $user, $pass, $options);

    $stmt = $pdo->prepare("INSERT IGNORE INTO applications (user_id, job_id) VALUES (?, ?)");
    $stmt->execute([$input["user_id"], $input["job_id"]]);

    echo json_encode(["message" => "Aplicación realizada correctamente"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
