<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include 'connection.php';
try {

    $sql = "
        SELECT tblcars.make, tblcars.model, tblcars.year
        FROM tblcars
    ";

    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);
}
catch (Exception $e) {
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}