<?php

$word_U = ($_GET['word']);
$file = "../src/json/" . $word_U . ".json";
echo file_get_contents($file);


// for ($i = 0; $i < count($json); $i++) {
//     echo $json[$i]["UnyoNo"] . "\n";
// }
