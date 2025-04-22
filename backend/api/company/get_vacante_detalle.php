<?php
// Habilitar CORS
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
    echo json_encode(["error" => "ID de vacante requerido"]);
    exit;
}

$id = $_GET["id"];

try {
    $pdo = new PDO("sqlite:jobs.db");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Obtener vacante
    $stmt = $pdo->prepare("
        SELECT v.*, d.descripcion, d.requerimientos, d.beneficios, d.fecha_publicacion
        FROM vacante v
        LEFT JOIN detalles_vacante d ON v.id = d.vacante_id
        WHERE v.id = ?
    ");
    $stmt->execute([$id]);
    $vacante = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($vacante) {
        echo json_encode($vacante);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Vacante no encontrada"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
