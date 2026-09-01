// re-content.js
// content.js をベースに、React + Tailwind CSS でモダン化した実装。
// 通信先エンドポイント・データ整形ロジック・配色ルールは元の機能を踏襲している。
// 駅マスタ（stations_urban / stations_other / stations_Central）は既存の stationList.js をそのまま利用する。

const {
  useState,
  useEffect,
  useCallback,
  useRef
} = React;

/* ============================================================
 * 定数定義（content.js と同一）
 * ========================================================== */
const OperationInfoPages = [{
  area: 'JRW',
  code: 'hokuriku',
  line: '北陸エリア',
  sectionId: 'InfoBtn'
}, {
  area: 'JRW',
  code: 'kinki',
  line: '近畿エリア',
  sectionId: 'InfoBtn'
}, {
  area: 'JRW',
  code: 'chugoku',
  line: '中国エリア',
  sectionId: 'InfoBtn'
}, {
  area: 'JRW',
  code: 'ex_index',
  line: '特急列車',
  sectionId: 'InfoBtn'
}, {
  area: 'JRC',
  code: 'zairaisen',
  line: 'JRCエリア',
  sectionId: 'InfoBtn'
}];
const KinkiAreaLine = [{
  code: 'hokuriku',
  line: '北陸本線',
  sectionId: 'lineBtnKinki',
  flowType: 'JrwOther'
}, {
  code: 'hokurikubiwako',
  line: 'A 琵琶湖線',
  sectionId: 'lineBtnKinki',
  flowType: 'KinkiUrban'
}, {
  code: 'kyoto',
  line: 'A 京都線',
  sectionId: 'lineBtnKinki',
  flowType: 'KinkiUrban'
}, {
  code: 'kobesanyo',
  line: 'A 神戸線',
  sectionId: 'lineBtnKinki',
  flowType: 'KinkiUrban'
}, {
  code: 'ako',
  line: 'A 赤穂線',
  sectionId: 'lineBtnKinki',
  flowType: 'KinkiUrban'
}, {
  code: 'kosei',
  line: 'B 湖西線',
  sectionId: 'lineBtnKinki',
  flowType: 'KinkiUrban'
}, {
  code: 'kusatsu',
  line: 'C 草津線',
  sectionId: 'lineBtnKinki',
  flowType: 'JrwOther'
}, {
  code: 'nara',
  line: 'D 奈良線',
  sectionId: 'lineBtnKinki',
  flowType: 'JrwOther'
}, {
  code: 'sagano',
  line: 'E 嵯峨野線',
  sectionId: 'lineBtnKinki',
  flowType: 'JrwOther'
}, {
  code: 'sanin1',
  line: 'E 山陰本線',
  sectionId: 'lineBtnKinki',
  flowType: 'JrwOther'
}, {
  code: 'sanin2',
  line: 'E/A 山陰本線',
  sectionId: 'lineBtnKinki',
  flowType: 'JrwOther'
}, {
  code: 'osakahigashi',
  line: 'F おおさか東線',
  sectionId: 'lineBtnKinki',
  flowType: 'KinkiUrban'
}, {
  code: 'takarazuka',
  line: 'G 宝塚線',
  sectionId: 'lineBtnKinki',
  flowType: 'KinkiUrban'
}, {
  code: 'fukuchiyama',
  line: 'G 福知山線',
  sectionId: 'lineBtnKinki',
  flowType: 'JrwOther'
}, {
  code: 'tozai',
  line: 'H JR東西線',
  sectionId: 'lineBtnKinki',
  flowType: 'KinkiUrban'
}, {
  code: 'gakkentoshi',
  line: 'H 学研都市線',
  sectionId: 'lineBtnKinki',
  flowType: 'KinkiUrban'
}, {
  code: 'bantan',
  line: 'J 播但線',
  sectionId: 'lineBtnKinki',
  flowType: 'JrwOther'
}, {
  code: 'maizuru',
  line: 'L 舞鶴線',
  sectionId: 'lineBtnKinki',
  flowType: 'JrwOther'
}, {
  code: 'osakaloop',
  line: 'O 大阪環状線',
  sectionId: 'lineBtnKinki',
  flowType: 'KinkiUrban'
}, {
  code: 'yumesaki',
  line: 'P JRゆめ咲線',
  sectionId: 'lineBtnKinki',
  flowType: 'KinkiUrban'
}, {
  code: 'yamatoji',
  line: 'Q 大和路線',
  sectionId: 'lineBtnKinki',
  flowType: 'KinkiUrban'
}, {
  code: 'hanwahagoromo',
  line: 'R 阪和線',
  sectionId: 'lineBtnKinki',
  flowType: 'KinkiUrban'
}, {
  code: 'kansaiairport',
  line: 'S 関西空港線',
  sectionId: 'lineBtnKinki',
  flowType: 'KinkiUrban'
}, {
  code: 'wakayama1',
  line: 'T 和歌山線 和歌山-五条',
  sectionId: 'lineBtnKinki',
  flowType: 'JrwOther'
}, {
  code: 'wakayama2',
  line: 'T 和歌山線 五条-王寺',
  sectionId: 'lineBtnKinki',
  flowType: 'JrwOther'
}, {
  code: 'manyomahoroba',
  line: 'U 万葉まほろば線',
  sectionId: 'lineBtnKinki',
  flowType: 'JrwOther'
}, {
  code: 'kansai',
  line: 'V 関西本線',
  sectionId: 'lineBtnKinki',
  flowType: 'JrwOther'
}, {
  code: 'kinokuni',
  line: 'W きのくに線',
  sectionId: 'lineBtnKinki',
  flowType: 'JrwOther'
}];
const OkayamaAreaLine = [{
  code: 'unominato',
  line: 'L 宇野みなと線',
  sectionId: 'lineBtnOkayama',
  flowType: 'JrwOther'
}, {
  code: 'setoohashi',
  line: 'M 瀬戸大橋線',
  sectionId: 'lineBtnOkayama',
  flowType: 'JrwOther'
}, {
  code: 'ako2',
  line: 'N 赤穂線',
  sectionId: 'lineBtnOkayama',
  flowType: 'JrwOther'
}, {
  code: 'sanyo1',
  line: 'S/W/X 山陽本線',
  sectionId: 'lineBtnOkayama',
  flowType: 'JrwOther'
}, {
  code: 'tsuyama',
  line: 'T 津山線',
  sectionId: 'lineBtnOkayama',
  flowType: 'JrwOther'
}, {
  code: 'hakubi1',
  line: 'V 伯備線',
  sectionId: 'lineBtnOkayama',
  flowType: 'JrwOther'
}, {
  code: 'fukuen1',
  line: 'Z 福塩線',
  sectionId: 'lineBtnOkayama',
  flowType: 'JrwOther'
}];
const HiroSekiAreaLine = [{
  code: 'kabe',
  line: 'B 可部線',
  sectionId: 'lineBtnHiroseki',
  flowType: 'JrwOther'
}, {
  code: 'sanyo2',
  line: 'G/R 山陽本線',
  sectionId: 'lineBtnHiroseki',
  flowType: 'JrwOther'
}, {
  code: 'sanyo3',
  line: '山陽本線',
  sectionId: 'lineBtnHiroseki',
  flowType: 'JrwOther'
}, {
  code: 'geibi1',
  line: 'P 芸備線',
  sectionId: 'lineBtnHiroseki',
  flowType: 'JrwOther'
}, {
  code: 'kure',
  line: 'Y 呉線',
  sectionId: 'lineBtnHiroseki',
  flowType: 'JrwOther'
}, {
  code: 'yamaguchi',
  line: '山口線',
  sectionId: 'lineBtnHiroseki',
  flowType: 'JrwOther'
}];
const SaninAreaLine = [{
  code: 'sanin3',
  line: 'A 山陰本線',
  sectionId: 'lineBtnSanin',
  flowType: 'JrwOther'
}, {
  code: 'imbi1',
  line: 'B 因美線',
  sectionId: 'lineBtnSanin',
  flowType: 'JrwOther'
}, {
  code: 'sanin4',
  line: 'D 山陰本線',
  sectionId: 'lineBtnSanin',
  flowType: 'JrwOther'
}, {
  code: 'hakubi2',
  line: 'V 伯備線',
  sectionId: 'lineBtnSanin',
  flowType: 'JrwOther'
}];
const CentralAreaLine = [{
  code: 'zaisenichijoho_10001',
  line: 'CA 東海道線(豊橋～米原)',
  sectionId: 'lineBtnCentral',
  flowType: 'Jrc'
}, {
  code: 'zaisenichijoho_10011',
  line: 'CA 東海道線(熱海～豊橋)',
  sectionId: 'lineBtnCentral',
  flowType: 'Jrc'
}, {
  code: 'zaisenichijoho_10013',
  line: 'CB 御殿場線',
  sectionId: 'lineBtnCentral',
  flowType: 'Jrc'
}, {
  code: 'zaisenichijoho_10012',
  line: 'CC 身延線',
  sectionId: 'lineBtnCentral',
  flowType: 'Jrc'
}, {
  code: 'zaisenichijoho_10010',
  line: 'CD 飯田線',
  sectionId: 'lineBtnCentral',
  flowType: 'Jrc'
}, {
  code: 'zaisenichijoho_10002',
  line: 'CE 武豊線',
  sectionId: 'lineBtnCentral',
  flowType: 'Jrc'
}, {
  code: 'zaisenichijoho_10003',
  line: 'CF 中央線',
  sectionId: 'lineBtnCentral',
  flowType: 'Jrc'
}, {
  code: 'zaisenichijoho_10004',
  line: 'CG 高山線',
  sectionId: 'lineBtnCentral',
  flowType: 'Jrc'
}, {
  code: 'zaisenichijoho_10005',
  line: 'CI 太多線',
  sectionId: 'lineBtnCentral',
  flowType: 'Jrc'
}, {
  code: 'zaisenichijoho_10006',
  line: 'CJ 関西線',
  sectionId: 'lineBtnCentral',
  flowType: 'Jrc'
}, {
  code: 'zaisenichijoho_10007',
  line: '紀勢線',
  sectionId: 'lineBtnCentral',
  flowType: 'Jrc'
}, {
  code: 'zaisenichijoho_10009',
  line: '名松線',
  sectionId: 'lineBtnCentral',
  flowType: 'Jrc'
}, {
  code: 'zaisenichijoho_10008',
  line: '参宮線',
  sectionId: 'lineBtnCentral',
  flowType: 'Jrc'
}, {
  code: 'zaisenichijoho_99999',
  line: 'CA 美濃赤坂線',
  sectionId: 'lineBtnCentral',
  flowType: 'Jrc'
}, {
  code: 'zaisenichijoho_99999',
  line: '伊勢鉄道',
  sectionId: 'lineBtnCentral',
  flowType: 'Jrc'
}];

