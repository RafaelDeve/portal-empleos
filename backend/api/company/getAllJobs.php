<?php
require_once '../helpers/motor.php';

set_exception_handler(function ($e) {
    handle_exception($e);
});

validate_method("GET");

try {
    $stmt = $pdo->query("CALL sp_getAllJobs()");
    $jobs = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($jobs);
} catch (Throwable $e) {
    handle_exception($e, 500, "Error al obtener todas las vacantes");
}
