<?php
/**
 * UPI Payment Verification API
 * 
 * This script handles UPI payment verification with your payment gateway.
 * In a production environment, this would connect to actual UPI payment verification services.
 */

// Set headers for JSON response
header('Content-Type: application/json');

// Enable CORS if needed
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Create log directory if it doesn't exist
if (!file_exists('./logs')) {
    mkdir('./logs', 0755, true);
}

// Log file for debugging
$logFile = './logs/upi-payment-logs.txt';

// Write initial log entry for this request
file_put_contents($logFile, date('[Y-m-d H:i:s] ') . "Request started from " . $_SERVER['REMOTE_ADDR'] . PHP_EOL, FILE_APPEND);

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Check if this is a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response = [
        'success' => false,
        'message' => 'Only POST requests are allowed',
        'error_code' => 'METHOD_NOT_ALLOWED'
    ];
    file_put_contents($logFile, date('[Y-m-d H:i:s] ') . "Error: " . json_encode($response) . PHP_EOL, FILE_APPEND);
    echo json_encode($response);
    exit;
}

// Get the JSON data from the request
$rawInput = file_get_contents('php://input');
file_put_contents($logFile, date('[Y-m-d H:i:s] ') . "Raw input: " . $rawInput . PHP_EOL, FILE_APPEND);

$requestData = json_decode($rawInput, true);

// Check if JSON is valid
if (json_last_error() !== JSON_ERROR_NONE) {
    $response = [
        'success' => false,
        'message' => 'Invalid JSON data: ' . json_last_error_msg(),
        'error_code' => 'INVALID_JSON'
    ];
    file_put_contents($logFile, date('[Y-m-d H:i:s] ') . "Error: " . json_encode($response) . PHP_EOL, FILE_APPEND);
    echo json_encode($response);
    exit;
}

// Log the incoming request
file_put_contents($logFile, date('[Y-m-d H:i:s] ') . "Request: " . json_encode($requestData) . PHP_EOL, FILE_APPEND);

// Validate required fields
$requiredFields = ['transactionId', 'upiId', 'amount'];
$missingFields = [];

foreach ($requiredFields as $field) {
    if (empty($requestData[$field])) {
        $missingFields[] = $field;
    }
}

if (!empty($missingFields)) {
    $response = [
        'success' => false,
        'message' => "Missing required fields: " . implode(', ', $missingFields),
        'error_code' => 'MISSING_FIELDS',
        'missing_fields' => $missingFields
    ];
    file_put_contents($logFile, date('[Y-m-d H:i:s] ') . "Error: " . json_encode($response) . PHP_EOL, FILE_APPEND);
    echo json_encode($response);
    exit;
}

// Extract data from the request
$transactionId = $requestData['transactionId'];
$upiId = $requestData['upiId'];
$amount = $requestData['amount'];
$referenceId = $requestData['referenceId'] ?? '';
$timestamp = $requestData['timestamp'] ?? time();

/**
 * In a real implementation, you would:
 * 1. Connect to your payment gateway provider's API
 * 2. Verify the transaction status using the transaction ID
 * 3. Confirm the amount, merchant ID, etc.
 * 4. Return the verification result
 * 
 * For this example, we'll simulate the verification process
 */

// Validate the UPI ID is correct
$validUpiId = '8920869673@hdfc'; // This should match the one in payment-gateway.js
$isValidUpiId = ($upiId === $validUpiId);

// For demonstration purposes, consider all transactions with valid UPI ID as successful
$isValid = $isValidUpiId && !empty($transactionId) && !empty($amount);

// Simulate an API call delay
usleep(500000); // 0.5 seconds

// Simulate a response from the payment gateway
$verificationResponse = [
    'success' => $isValid,
    'transactionId' => $transactionId,
    'referenceId' => $referenceId ?: 'UPI' . time() . rand(1000, 9999),
    'status' => $isValid ? 'COMPLETED' : 'FAILED',
    'message' => $isValid ? 'Payment verified successfully' : ($isValidUpiId ? 'Payment verification failed' : 'Invalid UPI ID'),
    'timestamp' => date('Y-m-d H:i:s', $timestamp),
    'amount' => $amount,
    'currency' => 'INR',
    'paymentMethod' => 'UPI',
    'merchantId' => 'LUXURYJEWELS',
    'upiId' => $upiId,
    'payerName' => 'Customer Name', // In a real scenario, this would come from the UPI provider
    'transactionTime' => date('Y-m-d H:i:s'),
    'debugInfo' => [
        'receivedUpiId' => $upiId,
        'expectedUpiId' => $validUpiId,
        'isValidUpiId' => $isValidUpiId,
        'receivedAmount' => $amount,
        'receivedTransactionId' => $transactionId,
        'serverTime' => date('Y-m-d H:i:s'),
        'requestIP' => $_SERVER['REMOTE_ADDR']
    ],
    'gatewayResponse' => [
        'code' => $isValid ? 'SUCCESS' : 'FAILED',
        'description' => $isValid ? 'Transaction was successful' : 'Transaction failed verification',
        'providerReferenceId' => 'UPI' . rand(1000000, 9999999)
    ]
];

// Log the response
file_put_contents($logFile, date('[Y-m-d H:i:s] ') . "Response: " . json_encode($verificationResponse) . PHP_EOL, FILE_APPEND);

// Check if we should simulate a failure (for testing)
if (isset($requestData['simulateFailure']) && $requestData['simulateFailure']) {
    $verificationResponse['success'] = false;
    $verificationResponse['status'] = 'FAILED';
    $verificationResponse['message'] = 'Payment verification failed (simulated)';
    file_put_contents($logFile, date('[Y-m-d H:i:s] ') . "Simulated failure requested." . PHP_EOL, FILE_APPEND);
}

// Return the verification result
echo json_encode($verificationResponse); 