/* ============================================================
 * クラス定義（content.js と同一）
 * ========================================================== */
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
class Destination {
  constructor(code, line, text) {
    this.text = text;
    this.code = code;
    this.line = line;
  }
}

/* ============================================================
 * データマッピング関数（content.js と同一）
 * ========================================================== */
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
function buildDestination(obj) {
  return new Destination(obj["code"], obj["line"], obj["text"]);
}
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
function buildTrainCentral(obj) {
  const train = new TrainCentral();
  train.cars = obj["cars"];
  train.crowded = obj["crowded"];
  train.delay_lin = obj["delay_lin"];
  train.delay_proof = obj["delay_proof"];
  train.direction = obj["direction"];
  train.doors = obj["doors"];
  train.laststation = obj["laststation"];
  train.linename = obj["linename"];
  train.locationCol = obj["locationCol"];
  train.locationRow = obj["locationRow"];
  train.nickname = obj["nickname"];
  train.nickname_no = obj["nickname_no"];
  train.position = obj["position"];
  train.tostation = obj["tostation"];
  train.tostation2 = obj["tostation2"];
  train.trainnumber = obj["trainnumber"];
  train.traintype = obj["traintype"];
  return train;
}

/* ============================================================
 * 列車情報装飾関数（content.js と同一）
 * ========================================================== */
