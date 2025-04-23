<?php
require_once '../helpers/motor.php';

validate_method("GET");

$userId = $_GET['user_id'] ?? null;
if (!$userId) {
    http_response_code(400);
    echo "Missing user_id";
    exit;
}

try {
    $stmt = $pdo->prepare("CALL sp_getCVPDF(?)");
    $stmt->execute([$userId]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$row || empty($row['cv_pdf'])) {
        http_response_code(404);
        echo "CV PDF not found";
        exit;
    }

    header('Content-Type: application/pdf');
    header('Content-Disposition: inline; filename="cv.pdf"');
    echo $row['cv_pdf'];
} catch (Throwable $e) {
    handle_exception($e, 500, "Error fetching CV PDF");
}
