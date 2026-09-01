<?php

$wordC = ($_GET['word']);
$textC = "https://traininfo.jr-central.co.jp/zairaisen/data/hp_" . $wordC . "_ja.json";
echo file_get_contents($textC);
