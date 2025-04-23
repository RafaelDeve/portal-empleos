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
    $stmt = $pdo->prepare("CALL sp_hasCV(?)");
    $stmt->execute([$userId]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode(["hasCV" => (bool)$result["has_cv"]]);
} catch (Throwable $e) {
    handle_exception($e, 500, "Error checking CV existence");
}