function AddDispTypeCol(trainType, linename) {
  var typeCol = null;
  switch (trainType) {
    case "普通":
      {
        typeCol = '<span class="local">' + trainType + '</span>';
        return typeCol;
      }
    case "普通２":
      {
        typeCol = '<span class="local">普通</span>';
        return typeCol;
      }
    case "う普通○":
      {
        typeCol = '<span class="local">普通</span> [' + trainType + ']';
        return typeCol;
      }
    case "う普通×":
      {
        typeCol = '<span class="local">普通</span> [' + trainType + ']';
        return typeCol;
      }
    case "区間快速":
      {
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
    case "う区快○":
      {
        switch (linename) {
          case "nara":
            typeCol = '<span class="miyakojirapid">区間快速</span> [' + trainType + ']';
            return typeCol;
          default:
            {
              typeCol = '<span class="regionalrapid">区間快速</span> [' + trainType + ']';
              return typeCol;
            }
        }
      }
    case "う区快×":
      {
        switch (linename) {
          case "nara":
            typeCol = '<span class="miyakojirapid">区間快速</span> [' + trainType + ']';
            return typeCol;
          default:
            {
              typeCol = '<span class="regionalrapid">区間快速</span> [' + trainType + ']';
              return typeCol;
            }
        }
      }
    case "快速":
      {
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
    case "う快速○":
      {
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
          default:
            {
              typeCol = '<span class="rapid">快速</span> [' + trainType + ']';
              return typeCol;
            }
        }
      }
    case "う快速×":
      {
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
          default:
            {
              typeCol = '<span class="rapid">快速</span> [' + trainType + ']';
              return typeCol;
            }
        }
      }
    case "臨A快○":
      {
        typeCol = '<span class="rapid">快速</span> [' + trainType + ']';
        return typeCol;
      }
    case "臨A快×":
      {
        typeCol = '<span class="rapid">快速</span> [' + trainType + ']';
        return typeCol;
      }
    case "新快速":
      {
        switch (linename) {
          case "central":
            typeCol = '<span class="newrapid">' + trainType + '</span>';
            return typeCol;
          default:
            typeCol = '<span class="specialrapid">' + trainType + '</span>';
            return typeCol;
        }
      }
    case "特別快速":
      {
        typeCol = '<span class="specialrapidC">' + trainType + '</span>';
        return typeCol;
      }
    case "A新快○":
      {
        typeCol = '<span class="specialrapid">新快速</span> [' + trainType + ']';
        return typeCol;
      }
    case "A新快×":
      {
        typeCol = '<span class="specialrapid">新快速</span> [' + trainType + ']';
        return typeCol;
      }
    case "う新快○":
      {
        typeCol = '<span class="specialrapid">新快速</span> [' + trainType + ']';
        return typeCol;
      }
    case "う新快×":
      {
        typeCol = '<span class="specialrapid">新快速</span> [' + trainType + ']';
        return typeCol;
      }
    case "A→一般":
      {
        typeCol = '<span class="specialrapid">新快速</span> [' + trainType + ']';
        return typeCol;
      }
    case "A→新快":
      {
        typeCol = '<span class="specialrapid">新快速</span> [' + trainType + ']';
        return typeCol;
      }
    case "一般→A":
      {
        typeCol = '<span class="specialrapid">新快速</span> [' + trainType + ']';
        return typeCol;
      }
    case "臨A新○":
      {
        typeCol = '<span class="specialrapid">新快速</span> [' + trainType + ']';
        return typeCol;
      }
    case "臨A新×":
      {
        typeCol = '<span class="specialrapid">新快速</span> [' + trainType + ']';
        return typeCol;
      }
    case "丹波路快":
      {
        typeCol = '<span class="tambajirapid">丹波路快速</span>';
        return typeCol;
      }
    case "丹波路快速":
      {
        typeCol = '<span class="tambajirapid">' + trainType + '</span>';
        return typeCol;
      }
    case "う丹快○":
      {
        typeCol = '<span class="tambajirapid">丹波路快速</span> [' + trainType + ']';
        return typeCol;
      }
    case "う丹快×":
      {
        typeCol = '<span class="tambajirapid">丹波路快速</span> [' + trainType + ']';
        return typeCol;
      }
    case "紀州路快":
      {
        typeCol = '<span class="kishujirapid">紀州路快速</span>';
        return typeCol;
      }
    case "紀州路快速":
      {
        typeCol = '<span class="kishujirapid">' + trainType + '</span>';
        return typeCol;
      }
    case "シャトル":
      {
        typeCol = '<span class="kixrapid">' + trainType + '</span>';
        return typeCol;
      }
    case "関空快速":
      {
        typeCol = '<span class="kixrapid">' + trainType + '</span>';
        return typeCol;
      }
    case "関空紀州":
      {
        typeCol = '<span class="kixrapid">関空</span>' + '/' + '<span class="kishujirapid">紀州路</span>' + '<span class="rapid">快速</span>';
        return typeCol;
      }
    case "大和路快":
      {
        typeCol = '<span class="yamatojirapid">大和路快速</span>';
        return typeCol;
      }
    case "大和路快速":
      {
        typeCol = '<span class="yamatojirapid">' + trainType + '</span>';
        return typeCol;
      }
    case "う大快○":
      {
        typeCol = '<span class="yamatojirapid">大和路快速</span> [' + trainType + ']';
        return typeCol;
      }
    case "う大快×":
      {
        typeCol = '<span class="yamatojirapid">大和路快速</span> [' + trainType + ']';
        return typeCol;
      }
    case "みやこ快":
      {
        typeCol = '<span class="miyakojirapid">みやこ路快速</span>';
        return typeCol;
      }
    case "みやこ路快速":
      {
        typeCol = '<span class="miyakojirapid">' + trainType + '</span>';
        return typeCol;
      }
    case "うみ快○":
      {
        typeCol = '<span class="miyakojirapid">みやこ路快速</span> [' + trainType + ']';
        return typeCol;
      }
    case "うみ快×":
      {
        typeCol = '<span class="miyakojirapid">みやこ路快速</span> [' + trainType + ']';
        return typeCol;
      }
    case "直通快速":
      {
        typeCol = '<span class="directrapid">' + trainType + '</span>';
        return typeCol;
      }
    case "う直快○":
      {
        typeCol = '<span class="directrapid">直通快速</span> [' + trainType + ']';
        return typeCol;
      }
    case "う直快×":
      {
        typeCol = '<span class="directrapid">直通快速</span> [' + trainType + ']';
        return typeCol;
      }
    case "快速みえ":
      {
        typeCol = '<span class="newrapid">快速</span>';
        return typeCol;
      }
    case "特急":
      {
        typeCol = '<span class="limitedexp">' + trainType + '</span>';
        return typeCol;
      }
    case "急行":
      {
        typeCol = '<span class="express">' + trainType + '</span>';
        return typeCol;
      }
    case "ホームライナー":
      {
        typeCol = '<span class="express">' + trainType + '</span>';
        return typeCol;
      }
    case "ＨＬ":
      {
        typeCol = '<span class="express">' + trainType + '</span>';
        return typeCol;
      }
    case "関空特急":
      {
        typeCol = '<span class="limitedexp">' + trainType + '</span>';
        return typeCol;
      }
    case "通勤特急":
      {
        typeCol = '<span class="limitedexp">' + trainType + '</span>';
        return typeCol;
      }
    case "臨時特急":
      {
        typeCol = '<span class="limitedexp">' + trainType + '</span>';
        return typeCol;
      }
    case "寝台特急":
      {
        typeCol = '<span class="limitedexp">' + trainType + '</span>';
        return typeCol;
      }
    case "寝台":
      {
        typeCol = '<span class="limitedexp">' + trainType + '</span>';
        return typeCol;
      }
    case "ＳＬ":
      {
        typeCol = '<span class="extra">' + trainType + '</span>';
        return typeCol;
      }
    case "回送":
      {
        typeCol = '<span class="notinservice">' + trainType + '</span>';
        return typeCol;
      }
    case "臨時":
      {
        typeCol = '<span class="extra">' + trainType + '</span>';
        return typeCol;
      }
    case "観光列車":
      {
        typeCol = '<span class="extra">' + trainType + '</span>';
        return typeCol;
      }
    default:
      {
        return trainType;
      }
  }
}
function AddDestCol(trainDest) {
  switch (trainDest) {
    case null:
      return '';
    default:
      return '<span class="destination">' + trainDest + '</span>行き';
  }
}
function centralAddDest2(trainDest, trainNumber) {
  var setTrainDest = "";
  switch (trainDest) {
    case '':
      return '';
    default:
      {
        switch (trainNumber) {
          case '5031M':
            setTrainDest = '出雲市';
            break;
          case '8041M':
            setTrainDest = '出雲市';
            break;
          case '205M':
            setTrainDest = '松本';
            break;
          case '106F':
            setTrainDest = '武豊';
            break;
          case '3106F':
            setTrainDest = '武豊';
            break;
        }
        return '<span class="destination">' + setTrainDest + '</span>行き';
      }
  }
}
function LineMarkGet(LineMark) {
  switch (LineMark) {
    case "hokuriku":
      return '<span class="hokurikuA">[A]</span>';
    case "kosei":
      return '<span class="kosei">[B]</span>';
    case "kusatsu":
      return '<span class="kusatsu">[C]</span>';
    case "nara":
      return '<span class="nara">[D]</span>';
    case "osakahigashi":
      return '<span class="osakahigashi">[F]</span>';
    case "takarazuka":
      return '<span class="takarazuka">[G]</span>';
    case "tozai":
      return '<span class="tozai">[H]</span>';
    case "kakogawa":
      return '<span class="kakogawa">[I]</span>';
    case "kishin":
      return '<span class="kishin">[K]</span>';
    case "osakaloop":
      return '<span class="osakaloop">[O]</span>';
    case "yumesaki":
      return '<span class="yumesaki">[P]</span>';
    case "yamatoji":
      return '<span class="yamatoji">[Q]</span>';
    case "hanwa":
      return '<span class="hanwahagoromo">[R]</span>';
    case "kansaiairport":
      return '<span class="kansaiairport">[S]</span>';
    case "wakayama2":
      return '<span class="wakayama">[T]</span>';
    case "kansai":
      return '<span class="kansai">[V]</span>';
    case "kinokuni":
      return '<span class="kinokuni">[W]</span>';
    case "other":
      return "";
    case "hagoromo":
      return "";
    default:
      return LineMark;
  }
}
function nicknameSet(nickname, nickname_no, line) {
  switch (line) {
    case "central":
      {
        if (nickname != null && nickname_no == '-1') return nickname;else if (nickname == null || nickname_no == '-1') return "";else return nickname + nickname_no + "号";
      }
  }
  if (nickname == null) return "";else return nickname;
}
function directionSet(direction, line) {
  switch (line) {
    case 'central':
      if (direction == 1) return "上り";else return "下り";
    default:
      if (direction == 0) return "上り";else return "下り";
  }
}
function delayMinutesSet(delayMinutes) {
  if (delayMinutes == 0) return '<span class="noDelay"></span>';else if (delayMinutes >= 60) return '<span class="overDelay">60分以上遅れ</span>';else return '<span class="delayMinutes">' + delayMinutes + '分遅れ</span>';
}

