<?php
require_once '../helpers/motor.php';

set_exception_handler(function($e) {
    handle_exception($e);
});

validate_method("POST");
$input = get_json_input(["user", "email", "address", "password"]);

try {
    $stmt = $pdo->prepare("CALL sp_createCompany(?, ?, ?, ?)");
    $stmt->execute([
        $input['user'],
        $input['email'],
        $input['address'],
        password_hash($input['password'], PASSWORD_DEFAULT)
    ]);

    echo json_encode(["message" => "Company created successfully"]);
} catch (Throwable $e) {
    handle_exception($e);
}
