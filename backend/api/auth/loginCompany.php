<?php
require_once '../helpers/motor.php';

set_exception_handler(function($e) {
    handle_exception($e);
});

validate_method("POST");
$input = get_json_input(["user", "password"]);

$username = trim($input["user"]);
$password = trim($input["password"]);

try {
    $stmt = $pdo->prepare("CALL sp_loginCompany(?)");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if (!$user) {
        http_response_code(401);
        echo json_encode(["error" => "User not found"]);
        exit;
    }

    if (!password_verify($password, $user["password"])) {
        http_response_code(401);
        echo json_encode(["error" => "Incorrect password"]);
        exit;
    }

    echo json_encode([
        "message" => "Login successful",
        "user" => [
            "id" => $user["id"],
            "user" => $user["user"],
            "email" => $user["email"],
            "address" => $user["address"]
        ]
    ]);
} catch (Throwable $e) {
    handle_exception($e, 500, "Error during login");
}
