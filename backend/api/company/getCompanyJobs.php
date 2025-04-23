<?php
require_once '../helpers/motor.php';

set_exception_handler(function ($e) {
    handle_exception($e);
});

validate_method("POST");
$input = get_json_input(["company_id"]);

try {
    $stmt = $pdo->prepare("CALL sp_getCompanyJobs(?)");
    $stmt->execute([$input["company_id"]]);

    $jobs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($jobs);
} catch (Throwable $e) {
    handle_exception($e, 500, "Error al obtener vacantes de la empresa");
}
