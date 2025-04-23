<?php
require_once '../helpers/motor.php';

set_exception_handler(function ($e) {
    handle_exception($e);
});

validate_method("POST");
$input = get_json_input([
    "title", "schedule", "min_salary", "max_salary",
    "company_name", "company_location", "company_id"
]);

try {
    $stmt = $pdo->prepare("CALL sp_createJob(?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $input['title'],
        $input['schedule'],
        $input['min_salary'],
        $input['max_salary'],
        $input['company_name'],
        $input['company_location'],
        $input['company_id']
    ]);

    $result = $stmt->fetch(); // obtiene el SELECT LAST_INSERT_ID()
    echo json_encode([
        "message" => "Vacante guardada correctamente",
        "job_id" => $result["job_id"] ?? null
    ]);
} catch (Throwable $e) {
    handle_exception($e, 500, "Error al guardar la vacante");
}
