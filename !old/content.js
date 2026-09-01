/// 定数定義
const area = "近畿エリア";
const OperationInfoPages = [
    {
        'area': 'JRW',
        'code': 'hokuriku',
        'line': '北陸エリア',
        'sectionId': 'InfoBtn'
    }, {
        'area': 'JRW',
        'code': 'kinki',
        'line': '近畿エリア',
        'sectionId': 'InfoBtn'
    }, {
        'area': 'JRW',
        'code': 'chugoku',
        'line': '中国エリア',
        'sectionId': 'InfoBtn'
    }, {
        'area': 'JRW',
        'code': 'ex_index',
        'line': '特急列車',
        'sectionId': 'InfoBtn'
    }, {
        'area': 'JRC',
        'code': 'zairaisen',
        'line': 'JRCエリア',
        'sectionId': 'InfoBtn'
    }

]

const KinkiAreaLine = [
    {
        'code': 'hokuriku',
        'line': '北陸本線',
        'sectionId': 'lineBtnKinki',
        'flowType': 'JrwOther'
    }, {
        'code': 'hokurikubiwako',
        'line': 'A 琵琶湖線',
        'sectionId': 'lineBtnKinki',
        'flowType': 'KinkiUrban'
    }, {
        'code': 'kyoto',
        'line': 'A 京都線',
        'sectionId': 'lineBtnKinki',
        'flowType': 'KinkiUrban'
    }, {
        'code': 'kobesanyo',
        'line': 'A 神戸線',
        'sectionId': 'lineBtnKinki',
        'flowType': 'KinkiUrban'
    }, {
        'code': 'ako',
        'line': 'A 赤穂線',
        'sectionId': 'lineBtnKinki',
        'flowType': 'KinkiUrban'
    }, {
        'code': 'kosei',
        'line': 'B 湖西線',
        'sectionId': 'lineBtnKinki',
        'flowType': 'KinkiUrban'
    }, {
        'code': 'kusatsu',
        'line': 'C 草津線',
        'sectionId': 'lineBtnKinki',
        'flowType': 'JrwOther'
    }, {
        'code': 'nara',
        'line': 'D 奈良線',
        'sectionId': 'lineBtnKinki',
        'flowType': 'JrwOther'
    }, {
        'code': 'sagano',
        'line': 'E 嵯峨野線',
        'sectionId': 'lineBtnKinki',
        'flowType': 'JrwOther'
    }, {
        'code': 'sanin1',
        'line': 'E 山陰本線',
        'sectionId': 'lineBtnKinki',
        'flowType': 'JrwOther'
    }, {
        'code': 'sanin2',
        'line': 'E/A 山陰本線',
        'sectionId': 'lineBtnKinki',
        'flowType': 'JrwOther'
    }, {
        'code': 'osakahigashi',
        'line': 'F おおさか東線',
        'sectionId': 'lineBtnKinki',
        'flowType': 'KinkiUrban'
    }, {
        'code': 'takarazuka',
        'line': 'G 宝塚線',
        'sectionId': 'lineBtnKinki',
        'flowType': 'KinkiUrban'
    }, {
        'code': 'fukuchiyama',
        'line': 'G 福知山線',
        'sectionId': 'lineBtnKinki',
        'flowType': 'JrwOther'
    }, {
        'code': 'tozai',
        'line': 'H JR東西線',
        'sectionId': 'lineBtnKinki',
        'flowType': 'KinkiUrban'
    }, {
        'code': 'gakkentoshi',
        'line': 'H 学研都市線',
        'sectionId': 'lineBtnKinki',
        'flowType': 'KinkiUrban'
    }, {
        'code': 'bantan',
        'line': 'J 播但線',
        'sectionId': 'lineBtnKinki',
        'flowType': 'JrwOther'
    }, {
        'code': 'maizuru',
        'line': 'L 舞鶴線',
        'sectionId': 'lineBtnKinki',
        'flowType': 'JrwOther'
    }, {
        'code': 'osakaloop',
        'line': 'O 大阪環状線',
        'sectionId': 'lineBtnKinki',
        'flowType': 'KinkiUrban'
    }, {
        'code': 'yumesaki',
        'line': 'P JRゆめ咲線',
        'sectionId': 'lineBtnKinki',
        'flowType': 'KinkiUrban'
    }, {
        'code': 'yamatoji',
        'line': 'Q 大和路線',
        'sectionId': 'lineBtnKinki',
        'flowType': 'KinkiUrban'
    }, {
        'code': 'hanwahagoromo',
        'line': 'R 阪和線',
        'sectionId': 'lineBtnKinki',
        'flowType': 'KinkiUrban'
    }, {
        'code': 'kansaiairport',
        'line': 'S 関西空港線',
        'sectionId': 'lineBtnKinki',
        'flowType': 'KinkiUrban'
    }, {
        'code': 'wakayama1',
        'line': 'T 和歌山線 和歌山-五条',
        'sectionId': 'lineBtnKinki',
        'flowType': 'JrwOther'
    }, {
        'code': 'wakayama2',
        'line': 'T 和歌山線 五条-王寺',
        'sectionId': 'lineBtnKinki',
        'flowType': 'JrwOther'
    }, {
        'code': 'manyomahoroba',
        'line': 'U 万葉まほろば線',
        'sectionId': 'lineBtnKinki',
        'flowType': 'JrwOther'
    }, {
        'code': 'kansai',
        'line': 'V 関西本線',
        'sectionId': 'lineBtnKinki',
        'flowType': 'JrwOther'
    }, {
        'code': 'kinokuni',
        'line': 'W きのくに線',
        'sectionId': 'lineBtnKinki',
        'flowType': 'JrwOther'
    }
];

