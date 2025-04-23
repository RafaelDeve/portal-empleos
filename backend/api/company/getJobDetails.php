<?php
require_once '../helpers/motor.php';

set_exception_handler(function ($e) {
    handle_exception($e);
});

validate_method("GET");

if (!isset($_GET["id"])) {
    http_response_code(400);
    echo json_encode(["error" => "ID de vacante requerido"]);
    exit;
}

$id = $_GET["id"];

try {
    $stmt = $pdo->prepare("
        SELECT 
            j.*, 
            d.description, 
            d.requirements, 
            d.benefits, 
            d.publication_date,
            (SELECT COUNT(*) FROM applications a WHERE a.job_id = j.id) AS postulaciones
        FROM jobs j
        LEFT JOIN jobdetails d ON j.id = d.job_id
        WHERE j.id = ?
    ");
    $stmt->execute([$id]);
    $vacante = $stmt->fetch();

    if ($vacante) {
        echo json_encode($vacante);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Vacante no encontrada"]);
    }
} catch (Throwable $e) {
    handle_exception($e, 500, "Error al obtener detalles de la vacante");
}
