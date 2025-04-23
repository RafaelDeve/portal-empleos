<?php
require_once '../helpers/motor.php';

set_exception_handler(function ($e) {
    handle_exception($e);
});

validate_method("DELETE");
$input = get_json_input(["id"]);

$jobId = intval($input["id"]);
if ($jobId <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "ID de vacante inválido o no especificado"]);
    exit;
}

try {
    $stmt = $pdo->prepare("CALL sp_deleteJob(?)");
    $stmt->execute([$jobId]);

    echo json_encode(["message" => "Vacante eliminada correctamente"]);
} catch (Throwable $e) {
    handle_exception($e, 500, "Error al eliminar la vacante");
}