const OkayamaAreaLine = [
    {
        'code': 'unominato',
        'line': 'L 宇野みなと線',
        'sectionId': 'lineBtnOkayama',
        'flowType': 'JrwOther'
    }, {
        'code': 'setoohashi',
        'line': 'M 瀬戸大橋線',
        'sectionId': 'lineBtnOkayama',
        'flowType': 'JrwOther'
    }, {
        'code': 'ako2',
        'line': 'N 赤穂線',
        'sectionId': 'lineBtnOkayama',
        'flowType': 'JrwOther'
    }, {
        'code': 'sanyo1',
        'line': 'S/W/X 山陽本線',
        'sectionId': 'lineBtnOkayama',
        'flowType': 'JrwOther'
    }, {
        'code': 'tsuyama',
        'line': 'T 津山線',
        'sectionId': 'lineBtnOkayama',
        'flowType': 'JrwOther'
    }, {
        'code': 'hakubi1',
        'line': 'V 伯備線',
        'sectionId': 'lineBtnOkayama',
        'flowType': 'JrwOther'
    }, {
        'code': 'fukuen1',
        'line': 'Z 福塩線',
        'sectionId': 'lineBtnOkayama',
        'flowType': 'JrwOther'
    },
];

const HiroSekiAreaLine = [
    {
        'code': 'kabe',
        'line': 'B 可部線',
        'sectionId': 'lineBtnHiroseki',
        'flowType': 'JrwOther'
    }, {
        'code': 'sanyo2',
        'line': 'G/R 山陽本線',
        'sectionId': 'lineBtnHiroseki',
        'flowType': 'JrwOther'
    }, {
        'code': 'sanyo3',
        'line': '山陽本線',
        'sectionId': 'lineBtnHiroseki',
        'flowType': 'JrwOther'
    }, {
        'code': 'geibi1',
        'line': 'P 芸備線',
        'sectionId': 'lineBtnHiroseki',
        'flowType': 'JrwOther'
    }, {
        'code': 'kure',
        'line': 'Y 呉線',
        'sectionId': 'lineBtnHiroseki',
        'flowType': 'JrwOther'
    }, {
        'code': 'yamaguchi',
        'line': '山口線',
        'sectionId': 'lineBtnHiroseki',
        'flowType': 'JrwOther'
    }
];

const SaninAreaLine = [
    {
        'code': 'sanin3',
        'line': 'A 山陰本線',
        'sectionId': 'lineBtnSanin',
        'flowType': 'JrwOther'
    }, {
        'code': 'imbi1',
        'line': 'B 因美線',
        'sectionId': 'lineBtnSanin',
        'flowType': 'JrwOther'
    }, {
        'code': 'sanin4',
        'line': 'D 山陰本線',
        'sectionId': 'lineBtnSanin',
        'flowType': 'JrwOther'
    }, {
        'code': 'hakubi2',
        'line': 'V 伯備線',
        'sectionId': 'lineBtnSanin',
        'flowType': 'JrwOther'
    }
];

const CentralAreaLine = [
    // 在来線各線
    {
        'code': 'zaisenichijoho_10001',
        'line': 'CA 東海道線(豊橋～米原)',
        'sectionId': 'lineBtnCentral',
        'flowType': 'Jrc'
    }, {
        'code': 'zaisenichijoho_10011',
        'line': 'CA 東海道線(熱海～豊橋)',
        'sectionId': 'lineBtnCentral',
        'flowType': 'Jrc'
    }, {
        'code': 'zaisenichijoho_10013',
        'line': 'CB 御殿場線',
        'sectionId': 'lineBtnCentral',
        'flowType': 'Jrc'
    }, {
        'code': 'zaisenichijoho_10012',
        'line': 'CC 身延線',
        'sectionId': 'lineBtnCentral',
        'flowType': 'Jrc'
    }, {
        'code': 'zaisenichijoho_10010',
        'line': 'CD 飯田線',
        'sectionId': 'lineBtnCentral',
        'flowType': 'Jrc'
    }, {
        'code': 'zaisenichijoho_10002',
        'line': 'CE 武豊線',
        'sectionId': 'lineBtnCentral',
        'flowType': 'Jrc'
    }, {
        'code': 'zaisenichijoho_10003',
        'line': 'CF 中央線',
        'sectionId': 'lineBtnCentral',
        'flowType': 'Jrc'
    }, {
        'code': 'zaisenichijoho_10004',
        'line': 'CG 高山線',
        'sectionId': 'lineBtnCentral',
        'flowType': 'Jrc'
    }, {
        'code': 'zaisenichijoho_10005',
        'line': 'CI 太多線',
        'sectionId': 'lineBtnCentral',
        'flowType': 'Jrc'
    }, {
        'code': 'zaisenichijoho_10006',
        'line': 'CJ 関西線',
        'sectionId': 'lineBtnCentral',
        'flowType': 'Jrc'
    }, {
        'code': 'zaisenichijoho_10007',
        'line': '紀勢線',
        'sectionId': 'lineBtnCentral',
        'flowType': 'Jrc'
    }, {
        'code': 'zaisenichijoho_10009',
        'line': '名松線',
        'sectionId': 'lineBtnCentral',
        'flowType': 'Jrc'
    }, {
        'code': 'zaisenichijoho_10008',
        'line': '参宮線',
        'sectionId': 'lineBtnCentral',
        'flowType': 'Jrc'
    }, {
        'code': 'zaisenichijoho_99999',
        'line': 'CA 美濃赤坂線',
        'sectionId': 'lineBtnCentral',
        'flowType': 'Jrc'
    }, {
        'code': 'zaisenichijoho_99999',
        'line': '伊勢鉄道',
        'sectionId': 'lineBtnCentral',
        'flowType': 'Jrc'
    }
    // // 有料列車
    // {
    //     'code': 'zaisenichijoho_30001',
    //     'line': 'ひだ',
    //     'sectionId': 'lineBtnCentral',
    //     'flowType': 'Jrc'
    // }, {
    //     'code': 'zaisenichijoho_30002',
    //     'line': 'しなの',
    //     'sectionId': 'lineBtnCentral',
    //     'flowType': 'Jrc'
    // }, {
    //     'code': 'zaisenichijoho_30003',
    //     'line': '南紀',
    //     'sectionId': 'lineBtnCentral',
    //     'flowType': 'Jrc'
    // }, {
    //     'code': 'zaisenichijoho_30004',
    //     'line': '伊那路',
    //     'sectionId': 'lineBtnCentral',
    //     'flowType': 'Jrc'
    // }, {
    //     'code': 'zaisenichijoho_30005',
    //     'line': 'ふじかわ',
    //     'sectionId': 'lineBtnCentral',
    //     'flowType': 'Jrc'
    // }, {
    //     'code': 'zaisenichijoho_30006',
    //     'line': 'しらさぎ',
    //     'sectionId': 'lineBtnCentral',
    //     'flowType': 'Jrc'
    // }, {
    //     'code': 'zaisenichijoho_30007',
    //     'line': 'ふじさん',
    //     'sectionId': 'lineBtnCentral',
    //     'flowType': 'Jrc'
    // }, {
    //     'code': 'zaisenichijoho_30008',
    //     'line': 'みえ',
    //     'sectionId': 'lineBtnCentral',
    //     'flowType': 'Jrc'
    // }
];

