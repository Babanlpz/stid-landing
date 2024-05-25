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
  'Email' => json_decode(file_get_contents('php://input'))->email,
];
$response = $mj->post(Resources::$Contact, ['body' => $body]);
if($response->success()) {
    $contact = $response->getData()[0];
    $body = [
        'IsUnsubscribed' => "true",
        'ContactID' =>  $contact['ID'],
        'ContactAlt' => $contact['Email'],
        'ListID' => "10303763",
      ];
      $response = $mj->post(Resources::$Listrecipient, ['body' => $body]);
      if($response->success()) {
        die(json_encode($response->getData()[0]));
      } else {
        die(json_encode(['error' => true, 'message' => $response->getStatus(), 'data' => $response->getData()]));
      }
} else {
    die(json_encode(['error' => true, 'message' => $response->getStatus(), 'data' => $response->getData()]));
}

