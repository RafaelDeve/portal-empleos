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
    http_response_code(405); // Método no permitido
    echo json_encode(["error" => "Método no permitido"]);
    exit;
}

// Leer datos del cuerpo
$input = json_decode(file_get_contents('php://input'), true);

// Validar campos
if (!isset($input['user'], $input['email'], $input['address'], $input['password'])) {
    http_response_code(400);
    echo json_encode(["error" => "Faltan campos"]);
    exit;
}

try {
    $pdo = new PDO('sqlite:users.db');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("INSERT INTO users (user, email, password) VALUES (?, ?, ?)");
    $stmt->execute([
        $input['user'],
        $input['email'],
        $input['address'],
        password_hash($input['password'], PASSWORD_DEFAULT)
    ]);

    echo json_encode(["message" => "Usuario guardado correctamente"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error en la base de datos", "details" => $e->getMessage()]);
}