/// クラス定義
// 列車情報クラス
// JRW近畿アーバン
class TrainWestUrban {
    constructor() {
        this.no = "";
        this.pos = "";
        this.direction = 0;
        this.nickname = "";
        this.type = "";
        this.displayType = "";
        this.dest = {};
        this.via = "";
        this.delayMinutes = 0;
        this.aSeatInfo = "";
        this.typeChange = "";
        this.numberOfCars = 0;
        this.stopTime = "";
        this.iconId = "";
    }
}

// JRW近畿その他
class TrainWestOther {
    constructor() {
        this.no = "";
        this.dest = "";
        this.direction = 0;
        this.displayType = "";
        this.delayMinutes = 0;
        this.nickname = "";
        this.pos = "";
        this.type = "";
        this.notice = "";
    }
}

// JRC
class TrainCentral {
    constructor() {
        this.cars = "";
        this.crowded = "";
        this.delay_lin = 0;
        this.delay_proof = 0;
        this.direction = {};
        this.doors = "";
        this.laststation = {};
        this.linename = {};
        this.locationCol = 0;
        this.locationRow = 0;
        this.nickname = {};
        this.nickname_no = 0;
        this.position = 0;
        this.tostation = {};
        this.tostation2 = {};
        this.trainnumber = "";
        this.traintype = {};
    }
}

// 列車行先情報クラス
class Destination {
    constructor(code, line, text) {
        this.text = text;
        this.code = code;
        this.line = line;
    }
}

/// 関数定義

// 画面上に年月日時分秒を出力
function clock() {
    // 現在日時を表すインスタンスを取得
    let now = new Date();
    // 年
    let year = now.getFullYear();
    // 月　0から11で取得されるので実際の月は+１したものになる
    let month = now.getMonth() + 1;
    //　日
    let date = now.getDate();
    //　曜日　0から6で日曜始まりで取得されるので配列のインデックスを指定する
    let weeks = new Array("日", "月", "火", "水", "木", "金", "土")
    let day = weeks[now.getDay()];
    //　時
    let time = now.getHours();
    //　分
    let min = now.getMinutes();
    //　秒
    let sec = now.getSeconds();

    // 日付時刻　常に2桁にする処理
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (min < 10) min = "0" + min;
    if (sec < 10) sec = "0" + sec;

    // HTML span clock_date 日付を表示
    document.getElementById("Date-Time").innerHTML = year + "/" + month + "/" + date + "（" + day + "）" + time + ":" + min + ":" + sec;
}

// clock関数を1000ミリ秒（毎秒）に実行する
setInterval(clock, 1000);

function headerDate() {
    //
}

// 列車情報への型定義
/**
 * 取得したデータをマッピング
 * 列車情報クラス - 近畿アーバン
 * @param {*} obj 
 * @return {TrainWestUrban}
 */
function buildTrainWestUrban(obj) {
    const train = new TrainWestUrban();
    train.no = obj["no"];
    train.pos = obj["pos"];
    train.direction = obj["direction"];
    train.nickname = obj["nickname"];
    train.type = obj["type"];
    train.displayType = obj["displayType"];
    train.dest = buildDestination(obj["dest"]);
    train.via = obj["via"];
    train.delayMinutes = obj["delayMinutes"];
    train.aSeatInfo = obj["aSeatInfo"];
    train.typeChange = obj["typeChange"];
    train.numberOfCars = obj["numberOfCars"];
    train.stopTime = obj["stopTime"];
    train.iconId = obj["iconId"];
    return train;
}

/**
 * 取得したデータをマッピング
 * 列車行先情報クラス - 近畿アーバン
 * @param {*} obj
 * @return {Destination}
 */
function buildDestination(obj) {
    return new Destination(obj["code"], obj["line"], obj["text"]);
}

/**
 * 取得したデータをマッピング
 * 列車情報クラス - 近畿その他
 * @param {*} obj 
 * @return {TrainWestOther}
 */
function buildTrainWestOther(obj) {
    const train = new TrainWestOther();
    train.dest = obj["dest"];
    train.direction = obj["direction"];
    train.delayMinutes = obj["delayMinutes"];
    train.displayType = obj["displayType"];
    train.nickname = obj["nickname"];
    train.no = obj["no"];
    train.pos = obj["pos"];
    train.type = obj["type"];
    train.notice = obj["notice"];
    return train;
}

/**
 * 取得したデータをマッピング
 * 列車情報クラス - JRC
 * @param {*} obj 
 * @return {TrainCentral}
 */
function buildTrainCentral(obj) {
    const train = new TrainCentral();
    train.cars = obj["cars"]; // 両数？ 2026/3/22時点 値なし
    train.crowded = obj["crowded"]; // 不明 2026/3/22時点 値なし
    train.delay_lin = obj["delay_lin"]; // 遅れ時分
    train.delay_proof = obj["delay_proof"]; // 不明 2026/3/22時点 値なし
    train.direction = obj["direction"]; // 当該路線の方面 上下区分を判定する必要あり
    train.doors = obj["doors"]; // ドア数？ 2026/3/22時点 値なし
    train.laststation = obj["laststation"]; // 不明 2026/3/22時点 値なし
    train.linename = obj["linename"]; // 路線名
    train.locationCol = obj["locationCol"]; // 上下区分 1=上り, 2=下り
    train.locationRow = obj["locationRow"]; // 駅ナンバリング または 検索路線の画面上部駅からの駅数（位置駅No. - 起点駅No. + 1）
    train.nickname = obj["nickname"]; // 列車名
    train.nickname_no = obj["nickname_no"]; // 号数
    train.position = obj["position"]; // 走行位置 0=駅停車, 1=駅間
    train.tostation = obj["tostation"]; // 行先
    train.tostation2 = obj["tostation2"]; // 2階建て列車用行先？ 例：浜松・武豊
    train.trainnumber = obj["trainnumber"]; // 列車番号
    train.traintype = obj["traintype"]; // 列車種別
    return train;
}


