<?php
require_once '../helpers/motor.php';

set_exception_handler(function ($e) {
    handle_exception($e);
});

validate_method("POST");
$input = get_json_input([
    "job_id", "description", "requirements", "benefits", "publication_date"
]);

try {
    $stmt = $pdo->prepare("CALL sp_createJobDetails(?, ?, ?, ?, ?)");
    $stmt->execute([
        $input['job_id'],
        $input['description'],
        $input['requirements'],
        $input['benefits'],
        $input['publication_date']
    ]);

    echo json_encode(["message" => "Detalles guardados correctamente"]);
} catch (Throwable $e) {
    handle_exception($e, 500, "Error al guardar los detalles de la vacante");
}
