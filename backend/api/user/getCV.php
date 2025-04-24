<?php
require_once '../helpers/motor.php';

validate_method("GET");

$userId = $_GET['user_id'] ?? null;
if (!$userId) {
    http_response_code(400);
    echo json_encode(["error" => "Missing user_id"]);
    exit;
}

try {
    $stmt = $pdo->prepare("CALL sp_getCV(?)");
    $stmt->execute([$userId]);
    $cv = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$cv || empty($cv['first_name'])) {  // validación mínima
        http_response_code(404);
        echo json_encode(["error" => "CV not found"]);
        exit;
    }

    // Debugging opcional
    header('Content-Type: application/json');
    echo json_encode($cv, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

} catch (Throwable $e) {
    handle_exception($e, 500, "Error fetching CV");
}