// 列車情報装飾
/**
 * 種別色付け
 * @param {*} trainType 
 * @param {*} linename
 */
function AddDispTypeCol(trainType, linename) {//otherはlinename=""を定義しとけ
    var typeCol = null;
    switch (trainType) {
        case "普通": {
            typeCol = '<span class="local">' + trainType + '</span>';
            return typeCol;
        }
        case "普通２": {
            typeCol = '<span class="local">普通</span>';
            return typeCol;
        }
        case "う普通○": {
            typeCol = '<span class="local">普通</span> [' + trainType + ']';
            return typeCol;
        }
        case "う普通×": {
            typeCol = '<span class="local">普通</span> [' + trainType + ']';
            return typeCol;
        }
        case "区間快速": {
            switch (linename) {
                case "nara":
                    typeCol = '<span class="miyakojirapid">' + trainType + '</span>';
                    return typeCol;
                case "":
                    typeCol = '<span class="regionalrapid">' + trainType + '</span>';
                    return typeCol;
                default:
                    typeCol = '<span class="regionalrapid">' + trainType + '</span>';
                    return typeCol;
            }
        }
        case "う区快○": {
            switch (linename) {
                case "nara":
                    typeCol = '<span class="miyakojirapid">区間快速</span> [' + trainType + ']';
                    return typeCol;
                default: {
                    typeCol = '<span class="regionalrapid">区間快速</span> [' + trainType + ']';
                    return typeCol;
                }
            }
        }
        case "う区快×": {
            switch (linename) {
                case "nara":
                    typeCol = '<span class="miyakojirapid">区間快速</span> [' + trainType + ']';
                    return typeCol;
                default: {
                    typeCol = '<span class="regionalrapid">区間快速</span> [' + trainType + ']';
                    return typeCol;
                }
            }
        }
        case "快速": {
            switch (linename) {
                case "yamatoji":
                    typeCol = '<span class="yamatojirapid">' + trainType + '</span>';
                    return typeCol;
                case "wakayama2":
                    typeCol = '<span class="yamatojirapid">' + trainType + '</span>';
                    return typeCol;
                case "nara":
                    typeCol = '<span class="miyakojirapid">' + trainType + '</span>';
                    return typeCol;
                case "central":
                    typeCol = '<span class="rapidC">' + trainType + '</span>';
                    return typeCol;
                case "":
                    typeCol = '<span class="rapid">' + trainType + '</span>';
                    return typeCol;
                default:
                    typeCol = '<span class="rapid">' + trainType + '</span>';
                    return typeCol;
            }
        }
        case "う快速○": {
            switch (linename) {
                case "yamatoji":
                    typeCol = '<span class="yamatojirapid">快速</span> [' + trainType + ']';
                    return typeCol;
                case "wakayama2":
                    typeCol = '<span class="yamatojirapid">快速</span> [' + trainType + ']';
                    return typeCol;
                case "nara":
                    typeCol = '<span class="miyakojirapid">快速</span> [' + trainType + ']';
                    return typeCol;
                default: {
                    typeCol = '<span class="rapid">快速</span> [' + trainType + ']';
                    return typeCol;
                }
            }
        }
        case "う快速×": {
            switch (linename) {
                case "yamatoji":
                    typeCol = '<span class="yamatojirapid">快速</span> [' + trainType + ']';
                    return typeCol;
                case "wakayama2":
                    typeCol = '<span class="yamatojirapid">快速</span> [' + trainType + ']';
                    return typeCol;
                case "nara":
                    typeCol = '<span class="miyakojirapid">快速</span> [' + trainType + ']';
                    return typeCol;
                default: {
                    typeCol = '<span class="rapid">快速</span> [' + trainType + ']';
                    return typeCol;
                }
            }
        }
        case "臨A快○": {
            typeCol = '<span class="rapid">快速</span> [' + trainType + ']';
            return typeCol;
        }
        case "臨A快×": {
            typeCol = '<span class="rapid">快速</span> [' + trainType + ']';
            return typeCol;
        }
        case "新快速": {
            switch (linename) {
                case "central":
                    typeCol = '<span class="newrapid">' + trainType + '</span>';
                    return typeCol;
                default:
                    typeCol = '<span class="specialrapid">' + trainType + '</span>';
                    return typeCol;
            }
        }
        case "特別快速": {
            typeCol = '<span class="specialrapidC">' + trainType + '</span>';
            return typeCol;
        }
        case "A新快○": {
            typeCol = '<span class="specialrapid">新快速</span> [' + trainType + ']';
            return typeCol;
        }
        case "A新快×": {
            typeCol = '<span class="specialrapid">新快速</span> [' + trainType + ']';
            return typeCol;
        }
        case "う新快○": {
            typeCol = '<span class="specialrapid">新快速</span> [' + trainType + ']';
            return typeCol;
        }
        case "う新快×": {
            typeCol = '<span class="specialrapid">新快速</span> [' + trainType + ']';
            return typeCol;
        }
        case "A→一般": {
            typeCol = '<span class="specialrapid">新快速</span> [' + trainType + ']';
            return typeCol;
        }
        case "A→新快": {
            typeCol = '<span class="specialrapid">新快速</span> [' + trainType + ']';
            return typeCol;
        }
        case "一般→A": {
            typeCol = '<span class="specialrapid">新快速</span> [' + trainType + ']';
            return typeCol;
        }
        case "臨A新○": {
            typeCol = '<span class="specialrapid">新快速</span> [' + trainType + ']';
            return typeCol;
        }
        case "臨A新×": {
            typeCol = '<span class="specialrapid">新快速</span> [' + trainType + ']';
            return typeCol;
        }
        case "丹波路快": {
            typeCol = '<span class="tambajirapid">丹波路快速</span>';
            return typeCol;
        }
        case "丹波路快速": {
            typeCol = '<span class="tambajirapid">' + trainType + '</span>';
            return typeCol;
        }
        case "う丹快○": {
            typeCol = '<span class="tambajirapid">丹波路快速</span> [' + trainType + ']';
            return typeCol;
        }
        case "う丹快×": {
            typeCol = '<span class="tambajirapid">丹波路快速</span> [' + trainType + ']';
            return typeCol;
        }
        case "紀州路快": {
            typeCol = '<span class="kishujirapid">紀州路快速</span>';
            return typeCol;
        }
        case "紀州路快速": {
            typeCol = '<span class="kishujirapid">' + trainType + '</span>';
            return typeCol;
        }
        case "シャトル": {
            typeCol = '<span class="kixrapid">' + trainType + '</span>';
            return typeCol;
        }
        case "関空快速": {
            typeCol = '<span class="kixrapid">' + trainType + '</span>';
            return typeCol;
        }
        case "関空紀州": {
            typeCol = '<span class="kixrapid">関空</span>' + '/' + '<span class="kishujirapid">紀州路</span>' + '<span class="rapid">快速</span>';
            return typeCol;
        }
        case "大和路快": {
            typeCol = '<span class="yamatojirapid">大和路快速</span>';
            return typeCol;
        }
        case "大和路快速": {
            typeCol = '<span class="yamatojirapid">' + trainType + '</span>';
            return typeCol;
        }
        case "う大快○": {
            typeCol = '<span class="yamatojirapid">大和路快速</span> [' + trainType + ']';
            return typeCol;
        }
        case "う大快×": {
            typeCol = '<span class="yamatojirapid">大和路快速</span> [' + trainType + ']';
            return typeCol;
        }
        case "みやこ快": {
            typeCol = '<span class="miyakojirapid">みやこ路快速</span>';
            return typeCol;
        }
        case "みやこ路快速": {
            typeCol = '<span class="miyakojirapid">' + trainType + '</span>';
            return typeCol;
        }
        case "うみ快○": {
            typeCol = '<span class="miyakojirapid">みやこ路快速</span> [' + trainType + ']';
            return typeCol;
        }
        case "うみ快×": {
            typeCol = '<span class="miyakojirapid">みやこ路快速</span> [' + trainType + ']';
            return typeCol;
        }
        case "直通快速": {
            typeCol = '<span class="directrapid">' + trainType + '</span>';
            return typeCol;
        }
        case "う直快○": {
            typeCol = '<span class="directrapid">直通快速</span> [' + trainType + ']';
            return typeCol;
        }
        case "う直快×": {
            typeCol = '<span class="directrapid">直通快速</span> [' + trainType + ']';
            return typeCol;
        }
        case "快速みえ": {
            typeCol = '<span class="newrapid">快速</span>';
            return typeCol;
        }
        case "特急": {
            typeCol = '<span class="limitedexp">' + trainType + '</span>';
            return typeCol;
        }
        case "急行": {
            typeCol = '<span class="express">' + trainType + '</span>';
            return typeCol;
        }
        case "ホームライナー": {
            typeCol = '<span class="express">' + trainType + '</span>';
            return typeCol;
        }
        case "ＨＬ": {
            typeCol = '<span class="express">' + trainType + '</span>';
            return typeCol;
        }
        case "関空特急": {
            typeCol = '<span class="limitedexp">' + trainType + '</span>';
            return typeCol;
        }
        case "通勤特急": {
            typeCol = '<span class="limitedexp">' + trainType + '</span>';
            return typeCol;
        }
        case "臨時特急": {
            typeCol = '<span class="limitedexp">' + trainType + '</span>';
            return typeCol;
        }
        case "寝台特急": {
            typeCol = '<span class="limitedexp">' + trainType + '</span>';
            return typeCol;
        }
        case "寝台": {
            typeCol = '<span class="limitedexp">' + trainType + '</span>';
            return typeCol;
        }
        case "ＳＬ": {
            typeCol = '<span class="extra">' + trainType + '</span>';
            return typeCol;
        }
        case "回送": {
            typeCol = '<span class="notinservice">' + trainType + '</span>';
            return typeCol;
        }
        case "臨時": {
            typeCol = '<span class="extra">' + trainType + '</span>';
            return typeCol;
        }
        case "観光列車": {
            typeCol = '<span class="extra">' + trainType + '</span>';
            return typeCol;
        }
        default: {
            return trainType;
        }

    }
}

