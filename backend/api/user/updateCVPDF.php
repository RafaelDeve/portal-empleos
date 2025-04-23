<?php
require_once '../helpers/motor.php';

validate_method("POST");

if (!isset($_POST['user_id']) || !isset($_FILES['cv_pdf'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required data"]);
    exit;
}

$userId = $_POST['user_id'];
$pdf = file_get_contents($_FILES['cv_pdf']['tmp_name']);

try {
    $stmt = $pdo->prepare("CALL sp_updateCVPDF(?, ?)");
    $stmt->bindParam(1, $userId, PDO::PARAM_INT);
    $stmt->bindParam(2, $pdf, PDO::PARAM_LOB);
    $stmt->execute();
    echo json_encode(["success" => true]);
} catch (Throwable $e) {
    handle_exception($e, 500, "Error updating CV PDF");
}
