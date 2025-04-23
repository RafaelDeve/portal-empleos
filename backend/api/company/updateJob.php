<?php
require_once '../helpers/motor.php';

set_exception_handler(function ($e) {
    handle_exception($e);
});

validate_method("PUT");
$input = get_json_input([
    "id", "title", "schedule", "min_salary",
    "max_salary", "company_name", "company_location"
]);

try {
    $stmt = $pdo->prepare("CALL sp_updateJob(?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $input["id"],
        $input["title"],
        $input["schedule"],
        $input["min_salary"],
        $input["max_salary"],
        $input["company_name"],
        $input["company_location"]
    ]);

    echo json_encode(["message" => "Vacante actualizada correctamente"]);
} catch (Throwable $e) {
    handle_exception($e, 500, "Error al actualizar la vacante");
}
