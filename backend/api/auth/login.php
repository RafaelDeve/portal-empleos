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
$username = trim($input["user"] ?? "");
$password = trim($input["password"] ?? "");

if ($username === "" || $password === "") {
    http_response_code(400);
    echo json_encode(["error" => "Usuario o contraseña vacíos"]);
    exit;
}

try {
    $pdo = new PDO("sqlite:users.db");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("SELECT * FROM users WHERE user = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        http_response_code(401);
        echo json_encode(["error" => "Usuario no encontrado"]);
        exit;
    }

    if (!password_verify($password, $user["password"])) {
        http_response_code(401);
        echo json_encode(["error" => "Contraseña incorrecta"]);
        exit;
    }

    echo json_encode([
        "message" => "Login exitoso",
        "user" => [
            "id" => $user["id"],
            "user" => $user["user"],
            "email" => $user["email"]
        ]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}