/**
 * 行先色付け
 * @param {*} trainDest 
 */
function AddDestCol(trainDest) {
    switch (trainDest) {
        case null: {
            return '';
        }
        default: {
            return '<span class="destination">' + trainDest + '</span>行き';
        }
    }
}

/**
 * 東海エリア：第2行先設定
 * ★暫定対応、本格的にやるなら「https://traininfo.jr-central.co.jp/zairaisen/data/kobetsujikoku.json」を叩く
 * @param {*} trainDest 
 * @param {*} trainNumber 
 */
function centralAddDest2(trainDest, trainNumber) {
    var setTrainDest = "";
    switch (trainDest) {
        case '': {
            return '';
        }
        default: {
            switch(trainNumber){
                case '5031M':{
                    setTrainDest = '出雲市'
                    break;
                }
                case '8041M':{
                    setTrainDest = '出雲市'
                    break;
                }
                case '205M':{
                    setTrainDest = '松本'
                    break;
                }
                case '106F':{
                    setTrainDest = '武豊'
                    break;
                }
                case '3106F':{
                    setTrainDest = '武豊'
                    break;
                }
            }
            return '<span class="destination">' + setTrainDest + '</span>行き';
        }
    }
}

/**
 * 路線記号付与
 * @param {*} LineMark 
 */