/* ============================================================
 * 駅情報取得関数（content.js と同一。stationList.js のグローバル変数を参照）
 * ========================================================== */
function StaGet_WestUrban(pos) {
  const position = pos.split('_');
  const pos1 = posMatch_WestUrban(position[0]);
  const pos2 = posMatch_WestUrban(position[1]);
  if (pos2.length == 0) return pos1[0].stationName;else return pos1[0].stationName + "～" + pos2[0].stationName;
}
function posMatch_WestUrban(pos_u) {
  return stations_urban.filter(Ustation => Ustation.stationCode === pos_u);
}
function StaGet_WestOther(pos) {
  const position = pos.split('_');
  const pos1 = posMatch_WestOther(position[0]);
  const pos2 = posMatch_WestOther(position[1]);
  if (pos2.length == 0) return pos1[0].StationName;else return pos1[0].StationName + "～" + pos2[0].StationName;
}
function posMatch_WestOther(pos_o) {
  return stations_other.filter(Ostation => Ostation.StationCode === pos_o);
}
function StaGet_Central(linename, locationRow, position) {
  if (position == 0) {
    const location = posMatch_Central(linename, locationRow);
    return location[0].ekiMei;
  } else if (position == 1) {
    const location = posMatch_Central(linename, locationRow);
    return location[0].ekiMei + " 付近 ";
  }
}
function posMatch_Central(linename, locationRow) {
  var row = 0;
  switch (linename) {
    default:
      row = locationRow * 10;
      break;
    case '伊勢鉄道':
      row = locationRow;
      break;
    case '美濃赤坂線':
      row = locationRow * 10 + 420;
      break;
  }
  return stations_Central.filter(Cstation => Cstation.ryokakuSenkuMei === linename && Cstation.kudariJun === row.toString());
}

