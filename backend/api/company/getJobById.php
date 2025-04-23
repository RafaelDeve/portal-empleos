<?php
require_once '../helpers/motor.php';

set_exception_handler(function ($e) {
    handle_exception($e);
});

validate_method("GET");

if (!isset($_GET["id"])) {
    http_response_code(400);
    echo json_encode(["error" => "ID requerido"]);
    exit;
}

try {
    $stmt = $pdo->prepare("CALL sp_getJobById(?)");
    $stmt->execute([$_GET["id"]]);
    $job = $stmt->fetch();

    if ($job) {
        echo json_encode($job);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Vacante no encontrada"]);
    }
} catch (Throwable $e) {
    handle_exception($e, 500, "Error al consultar la vacante");
}
