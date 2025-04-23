<?php
require_once '../helpers/motor.php';

validate_method("POST");

$data = get_json_input([
    "user_id", "first_name", "last_name", "phone", "address", "city",
    "education_institution", "degree_title", "education_start_date", "education_end_date",
    "work_company", "work_position", "work_start_date", "work_end_date",
    "skills", "languages", "career_objective", "achievements_projects",
    "availability", "linkedin_profile", "references"
]);

try {
    $stmt = $pdo->prepare("CALL sp_saveCV(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $data["user_id"],
        $data["first_name"],
        $data["last_name"],
        $data["phone"],
        $data["address"],
        $data["city"],
        $data["education_institution"],
        $data["degree_title"],
        $data["education_start_date"],
        $data["education_end_date"],
        $data["work_company"],
        $data["work_position"],
        $data["work_start_date"],
        $data["work_end_date"],
        $data["skills"],
        $data["languages"],
        $data["career_objective"],
        $data["achievements_projects"],
        $data["availability"],
        $data["linkedin_profile"],
        $data["references"]
    ]);
    echo json_encode(["success" => true]);
} catch (Throwable $e) {
    handle_exception($e, 500, "Error saving CV");
}
