const AreaArray = [
    {
        'code': 'kinki',
        'area': '近畿エリア',
        'url': 'public/Kinki.html'
    }, {
        'code': 'kinki2',
        'area': '北陸・近畿2エリア',
        'url': 'public/Kinki2.html'
    }, {
        'code': 'okayama',
        'area': '岡山・福山エリア',
        'url': 'public/Okayama.html'
    }, {
        'code': 'hiroseki',
        'area': '広島・下関エリア',
        'url': 'public/HiroSeki.html'
    }, {
        'code': 'sanin',
        'area': '山陰エリア',
        'url': 'public/Sanin.html'
    }
    // , {
    //     'code': 'central',
    //     'area': '東海エリア',
    //     'url': 'public/Central.html'
    // }
];

const sideBtnArray = [
    // {
    //     'areaName': 'UnyoSearchArea',
    //     'url': 'public/UnyoSearch.html',
    //     'value': '運用検索ページ'
    // },
    {
        'areaName': 'UnyoTableArea',
        'url': 'public/UnyoTable.html',
        'value': '運用表'
    },
    {
        'areaName': 'WinfoBtnArea',
        'url': 'https://trafficinfo.westjr.co.jp/kinki.html',
        'value': 'JRW運行情報'
    },
    //  {
    //     'areaName': 'CinfoBtnArea',
    //     'url': 'https://traininfo.jr-central.co.jp/zairaisen/index.html?lang=ja',
    //     'value': 'JRC運行情報'
    // },
    {
        'areaName': 'CentralPage',
        'url': 'https://script.google.com/macros/s/AKfycbzLWMeBoGAf5pmtxm20RP18zFxCzn_khJ9-W2wK-1CkQWxHoCw/exec?page=Tokai',
        'value': '東海エリア(旧App)'
    }
];

const UnyoList = [
    {
        'code': 'miyahara',
        'name': '宮原支所運用'
    },
    {
        'code': 'akashi',
        'name': '明石支所運用'
    }
]

const KinkiAreaLine = [
    {
        'code': 'hokurikubiwako',
        'line': 'A 琵琶湖線'
    },
    {
        'code': 'kyoto',
        'line': 'A 京都線'
    }, {
        'code': 'kobesanyo',
        'line': 'A 神戸線'
    }, {
        'code': 'ako',
        'line': 'A 赤穂線'
    }, {
        'code': 'kosei',
        'line': 'B 湖西線'
    }, {
        'code': 'osakahigashi',
        'line': 'F おおさか東線'
    }, {
        'code': 'takarazuka',
        'line': 'G 宝塚線'
    }, {
        'code': 'tozai',
        'line': 'H JR東西線'
    }, {
        'code': 'gakkentoshi',
        'line': 'H 学研都市線'
    }, {
        'code': 'osakaloop',
        'line': 'O 大阪環状線'
    }, {
        'code': 'yumesaki',
        'line': 'P JRゆめ咲線'
    }, {
        'code': 'yamatoji',
        'line': 'Q 大和路線'
    }, {
        'code': 'hanwahagoromo',
        'line': 'R 阪和線'
    }, {
        'code': 'kansaiairport',
        'line': 'S 関西空港線'
    }
];

const Kinki2AreaLine = [
    {
        'code': 'hokuriku',
        'line': '北陸本線'
    },
    {
        'code': 'kusatsu',
        'line': 'C 草津線'
    }, {
        'code': 'nara',
        'line': 'D 奈良線'
    }, {
        'code': 'sagano',
        'line': 'E 嵯峨野線'
    }, {
        'code': 'sanin1',
        'line': 'E 山陰本線'
    }, {
        'code': 'sanin2',
        'line': 'E/A 山陰本線'
    }, {
        'code': 'fukuchiyama',
        'line': 'G 福知山線'
    }, {
        'code': 'bantan',
        'line': 'J 播但線'
    }, {
        'code': 'maizuru',
        'line': 'L 舞鶴線'
    }, {
        'code': 'wakayama1',
        'line': 'T 和歌山線1 (和-五)'
    }, {
        'code': 'wakayama2',
        'line': 'T 和歌山線2 (五-王)'
    }, {
        'code': 'manyomahoroba',
        'line': 'U 万葉まほろば線'
    }, {
        'code': 'kansai',
        'line': 'V 関西本線'
    }, {
        'code': 'kinokuni',
        'line': 'W きのくに線'
    }
];

const OkayamaAreaLine = [
    {
        'code': 'sanyo1',
        'line': 'S/W/X 山陽本線'
    }, {
        'code': 'setoohashi',
        'line': 'M 瀬戸大橋線'
    }, {
        'code': 'unominato',
        'line': 'L 宇野みなと線'
    }, {
        'code': 'hakubi1',
        'line': 'V 伯備線'
    }
];

const HiroSekiAreaLine = [
    {
        'code': 'sanyo2',
        'line': 'G/R 山陽本線'
    }, {
        'code': 'sanyo3',
        'line': '山陽本線'
    }, {
        'code': 'kabe',
        'line': 'B 可部線'
    }, {
        'code': 'kure',
        'line': 'Y 呉線'
    }
];

const SaninAreaLine = [
    {
        'code': 'sanin3',
        'line': 'A 山陰本線'
    }, {
        'code': 'imbi1',
        'line': 'B 因美線'
    }, {
        'code': 'sanin4',
        'line': 'D 山陰本線'
    }, {
        'code': 'hakubi2',
        'line': 'V 伯備線'
    }
];

const CentralAreaLine = [
    {
        'code': 'zaisenichijoho_10001',
        'line': 'CA 東海道本線1'
    }, {
        'code': 'zaisenichijoho_10011',
        'line': 'CA 東海道本線2'
    }, {
        'code': 'zaisenichijoho_10013',
        'line': 'CB 御殿場線'
    }, {
        'code': 'zaisenichijoho_10012',
        'line': 'CC 身延線'
    }, {
        'code': 'zaisenichijoho_10010',
        'line': 'CD 飯田線'
    }, {
        'code': 'zaisenichijoho_10002',
        'line': 'CE 武豊線'
    }, {
        'code': 'zaisenichijoho_10003',
        'line': 'CF 中央本線'
    }, {
        'code': 'zaisenichijoho_10004',
        'line': 'CG 高山本線'
    }, {
        'code': 'zaisenichijoho_10005',
        'line': 'CI 太田線'
    }, {
        'code': 'zaisenichijoho_10006',
        'line': 'CJ 関西本線'
    }, {
        'code': 'zaisenichijoho_10007',
        'line': '紀勢本線'
    }, {
        'code': 'zaisenichijoho_10009',
        'line': '名松線'
    }, {
        'code': 'zaisenichijoho_10008',
        'line': '参宮線'
    }
];