function LineMarkGet(LineMark) {//無印のみ
    switch (LineMark) {
        case "hokuriku": {
            const GetMark = '<span class="hokurikuA">[A]</span>';
            return GetMark;
        }
        case "kosei": {
            const GetMark = '<span class="kosei">[B]</span>';
            return GetMark;
        }
        case "kusatsu": {
            const GetMark = '<span class="kusatsu">[C]</span>';
            return GetMark;
        }
        case "nara": {
            const GetMark = '<span class="nara">[D]</span>';
            return GetMark;
        }
        case "osakahigashi": {
            const GetMark = '<span class="osakahigashi">[F]</span>';
            return GetMark;
        }
        case "takarazuka": {
            const GetMark = '<span class="takarazuka">[G]</span>';
            return GetMark;
        }
        case "tozai": {
            const GetMark = '<span class="tozai">[H]</span>';
            return GetMark;
        }
        case "kakogawa": {
            const GetMark = '<span class="kakogawa">[I]</span>';
            return GetMark;
        }
        case "kishin": {
            const GetMark = '<span class="kishin">[K]</span>';
            return GetMark;
        }
        case "osakaloop": {
            const GetMark = '<span class="osakaloop">[O]</span>';
            return GetMark;
        }
        case "yumesaki": {
            const GetMark = '<span class="yumesaki">[P]</span>';
            return GetMark;
        }
        case "yamatoji": {
            const GetMark = '<span class="yamatoji">[Q]</span>';
            return GetMark;
        }
        case "hanwa": {
            const GetMark = '<span class="hanwahagoromo">[R]</span>';
            return GetMark;
        }
        case "kansaiairport": {//
            const GetMark = '<span class="kansaiairport">[S]</span>';
            return GetMark;
        }
        case "wakayama2": {
            const GetMark = '<span class="wakayama">[T]</span>';
            return GetMark;
        }
        case "kansai": {
            const GetMark = '<span class="kansai">[V]</span>';
            return GetMark;
        }
        case "kinokuni": {
            const GetMark = '<span class="kinokuni">[W]</span>';
            return GetMark;
        }
        case "other": {
            return "";
        }
        case "hagoromo": {
            return "";
        }
        default: {
            return LineMark;
        }

    }
}

/**
 * 列車名セット
 * @param {*} nickname 
 */
function nicknameSet(nickname, nickname_no, line) {//other,jrc
    switch (line) {
        case "central": {
            if (nickname != null && nickname_no == '-1') return nickname;
            else if (nickname == null || nickname_no == '-1') return "";
            else return (nickname + nickname_no + "号");
        }
    }
    if (nickname == null) return "";
    else return nickname;
}

/**
 * 上下区分
 * @param {*} direction 
 */
function directionSet(direction, line) {
    switch (line) {
        case 'central':
            if (direction == 1) return "上り";
            else return "下り";
        default:
            if (direction == 0) return "上り";
            else return "下り";
    }
}

/**
 * 遅延時分セット
 * @param {*} delayMinutes 
 */
function delayMinutesSet(delayMinutes) {
    if (delayMinutes == 0) return '<span class="noDelay"></span>';
    else if (delayMinutes >= 60) return '<span class="overDelay">60分以上遅れ</span>';
    else return '<span class="delayMinutes">' + delayMinutes + '分遅れ</span>';
}

/**
 * 駅情報取得
 * @param {string} pos 
 */
function StaGet_WestUrban(pos) {
    const position = pos.split('_');
    const pos1 = posMatch_WestUrban(position[0]);
    const pos2 = posMatch_WestUrban(position[1]);
    if (pos2.length == 0) return pos1[0].stationName;
    else {
        const result = (pos1[0].stationName + "～" + pos2[0].stationName);
        return result;
    }
}

/**
 * 
 * @param {*} pos 
 */
function posMatch_WestUrban(pos_u) {
    return stations_urban.filter(Ustation => {
        if (Ustation.stationCode === pos_u) return Ustation;

    });
}

/**
 * 駅情報取得
 * @param {string} pos 
 */
function StaGet_WestOther(pos) {
    const position = pos.split('_');
    const pos1 = posMatch_WestOther(position[0]);
    const pos2 = posMatch_WestOther(position[1]);
    if (pos2.length == 0) return pos1[0].StationName;
    else {
        const result = (pos1[0].StationName + "～" + pos2[0].StationName);
        return result;
    }
}

/**
 * 
 * @param {*} pos 
 */
function posMatch_WestOther(pos_o) {
    return stations_other.filter(Ostation => {
        if (Ostation.StationCode === pos_o) return Ostation;

    });
}

/**
* 駅情報取得 - JRC
* @param {*} linename 
* @param {num} locationRow 
* @param {*} position 
*/
function StaGet_Central(linename, locationRow, position) {
    if (position == 0) {
        const location = posMatch_Central(linename, locationRow);
        return location[0].ekiMei;
    }
    else if (position == 1) {
        const location = posMatch_Central(linename, locationRow);
        return location[0].ekiMei + " 付近 ";
    }
}

/**
 * 
 * @param {*} linename
 * @param {num} locationRow
 */
function posMatch_Central(linename, locationRow) {
    // var regex = new RegExp('[\(]');
    // var line = '';
    var row = 0;
    switch (linename) {
        default: {
            row = locationRow * 10;
            break;
        }
        case '伊勢鉄道': {
            row = locationRow;
            break;
        }
        case '美濃赤坂線': {
            row = locationRow * 10 + 420;
            break;
        }
    }
    // if(regex.test(linename)){
    //     line = linename.split("(")[0];
    // }else{
    //     line = linename;
    // }
    return stations_Central.filter(Cstation => {
        if (Cstation.ryokakuSenkuMei === linename && Cstation.kudariJun === row.toString()) {
            return Cstation.ekiMei;
        }
    });
}

// 列車情報出力準備
/**
 * 
 * @param {Train[]} trains 
 */
function viewTrainsWest(trains, flowType) {
    const elem = document.getElementById("elem");
    let trainElems;
    while (child = elem.firstChild) elem.removeChild(child);
    switch (flowType) {
        case 'KinkiUrban': trainElems = trains.map(trainElementWestUrban);
            break;
        case 'JrwOther': trainElems = trains.map(trainElementWestOther);
            break;
    }
    trainElems.forEach(element => {
        elem.appendChild(element);
    });
}

