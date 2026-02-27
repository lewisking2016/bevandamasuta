<?php
/**
 * EMERGENCY DB BRIDGE - Bevanda Masuta
 * This script allows Vercel to save data to MySQL via HTTPS (Port 443)
 * to bypass the Port 3306 firewall block.
 */

header('Content-Type: application/json');

// --- CONFIGURATION ---
$DB_HOST = 'localhost';
$DB_USER = 'vnsbhpwh_bevanda';
$DB_PASS = 'lewisking2005';
$DB_NAME = 'vnsbhpwh_bevandamasuta_db';
$BRIDGE_KEY = 'bevanda_emergency_2026'; // Simple security key

// --- SECURITY CHECK ---
$input = json_decode(file_get_contents('php://input'), true);
if (!$input || $input['key'] !== $BRIDGE_KEY) {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized Access']);
    exit;
}

// --- DATABASE CONNECTION ---
$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'DB Connection Failed: ' . $conn->connect_error]);
    exit;
}

// --- DATA PROCESSING (Contacts Table) ---
$first_name = $conn->real_escape_string($input['first_name']);
$last_name = $conn->real_escape_string($input['last_name']);
$email = $conn->real_escape_string($input['email']);
$country_code = $conn->real_escape_string($input['country_code']);
$phone_number = $conn->real_escape_string($input['phone_number']);
$service_interest = $conn->real_escape_string($input['service_interest']);
$subject = $conn->real_escape_string($input['subject']);
$message = $conn->real_escape_string($input['message']);

$sql = "INSERT INTO contacts (first_name, last_name, email, country_code, phone_number, service_interest, subject, message) 
        VALUES ('$first_name', '$last_name', '$email', '$country_code', '$phone_number', '$service_interest', '$subject', '$message')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true, 'id' => $conn->insert_id]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Query Failed: ' . $conn->error]);
}

$conn->close();
?>