/* ============================================================
 * 列車情報カードHTML生成（DOM生成の代わりに React へ渡す文字列を組み立てる）
 * ========================================================== */
function cardWestUrban(train, idx) {
  const line = "";
  var ureSeatInfo = "",
    typeChange = "",
    otherInfo = "";
  const DispTypeAddCol = AddDispTypeCol(train.displayType, train.dest.line);
  const DestAddCol = AddDestCol(train.dest.text);
  const LineMark = LineMarkGet(train.dest.line);
  const direction = directionSet(train.direction, line);
  const delayMinutes = delayMinutesSet(train.delayMinutes);
  const position = StaGet_WestUrban(train.pos);
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
  } else if (tmp_typeChange != '') {
    ureSeatInfo = tmp_typeChange.includes('うれしート') ? " " + tmp_typeChange + " " : "";
    typeChange = tmp_typeChange.includes('うれしート') ? "" : " " + tmp_typeChange + " ";
  } else {
    ureSeatInfo = "";
    typeChange = "";
  }
  const html = train.no + " " + LineMark + DispTypeAddCol + " " + train.nickname + " " + typeChange + " " + train.via + " " + DestAddCol + " " + train.numberOfCars + "両 " + delayMinutes + " 走行位置：" + position + direction + aSeatInfo + otherInfo + ureSeatInfo;
  return {
    key: 'wu-' + idx,
    className: `kakomi-box3 kakomi-${train.dest.line}`,
    html
  };
}
function cardWestOther(train, idx) {
  const line = "";
  var ureSeatInfo = "",
    typeChange = "";
  const DispTypeAddCol = AddDispTypeCol(train.displayType, line);
  const DestAddCol = AddDestCol(train.dest);
  const nickname = nicknameSet(train.nickname, "", "");
  const direction = directionSet(train.direction, line);
  const delayMinutes = delayMinutesSet(train.delayMinutes);
  const position = StaGet_WestOther(train.pos);
  const tmp_notice = train.notice;
  if (tmp_notice != null && tmp_notice.includes('\n')) {
    ureSeatInfo = " " + tmp_notice.split('\n')[0] + " ";
    typeChange = " " + tmp_notice.split('\n')[1] + " ";
  } else if (tmp_notice != null && !tmp_notice.includes('\n')) {
    typeChange = " " + tmp_notice + " ";
  } else if (tmp_notice != null && tmp_notice != '') {
    ureSeatInfo = tmp_notice.includes('うれしート') ? " " + tmp_notice + " " : "";
    typeChange = tmp_notice.includes('うれしート') ? "" : " " + tmp_notice + " ";
  } else {
    ureSeatInfo = "";
    typeChange = "";
  }
  const html = train.no + " " + DispTypeAddCol + typeChange + nickname + " " + DestAddCol + " " + delayMinutes + " 走行位置：" + position + direction + ureSeatInfo;
  return {
    key: 'wo-' + idx,
    className: 'kakomi-box3',
    html
  };
}
function cardCentral(train, idx) {
  const line = 'central';
  const DispTypeAddCol = AddDispTypeCol(train.traintype[0].name, line);
  const DestAddCol = AddDestCol(train.tostation[0].name);
  const dest2 = centralAddDest2(train.tostation2[0].name, train.trainnumber);
  const Dest2AddCol = dest2 === "" ? "" : '・' + dest2;
  const nickname = nicknameSet(train.nickname[0].name, train.nickname_no, line);
  const direction = directionSet(train.locationCol, line);
  const delayMinutes = delayMinutesSet(train.delay_lin);
  const position = StaGet_Central(train.linename[0].name, train.locationRow, train.position);
  const html = train.trainnumber + " " + DispTypeAddCol + " " + nickname + " " + DestAddCol + Dest2AddCol + " " + delayMinutes + " 走行位置：" + position + direction;
  return {
    key: 'ce-' + idx,
    className: 'kakomi-box3',
    html
  };
}

