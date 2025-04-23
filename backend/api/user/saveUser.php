<?php
require_once '../helpers/motor.php';

set_exception_handler(function($e) {
    handle_exception($e);
});

validate_method("POST");
$input = get_json_input(["user", "email", "password"]);

$username = trim($input['user']);
$email = trim($input['email']);
$password = trim($input['password']);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Email inválido"]);
    exit;
}

if (strlen($password) < 4) {
    http_response_code(400);
    echo json_encode(["error" => "La contraseña debe tener al menos 4 caracteres"]);
    exit;
}

try {
    $stmt = $pdo->prepare("CALL sp_createUser(?, ?, ?)");
    $stmt->execute([
        $username,
        $email,
        password_hash($password, PASSWORD_DEFAULT)
    ]);

    echo json_encode(["message" => "Usuario guardado correctamente"]);
} catch (Throwable $e) {
    handle_exception($e);
}
