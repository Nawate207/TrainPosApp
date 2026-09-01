<?php

$word1 = ($_GET['word']);

header('Content-Type: application/json');

switch ($word1) {
    case "kyoto": {
            // $text1 = "https://www.train-guide.westjr.co.jp/api/v3/" . $word1 . ".json";
            // $text2 = "https://www.train-guide.westjr.co.jp/api/v3/" . $word1 . "_sp.json";
            // $json1 = json_decode(file_get_contents($text1, false, $options), true);
            // $json2 = json_decode(file_get_contents($text2, false, $options), true);
            // $result = array_merge_recursive($json1, $json2);
            // echo json_encode($result);
            $url = "https://www.train-guide.westjr.co.jp/api/v3/kyoto.json"
            $json = json_decode(file_get_contents($url, false), true);
            echo json_encode($json);
        }
        break;
    case "kosei": {
            $text1 = "https://www.train-guide.westjr.co.jp/api/v3/" . $word1 . ".json";
            $text2 = "https://www.train-guide.westjr.co.jp/api/v3/" . $word1 . "hokurikubiwako.json";
            $json1 = json_decode(file_get_contents($text1), true);
            $json2 = json_decode(file_get_contents($text2), true);
            $result = array_merge_recursive($json1, $json2);
            echo json_encode($result);
        }
        break;
    case "osakahigashi": {
            $text1 = "https://www.train-guide.westjr.co.jp/api/v3/" . $word1 . "kyoto.json";
            $text2 = "https://www.train-guide.westjr.co.jp/api/v3/" . $word1 . ".json";
            $text3 = "https://www.train-guide.westjr.co.jp/api/v3/" . $word1 . "gakkentoshi.json";
            $text4 = "https://www.train-guide.westjr.co.jp/api/v3/" . $word1 . "yamatoji.json";
            $json1 = json_decode(file_get_contents($text1), true);
            $json2 = json_decode(file_get_contents($text2), true);
            $json3 = json_decode(file_get_contents($text3), true);
            $json4 = json_decode(file_get_contents($text4), true);
            $result = array_merge_recursive($json1, $json2, $json3, $json4);
            echo json_encode($result);
        }
        break;
    case "takarazuka": {
            $text1 = "https://www.train-guide.westjr.co.jp/api/v3/" . $word1 . "kobe.json";
            $text2 = "https://www.train-guide.westjr.co.jp/api/v3/" . $word1 . ".json";
            $json1 = json_decode(file_get_contents($text1), true);
            $json2 = json_decode(file_get_contents($text2), true);
            $result = array_merge_recursive($json1, $json2);
            echo json_encode($result);
        }
        break;
    case "tozai": {
            $text1 = "https://www.train-guide.westjr.co.jp/api/v3/" . $word1 . ".json";
            $text2 = "https://www.train-guide.westjr.co.jp/api/v3/" . $word1 . "kobe.json";
            $json1 = json_decode(file_get_contents($text1), true);
            $json2 = json_decode(file_get_contents($text2), true);
            $result = array_merge_recursive($json1, $json2);
            echo json_encode($result);
        }
        break;
    case "gakkentoshi": {
            $text1 = "https://www.train-guide.westjr.co.jp/api/v3/" . $word1 . "yamatoji.json";
            $text2 = "https://www.train-guide.westjr.co.jp/api/v3/" . $word1 . ".json";
            $json1 = json_decode(file_get_contents($text1), true);
            $json2 = json_decode(file_get_contents($text2), true);
            $result = array_merge_recursive($json1, $json2);
            echo json_encode($result);
        }
        break;
    case "yamatoji": {
            $text1 = "https://www.train-guide.westjr.co.jp/api/v3/" . $word1 . ".json";
            $text2 = "https://www.train-guide.westjr.co.jp/api/v3/" . $word1 . "osakahigashi.json";
            $json1 = json_decode(file_get_contents($text1), true);
            $json2 = json_decode(file_get_contents($text2), true);
            $result = array_merge_recursive($json1, $json2);
            echo json_encode($result);
        }
        break;
    case "hanwahagoromo": {
            $text1 = "https://www.train-guide.westjr.co.jp/api/v3/" . $word1 . "osakaloop.json";
            $text2 = "https://www.train-guide.westjr.co.jp/api/v3/" . $word1 . ".json";
            $json1 = json_decode(file_get_contents($text1), true);
            $json2 = json_decode(file_get_contents($text2), true);
            $result = array_merge_recursive($json1, $json2);
            echo json_encode($result);
        }
        break;
    default: {
            $text1 = "https://www.train-guide.westjr.co.jp/api/v3/" . $word1 . ".json";
            echo file_get_contents($text1);
        }
        break;
}

// mergeArrays([$array1, $array2]);

// function mergeArrays(array $arrays): array
// {
//     return array_reduce($arrays, function ($carry, $item) {
//         return array_merge_recursive($carry, $item);
//     }, []);
// }
?>