/* ============================================================
 * 通信先エンドポイント（content.js と同一）
 * ========================================================== */
const LINE_INFO_ENDPOINT = "https://prod-38.japaneast.logic.azure.com:443/workflows/a98ba8e0a5b74390a09eecfc147607fb/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=IMP3VtK1G505nZaw6u7osA8vInr_0M3DSb5kZzsK76o";
async function fetchLineTrains(linename, flowType, line) {
  const response = await fetch(LINE_INFO_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      getLineName: linename,
      flowType: flowType
    })
  });
  if (!response.ok) {
    throw new Error(`レスポンスステータス: ${response.status}`);
  }
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new TypeError("残念、受信したのは JSON ではなかった！");
  }
  const body = await response.json();
  switch (flowType) {
    case 'KinkiUrban':
      {
        const trains = body.map(buildTrainWestUrban);
        return trains.map((t, i) => cardWestUrban(t, i));
      }
    case 'JrwOther':
      {
        const trains = body.map(buildTrainWestOther);
        return trains.map((t, i) => cardWestOther(t, i));
      }
    case 'Jrc':
      {
        const trains = body.map(buildTrainCentral);
        const regex = new RegExp('[ ]');
        const displine = regex.test(line) ? line.split(' ')[1] : line;
        const trainsFilter = trains.filter(t => t.linename[0].name === displine);
        return trainsFilter.map((t, i) => cardCentral(t, i));
      }
    default:
      return [];
  }
}

