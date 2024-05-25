<?php

// Replace '*' with your frontend's origin (e.g., 'http://localhost:3000') to restrict access
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// If the request is an OPTIONS request (preflight), exit early
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  exit();
}

require __DIR__ . '/vendor/autoload.php';

use \Mailjet\Resources;

$apikey = 'c0ac075fd03c6e59c86e5287226226c8';
$apisecret = 'a5a37d846671a8fbd81ffa0f67fbe626';

$mj = new \Mailjet\Client('c0ac075fd03c6e59c86e5287226226c8', 'a5a37d846671a8fbd81ffa0f67fbe626',true);

$body = [
  'FromEmail' => "communication@stid.com",
  'FromName' => "Stid",
  'Recipients' => [
    [
      'Email' => "communication@stid.com",
      'Name' => "Stid"
    ]
  ],
  'ReplyTo' => json_decode(file_get_contents('php://input'))->email,
  'Subject' => "Message from Stid's Online landing page",
  'Text-part' => json_decode(file_get_contents('php://input'))->message . " - " . json_decode(file_get_contents('php://input'))->company . " - " . json_decode(file_get_contents('php://input'))->name . " - " . json_decode(file_get_contents('php://input'))->email,
  'Html-part' => "<p>" . json_decode(file_get_contents('php://input'))->message . "</p><p>" . json_decode(file_get_contents('php://input'))->company . "</p>". "</p><p>" . json_decode(file_get_contents('php://input'))->name . "</p>". "</p><p>" . json_decode(file_get_contents('php://input'))->email . "</p>"
];
$response = $mj->post(Resources::$Email, ['body' => $body]);

if($response->success()) {
  die(json_encode($response->getData()));
} else {
  die(json_encode(['error' => true, 'message' => $response->getStatus(), 'data' => $response->getData()]));
}
