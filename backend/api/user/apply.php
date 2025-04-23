<?php
require_once '../helpers/motor.php';

set_exception_handler(function($e) {
    handle_exception($e);
});

validate_method("POST");
$input = get_json_input(["user_id", "job_id"]);

try {
    $stmt = $pdo->prepare("CALL sp_applyToJob(?, ?)");
    $stmt->execute([
        $input["user_id"],
        $input["job_id"]
    ]);

    echo json_encode(["message" => "Aplicación realizada correctamente"]);
} catch (Throwable $e) {
    handle_exception($e);
}