/* ============================================================
 * React UI コンポーネント
 * ========================================================== */

// 現在日時（毎秒更新）
function formatClock(now) {
  const year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  const weeks = ["日", "月", "火", "水", "木", "金", "土"];
  const day = weeks[now.getDay()];
  const time = now.getHours();
  let min = now.getMinutes();
  let sec = now.getSeconds();
  if (month < 10) month = "0" + month;
  if (date < 10) date = "0" + date;
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;
  return `${year}/${month}/${date}（${day}）${time}:${min}:${sec}`;
}
function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return /*#__PURE__*/React.createElement("span", {
    className: "font-mono tabular-nums text-sm sm:text-base text-slate-100"
  }, formatClock(now));
}

// アイコン（シェブロン）
function ChevronIcon({
  open
}) {
  return /*#__PURE__*/React.createElement("svg", {
    className: `h-4 w-4 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`,
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 7l5 5 5-5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}

// 開閉メニュー（元の <details><summary> をモダンなアコーディオンに置換）
function AccordionSection({
  title,
  defaultOpen = false,
  badge,
  children
}) {
  const [open, setOpen] = useState(defaultOpen);
  return /*#__PURE__*/React.createElement("div", {
    className: "overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOpen(o => !o),
    className: "flex w-full items-center justify-between gap-3 bg-gradient-to-r from-indigo-600 to-slate-600 px-4 py-3 text-left text-sm font-semibold text-white transition-colors hover:from-indigo-500 hover:to-slate-500"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-2"
  }, title, badge != null && /*#__PURE__*/React.createElement("span", {
    className: "rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium"
  }, badge)), /*#__PURE__*/React.createElement(ChevronIcon, {
    open: open
  })), open && /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-3"
  }, children));
}

