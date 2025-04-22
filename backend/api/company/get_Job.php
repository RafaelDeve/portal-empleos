<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "GET" || !isset($_GET["id"])) {
    http_response_code(400);
    echo json_encode(["error" => "ID requerido"]);
    exit;
}

try {
    $pdo = new PDO("sqlite:jobs.db");
    $stmt = $pdo->prepare("SELECT * FROM vacante WHERE id = ?");
    $stmt->execute([$_GET["id"]]);
    $job = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($job) {
        echo json_encode($job);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Vacante no encontrada"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
