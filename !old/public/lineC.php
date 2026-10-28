<?php
// JR東海の運行情報 JSON を中継する。word は英小文字・数字・下線のみ（URL の区切りや ".." を含められないようにする）
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$wordC = $_GET['word'] ?? '';

if (!is_string($wordC) || !preg_match('/^[a-z0-9_]{1,40}$/D', $wordC)) {
    http_response_code(400);
    echo json_encode(['error' => 'invalid_word']);
    exit;
}

$textC = "https://traininfo.jr-central.co.jp/zairaisen/data/hp_" . $wordC . "_ja.json";
$body = file_get_contents($textC);
if ($body === false) {
    http_response_code(502);
    echo json_encode(['error' => 'upstream_unavailable']);
    exit;
}
echo $body;
