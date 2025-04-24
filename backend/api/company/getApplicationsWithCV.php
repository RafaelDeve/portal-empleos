<?php
require_once '../helpers/motor.php';

ob_clean();
header('Content-Type: application/json');

set_exception_handler(function ($e) {
    handle_exception($e);
});

// ✅ POST (como estaba originalmente)
validate_method("POST");

// ✅ Obtener el cuerpo como JSON
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

    // ✅ Remover campo binario (si se coló)
    foreach ($results as &$cv) {
        unset($cv["cv_pdf"]);
    }

    echo json_encode($results, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} catch (Throwable $e) {
    handle_exception($e, 500, "Error al obtener postulaciones con CV");
}
