<?php
// 運用番号の JSON を返す。word は許可した名前だけを受け付ける（パス・トラバーサル対策）
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$allowed = ['akashi', 'miyahara'];
$word_U = $_GET['word'] ?? '';

if (!is_string($word_U) || !in_array($word_U, $allowed, true)) {
    http_response_code(400);
    echo json_encode(['error' => 'invalid_word']);
    exit;
}

$file = __DIR__ . "/../src/json/" . $word_U . ".json";
$body = is_file($file) ? file_get_contents($file) : false;
if ($body === false) {
    http_response_code(404);
    echo json_encode(['error' => 'not_found']);
    exit;
}
echo $body;
