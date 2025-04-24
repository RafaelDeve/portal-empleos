<?php
require_once '../helpers/motor.php';

// Aceptar GET y HEAD
$method = $_SERVER['REQUEST_METHOD'];
if ($method !== 'GET' && $method !== 'HEAD') {
    http_response_code(405);
    echo "Método no permitido";
    exit;
}

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

    // Si es HEAD, solo enviar los headers
    if ($method === 'HEAD') {
        header('Content-Type: application/pdf');
        header('Content-Length: ' . strlen($row['cv_pdf']));
        exit;
    }

    // Si es GET, enviar el archivo completo
    header('Content-Type: application/pdf');
    header('Content-Disposition: inline; filename="cv.pdf"');
    echo $row['cv_pdf'];
} catch (Throwable $e) {
    handle_exception($e, 500, "Error fetching CV PDF");
}
