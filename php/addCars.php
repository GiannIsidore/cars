<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include 'connection.php';
try {
    $input = file_get_contents('php://input');
    $cars = json_decode($input, true);
    $conn->beginTransaction();

    $sqlCars = "INSERT INTO tblcars (make, model, year) VALUES (:make, :model, :year)";
    $stmtCars = $conn->prepare($sqlCars);
    $stmtCars->bindParam(':make', $cars['make']);
    $stmtCars->bindParam(':model', $cars['model']);
    $stmtCars->bindParam(':year', $cars['year']);
    $stmtCars->execute();

    $conn->commit();
    echo json_encode(["success" => true, "message" => "Car data saved successfully."]);
}
catch (Exception $e) {
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}