/**
 * 出力する列車情報を成形 - JRC
 * @param {Train[]} trains 
 */
function viewTrainsCentral(trains, flowType) {
    // const elem = document.getElementById("elem");
    while (child = elem.firstChild) elem.removeChild(child);
    const trainElems = trains.map(trainElementCentral);
    trainElems.forEach(element => {
        elem.appendChild(element);
    });
}

/**
 * 出力する列車情報を成形 - 近畿アーバン
 * @param {Train} train
 * @return {HTMLElement}
 */
function trainElementWestUrban(train) {
    const line = "";
    var ureSeatInfo = "";
    var typeChange = "";
    var otherInfo = "";

    const DispTypeAddCol = AddDispTypeCol(train.displayType, train.dest.line);
    const DestAddCol = AddDestCol(train.dest.text);
    const LineMark = LineMarkGet(train.dest.line);
    const direction = directionSet(train.direction, line);
    const delayMinutes = delayMinutesSet(train.delayMinutes);
    const position = StaGet_WestUrban(train.pos);
    // const position = stationGet(train.pos);
    const aSeatInfo = train.aSeatInfo === "" ? "" : " " + train.aSeatInfo + " ";
    const tmp_typeChange = train.typeChange;
    if (tmp_typeChange.includes('\n（有料座席）')) {
        ureSeatInfo = " " + tmp_typeChange + " ";
        typeChange = "";
    } else if (tmp_typeChange.includes('\n')) {
        ureSeatInfo = " " + tmp_typeChange.split('\n')[0] + " ";
        typeChange = " " + tmp_typeChange.split('\n')[1] + " ";
    } else if (tmp_typeChange.includes('運転日により停車駅が異なります')) {
        otherInfo = " " + tmp_typeChange + " ";
    } else if ((tmp_typeChange != '')) {
        ureSeatInfo = tmp_typeChange.includes('うれしート') ? " " + tmp_typeChange + " " : "";
        typeChange = tmp_typeChange.includes('うれしート') ? "" : " " + tmp_typeChange + " ";
    } else {
        ureSeatInfo = "";
        typeChange = "";
    }
    // const text = `${train.no} ${train.displayType}${train.nickname} ${train.typeChange} ${train.via} ${train.dest.text}行き ${train.numberOfCars}両 ${delayMinutes} 走行位置：${position}${direction}`;
    const text = train.no + " " + LineMark + DispTypeAddCol + " " + train.nickname + " " + typeChange + " " + train.via + " " + DestAddCol + " " + train.numberOfCars + "両 " + delayMinutes + " 走行位置：" + position + direction + aSeatInfo + otherInfo + ureSeatInfo;
    // const text = train.no + " " + LineMark + DispTypeAddCol + train.nickname + " " + train.typeChange + " " + train.via + " " + DestAddCol + "行き " + train.numberOfCars + "両 " + delayMinutes + " 走行位置：" + direction;
    const elem = document.createElement('div');
    // elem.className = 'kakomi-box3';
    elem.className = `kakomi-box3 kakomi-${train.dest.line}`;
    // elem.innerText = text;
    elem.innerHTML = text;
    return elem;
}

/**
 * 出力する列車情報を成形 - 近畿その他
 * @param {Train} train 
 * @return {HTMLElement}
 */
function trainElementWestOther(train) {
    const line = "";
    var ureSeatInfo = "";
    var typeChange = "";

    const DispTypeAddCol = AddDispTypeCol(train.displayType, line);
    const DestAddCol = AddDestCol(train.dest);
    const nickname = nicknameSet(train.nickname, "", "");
    const direction = directionSet(train.direction, line);
    const delayMinutes = delayMinutesSet(train.delayMinutes);
    const position = StaGet_WestOther(train.pos);
    // const position = stationGet(train.pos);
    // const notice = train.notice === null ? "" : " " + train.notice + " ";
    const tmp_notice = train.notice;
    if (tmp_notice != null && tmp_notice.includes('\n')) {
        ureSeatInfo = " " + tmp_notice.split('\n')[0] + " ";
        typeChange = " " + tmp_notice.split('\n')[1] + " ";
    } else if (tmp_notice != null && !(tmp_notice.includes('\n'))) {
        typeChange = " " + tmp_notice + " ";
    } else if ((tmp_notice != null && tmp_notice != '')) {
        ureSeatInfo = tmp_notice.includes('うれしート') ? " " + tmp_notice + " " : "";
        typeChange = tmp_notice.includes('うれしート') ? "" : " " + tmp_notice + " ";
    } else {
        ureSeatInfo = "";
        typeChange = "";
    }
    // const text = `${train.no} ${train.displayType}${nickname} ${train.dest}行き ${delayMinutes} 走行位置：${position}${direction}`;
    const text = train.no + " " + DispTypeAddCol + typeChange + nickname + " " + DestAddCol + " " + delayMinutes + " 走行位置：" + position + direction + ureSeatInfo;
    // const text = train.no + " " + DispTypeAddCol + nickname + " " + DestAddCol + "行き " + delayMinutes + " 走行位置：" + direction;
    const elem = document.createElement('div');
    elem.className = 'kakomi-box3';
    // elem.innerText = text;
    elem.innerHTML = text;
    return elem;
}

/**
 * 
 * @param {Train} train 
 * @return {HTMLElement}
 */
function trainElementCentral(train) {
    const line = 'central';
    const DispTypeAddCol = AddDispTypeCol(train.traintype[0].name, line);
    const DestAddCol = AddDestCol(train.tostation[0].name);
    const Dest2AddCol = centralAddDest2(train.tostation2[0].name, train.trainnumber) === "" ? "" : '・' + centralAddDest2(train.tostation2[0].name, train.trainnumber);
    const nickname = nicknameSet(train.nickname[0].name, train.nickname_no, line);
    const direction = directionSet(train.locationCol, line);
    const delayMinutes = delayMinutesSet(train.delay_lin);
    const position = StaGet_Central(train.linename[0].name, train.locationRow, train.position);
    // const text = `${train.no} ${train.displayType}${nickname} ${train.dest}行き ${delayMinutes} 走行位置：${position}${direction}`;
    const text = train.trainnumber + " " + DispTypeAddCol + " " + nickname + " " + DestAddCol + Dest2AddCol + " " + delayMinutes + " 走行位置：" + position + direction;
    const elem = document.createElement('div');
    elem.className = 'kakomi-box3';
    // elem.innerText = text;
    elem.innerHTML = text;
    return elem;
}

