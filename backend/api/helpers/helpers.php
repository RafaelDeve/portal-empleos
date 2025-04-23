<?php

function validate_method($expected) {
    if ($_SERVER["REQUEST_METHOD"] !== $expected) {
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        exit;
    }
}

function get_json_input($requiredFields = []) {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!is_array($data)) {
        http_response_code(400);
        echo json_encode(["error" => "JSON inválido"]);
        exit;
    }

    foreach ($requiredFields as $field) {
        if (!isset($data[$field])) {
            http_response_code(400);
            echo json_encode(["error" => "Falta el campo '$field'"]);
            exit;
        }
    }
    return $data;
}

function db_error($e) {
    http_response_code(500);
    echo json_encode(["error" => "Error en la base de datos", "details" => $e->getMessage()]);
    exit;
}

function handle_exception(Throwable $e, $code = 500, $customMessage = null) {
    http_response_code($code);
    echo json_encode([
        "error" => $customMessage ?: "Error interno del servidor",
        "details" => getenv("APP_DEBUG") === "true" ? $e->getMessage() : null
    ]);
    exit;
}