// 路線／外部リンク ボタン
function ChipButton({
  label,
  active,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    className: "rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors " + (active ? "border-indigo-600 bg-indigo-600 text-white shadow" : "border-slate-300 bg-slate-50 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700")
  }, label);
}
function ButtonGrid({
  items,
  selectedCode,
  onSelect
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, items.map((item, i) => /*#__PURE__*/React.createElement(ChipButton, {
    key: item.code + '-' + i,
    label: item.line,
    active: selectedCode === item.code,
    onClick: () => onSelect(item)
  })));
}
function TrainCard({
  card
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `${card.className} rounded-lg border border-slate-200 bg-white p-3 text-sm leading-relaxed shadow-sm`,
    dangerouslySetInnerHTML: {
      __html: card.html
    }
  });
}
function App() {
  const [selectedLine, setSelectedLine] = useState(null);
  const [selectedCode, setSelectedCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [cards, setCards] = useState([]);
  const requestSeq = useRef(0);
  const handleSelectLine = useCallback(async item => {
    const seq = ++requestSeq.current;
    setSelectedLine(item.line);
    setSelectedCode(item.code);
    setLoading(true);
    setErrorMsg(null);
    setCards([]);
    try {
      const result = await fetchLineTrains(item.code, item.flowType, item.line);
      if (requestSeq.current === seq) {
        setCards(result);
      }
    } catch (error) {
      console.error(error.message);
      if (requestSeq.current === seq) {
        setErrorMsg(error.message);
      }
    } finally {
      if (requestSeq.current === seq) {
        setLoading(false);
      }
    }
  }, []);
  const handleOpenInfoLink = useCallback(item => {
    switch (item.area) {
      case 'JRW':
        window.open('https://trafficinfo.westjr.co.jp/' + item.code + '.html', '_blank');
        break;
      case 'JRC':
        window.open('https://traininfo.jr-central.co.jp/' + item.code + '/index.html?lang=ja', '_blank');
        break;
    }
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-slate-100"
  }, /*#__PURE__*/React.createElement("header", {
    className: "sticky top-0 z-10 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 shadow-md"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-white sm:text-xl"
  }, "\u5217\u8ECA\u8D70\u884C\u4F4D\u7F6E\u30D3\u30E5\u30FC\u30A2"), /*#__PURE__*/React.createElement(Clock, null))), /*#__PURE__*/React.createElement("main", {
    className: "mx-auto max-w-7xl grid grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[380px_1fr]"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "flex flex-col gap-4"
  }, /*#__PURE__*/React.createElement(AccordionSection, {
    title: "\u66F4\u65B0\u60C5\u5831\uFF082026/03/31\uFF09",
    defaultOpen: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-1 text-sm text-slate-700"
  }, /*#__PURE__*/React.createElement("div", null, "JRC\u30A8\u30EA\u30A2\u306E\u30E1\u30F3\u30C6\u30CA\u30F3\u30B9\uFF08\u203B\uFF09\u3092\u5B9F\u65BD\u3057\u307E\u3057\u305F\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-500"
  }, "\u203B2\u5217\u8ECA\u4F75\u7D50\u3057\u3066\u3044\u308B\u5834\u5408\u306E\u884C\u5148\u60C5\u5831\u3092\u66AB\u5B9A\u7684\u306B\u51FA\u529B\uFF08\u5B9F\u969B\u306E\u904B\u884C\u60C5\u5831\u3068\u7570\u306A\u308B\u5834\u5408\u3042\u308A\uFF09"))), /*#__PURE__*/React.createElement(AccordionSection, {
    title: "\u904B\u884C\u60C5\u5831\u30EA\u30F3\u30AF\uFF08\u5916\u90E8\u30EA\u30F3\u30AF\uFF09",
    defaultOpen: false,
    badge: OperationInfoPages.length
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, OperationInfoPages.map((item, i) => /*#__PURE__*/React.createElement(ChipButton, {
    key: item.code + i,
    label: item.line,
    onClick: () => handleOpenInfoLink(item)
  })))), /*#__PURE__*/React.createElement(AccordionSection, {
    title: "JRW \u8FD1\u757F\u30A8\u30EA\u30A2",
    defaultOpen: true,
    badge: KinkiAreaLine.length
  }, /*#__PURE__*/React.createElement(ButtonGrid, {
    items: KinkiAreaLine,
    selectedCode: selectedCode,
    onSelect: handleSelectLine
  })), /*#__PURE__*/React.createElement(AccordionSection, {
    title: "JRW \u5CA1\u5C71\u30A8\u30EA\u30A2",
    defaultOpen: false,
    badge: OkayamaAreaLine.length
  }, /*#__PURE__*/React.createElement(ButtonGrid, {
    items: OkayamaAreaLine,
    selectedCode: selectedCode,
    onSelect: handleSelectLine
  })), /*#__PURE__*/React.createElement(AccordionSection, {
    title: "JRW \u5E83\u5CF6/\u4E0B\u95A2\u30A8\u30EA\u30A2",
    defaultOpen: false,
    badge: HiroSekiAreaLine.length
  }, /*#__PURE__*/React.createElement(ButtonGrid, {
    items: HiroSekiAreaLine,
    selectedCode: selectedCode,
    onSelect: handleSelectLine
  })), /*#__PURE__*/React.createElement(AccordionSection, {
    title: "JRW \u5C71\u9670\u30A8\u30EA\u30A2",
    defaultOpen: false,
    badge: SaninAreaLine.length
  }, /*#__PURE__*/React.createElement(ButtonGrid, {
    items: SaninAreaLine,
    selectedCode: selectedCode,
    onSelect: handleSelectLine
  })), /*#__PURE__*/React.createElement(AccordionSection, {
    title: "JRC \u5168\u30A8\u30EA\u30A2",
    defaultOpen: false,
    badge: CentralAreaLine.length
  }, /*#__PURE__*/React.createElement(ButtonGrid, {
    items: CentralAreaLine,
    selectedCode: selectedCode,
    onSelect: handleSelectLine
  }))), /*#__PURE__*/React.createElement("section", {
    className: "flex flex-col gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-slate-500"
  }, "\u9078\u629E\u4E2D\u306E\u8DEF\u7DDA"), /*#__PURE__*/React.createElement("div", {
    className: "text-lg font-semibold text-slate-800"
  }, selectedLine ? `[${selectedLine}]` : "路線を選択してください")), loading && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-6 text-slate-500 shadow-sm"
  }, /*#__PURE__*/React.createElement("span", {
    className: "h-4 w-4 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"
  }), "\u30FB\u30FB\u30FB\u8AAD\u307F\u8FBC\u307F\u4E2D\u30FB\u30FB\u30FB"), !loading && errorMsg && /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm"
  }, "\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F\uFF1A", errorMsg), !loading && !errorMsg && selectedCode && cards.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl border border-slate-200 bg-white px-4 py-6 text-slate-500 shadow-sm"
  }, "\u8A72\u5F53\u3059\u308B\u5217\u8ECA\u60C5\u5831\u304C\u3042\u308A\u307E\u305B\u3093\u3002"), !loading && cards.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3"
  }, cards.map(card => /*#__PURE__*/React.createElement(TrainCard, {
    key: card.key,
    card: card
  }))))));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
