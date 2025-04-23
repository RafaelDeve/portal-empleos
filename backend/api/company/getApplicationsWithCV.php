<?php
require_once '../helpers/motor.php';

set_exception_handler(function ($e) {
    handle_exception($e);
});

validate_method("POST");
$input = get_json_input(["job_id"]);

$jobId = intval($input["job_id"]);
if ($jobId <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "ID de vacante no válido"]);
    exit;
}

try {
    $stmt = $pdo->prepare("CALL sp_getApplicationsWithCv(?)");
    $stmt->execute([$jobId]);
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($results);
} catch (Throwable $e) {
    handle_exception($e, 500, "Error al obtener postulaciones con CV");
}