// ボタンクリック時にLogicAppsへリクエストを送信し、結果を取得（非同期）
// function stationGet(position) {
//     // リクエスト情報定義
//     const requestUrl = "https://prod-19.japaneast.logic.azure.com:443/workflows/c03397c866cd415cadc47c5499dc2be3/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LMRDZoK-DBcp7fYgwMQOlKCsEOqnUXCveX32lm0V89w"
//     const requestMethod = "POST"
//     const requestHeaders = {
//         "Content-Type": "application/json"
//     }
//     const requestBody = JSON.stringify({
//         "pos": position
//     })

//     // リクエストを送信して結果を解析
//     try {
//         const response = fetch(requestUrl, {
//             method: requestMethod,
//             headers: requestHeaders,
//             body: requestBody
//         })

//         // レスポンスステータスをチェック
//         if (!response.ok) {
//             throw new Error(`レスポンスステータス: ${response.status}`);
//         }

//         // レスポンスヘッダーをチェック
//         const contentType = response.headers.get("content-type");
//         if (!contentType || !contentType.includes("application/json")) {
//             throw new TypeError("残念、受信したのは JSON ではなかった！");
//         }

//         // レスポンスボディを取得
//         const body = aresponse.json();
//         return body.test;
//         const trains = body.trains.map(buildTrain);
//         let trains;

//         switch (flowType) {
//             case 'KinkiUrban': trains = body.map(buildTrain);
//                 break;
//             case 'JrwOther': trains = body.map(buildTrainWestOther);
//                 break;
//         }
//         viewTrainsWest(trains, flowType);

//         エラー発生時にキャッチしてメッセージを返す
//     } catch (error) {
//         console.error(error.message);
//     }
// }

// ボタンクリック時に発火
async function lineClickEvent(linename, flowType, line) {
    elem.innerHTML = "・・・読み込み中・・・";
    selectLine.innerHTML = "選択中の路線：[" + line + "]";
    // リクエスト情報定義
    const requestUrl = "https://prod-38.japaneast.logic.azure.com:443/workflows/a98ba8e0a5b74390a09eecfc147607fb/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=IMP3VtK1G505nZaw6u7osA8vInr_0M3DSb5kZzsK76o"
    const requestMethod = "POST"
    const requestHeaders = {
        "Content-Type": "application/json"
    }
    const requestBody = JSON.stringify({
        "getLineName": linename,
        "flowType": flowType
    })

    // リクエストを送信して結果を解析
    try {
        const response = await fetch(requestUrl, {
            method: requestMethod,
            headers: requestHeaders,
            body: requestBody
        })

        // レスポンスステータスをチェック
        if (!response.ok) {
            throw new Error(`レスポンスステータス: ${response.status}`);
        }

        // レスポンスヘッダーをチェック
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new TypeError("残念、受信したのは JSON ではなかった！");
        }

        // レスポンスボディを取得
        const body = await response.json();
        // const trains = body.trains.map(buildTrain);
        let trains;

        switch (flowType) {
            case 'KinkiUrban': trains = body.map(buildTrainWestUrban);
                viewTrainsWest(trains, flowType);
                break;
            case 'JrwOther': trains = body.map(buildTrainWestOther);
                viewTrainsWest(trains, flowType);
                break;
            case 'Jrc': trains = body.map(buildTrainCentral);
                var regex = new RegExp('[ ]');
                var displine = '';
                if (regex.test(line)) {
                    displine = line.split(' ')[1];
                } else {
                    displine = line;
                }
                const trainsFilter = trains.filter(train =>
                    train.linename[0].name === displine
                );
                viewTrainsCentral(trainsFilter, flowType);
                break;
        }

        // エラー発生時にキャッチしてメッセージを返す
    } catch (error) {
        console.error(error.message);
    }
}

/* 画面ロード時に路線ボタン出力 */
window.addEventListener('load', () => {
    OperationInfoPages.map(k => InfoButton(k.area, k.code, k.line, k.sectionId));
    KinkiAreaLine.map(k => lineButton(k.code, k.line, k.sectionId, k.flowType));
    OkayamaAreaLine.map(k => lineButton(k.code, k.line, k.sectionId, k.flowType));
    HiroSekiAreaLine.map(k => lineButton(k.code, k.line, k.sectionId, k.flowType));
    SaninAreaLine.map(k => lineButton(k.code, k.line, k.sectionId, k.flowType));
    CentralAreaLine.map(k => lineButton(k.code, k.line, k.sectionId, k.flowType));
})

/*
*
* @param {String} code
* @param {String} line
* @param {String} sectionId
* @param {String} flowType
*/
function lineButton(code, line, sectionId, flowType) {
    const outputArea = document.getElementById(sectionId);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `button ${code}`;
    button.name = 'word';
    button.onclick = function () {
        lineClickEvent(code, flowType, line);
    }
    button.innerText = line;
    outputArea.appendChild(button);
}

/*
*
* @param {String} code
* @param {String} line
* @param {String} sectionId
*/
function InfoButton(area, code, line, sectionId) {
    const outputArea = document.getElementById(sectionId);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `button ${code}`;
    button.name = 'word';
    button.onclick = function () {
        switch (area) {
            case 'JRW':
                window.open('https://trafficinfo.westjr.co.jp/' + code + '.html', '_blank');
                break;
            case 'JRC':
                window.open('https://traininfo.jr-central.co.jp/' + code + '/index.html?lang=ja', '_blank');
                break;
        }
    }
    button.innerText = line;
    outputArea.appendChild(button);
}
