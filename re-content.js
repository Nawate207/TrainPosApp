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
}, {
  code: 'Aonami',
  line: 'あおなみ線',
  sectionId: 'lineBtnCentral',
  flowType: 'Aonami'
}];
const ToeiAreaLine = [{
  code: '1',
  line: 'A 浅草線',
  sectionId: 'lineBtnToei',
  flowType: 'Toei'
}, {
  code: '2',
  line: 'I 三田線',
  sectionId: 'lineBtnToei',
  flowType: 'Toei'
}, {
  code: '3',
  line: 'S 新宿線',
  sectionId: 'lineBtnToei',
  flowType: 'Toei'
}, {
  code: '4',
  line: 'E 大江戸線',
  sectionId: 'lineBtnToei',
  flowType: 'Toei'
}];

// 路線ID → 路線名（受信JSONには路線名がないため、odpt:railway から変換して絞り込みに使う）
const ToeiRailwayName = {
  'odpt.Railway:Toei.Asakusa': '浅草線',
  'odpt.Railway:Toei.Mita': '三田線',
  'odpt.Railway:Toei.Shinjuku': '新宿線',
  'odpt.Railway:Toei.Oedo': '大江戸線',
  'odpt.Railway:Toei.Arakawa': '荒川線'
};

// 列車種別（odpt:trainType の "odpt.TrainType:Toei." 以降）
const ToeiTrainTypeName = {
  'Local': '普通',
  'Rapid': '快速',
  'Express': '急行',
  'LimitedExpress': '特急',
  'RapidLimitedExpress': '快特',
  'AirportRapidLimitedExpress': 'エアポート快特',
  'AccessExpress': 'アクセス特急',
  'CommuterLimitedExpress': '通勤特急'
};

// 進行方向（odpt:railDirection の "odpt.RailDirection:" 以降）→ 上り／下り
// 起点から終点へ向かう方向を「下り」、起点へ向かう方向を「上り」としている。
//   浅草線 Northbound=押上方面 / 三田線 Northbound=西高島平方面 / 新宿線 Eastbound=本八幡方面 / 荒川線 Toei.Waseda=早稲田方面
//   大江戸線は上下の区別がないため、外回りを下り・内回りを上りとして扱う。
// 向きの対応を変えたい場合はこの表だけを修正すればよい。
const ToeiDirectionMap = {
  'Northbound': '下り',
  'Eastbound': '下り',
  'OuterLoop': '下り',
  'Toei.Waseda': '下り',
  'Southbound': '上り',
  'Westbound': '上り',
  'InnerLoop': '上り',
  'Toei.Minowabashi': '上り'
};

// 車両所有会社（odpt:trainOwner の "odpt.Operator:" 以降）。直通運転の他社車両を示すために使用
const ToeiOwnerName = {
  'Toei': '都営',
  'Keisei': '京成',
  'Keikyu': '京急',
  'Keio': '京王',
  'Hokuso': '北総',
  'Sotetsu': '相鉄',
  'Tokyu': '東急'
};

// 車両所有会社ごとのカード枠線の色（コーポレートカラーに準拠。キーは ToeiOwnerName と同じ）
const ToeiOwnerColorMap = {
  'Toei': '#00a040',
  'Keisei': '#0e4c9b',
  'Keikyu': '#e5171f',
  'Keio': '#dd0077',
  'Hokuso': '#f39800',
  'Sotetsu': '#1a3a8f',
  'Tokyu': '#9b1b30'
};
// 所有会社が不明な場合の枠線の色
const ToeiDefaultOwnerColor = '#00a040';

/* ============================================================
 * 路線ボタンの配色（re-style.css の kakomi-系／span.系 定義に準拠。
 * 未定義の路線は re-style.css の kakomi-other と同じ既定色を使用）
 * ========================================================== */
const DEFAULT_LINE_COLOR = '#444';
const LineColorMap = {
  // JRW 近畿エリア（re-style.css の路線記号色付に準拠）
  hokuriku: 'blue',
  kosei: 'deepskyblue',
  kusatsu: '#7fbf00',
  nara: 'darkgoldenrod',
  osakahigashi: 'steelblue',
  takarazuka: '#f39800',
  tozai: 'deeppink',
  osakaloop: 'red',
  yumesaki: 'navy',
  yamatoji: 'green',
  hanwahagoromo: 'darkorange',
  kansaiairport: 'royalblue',
  wakayama1: 'hotpink',
  wakayama2: 'hotpink',
  kansai: 'darkviolet',
  kinokuni: 'darkturquoise',
  manyomahoroba: 'firebrick',
  // JRW 近畿エリア追加分（train-guide.westjr.co.jp の路線記号バッジに準拠）
  hokurikubiwako: '#0072bc',
  kyoto: '#0072bc',
  kobesanyo: '#0072bc',
  ako: '#0072bc',
  sagano: '#8e7cc3',
  sanin1: '#8e7cc3',
  sanin2: '#8e7cc3',
  fukuchiyama: '#f39800',
  gakkentoshi: 'deeppink',
  bantan: '#6a3d9a',
  maizuru: '#f39800',
  // JRW 岡山・福山エリア（train-guide.westjr.co.jp 準拠）
  unominato: '#00a0de',
  setoohashi: '#9b59b6',
  ako2: '#d6006d',
  sanyo1: '#0072bc',
  tsuyama: '#f9a825',
  hakubi1: '#00a650',
  fukuen1: '#8b1a1a',
  // JRW 広島・山口エリア（train-guide.westjr.co.jp 準拠）
  kabe: '#3cb371',
  sanyo2: '#00897b',
  sanyo3: '#1565c0',
  geibi1: '#7e57c2',
  kure: '#ffb300',
  yamaguchi: '#ff7043',
  // JRW 山陰エリア（train-guide.westjr.co.jp 準拠）
  sanin3: '#8bc34a',
  imbi1: '#cddc39',
  sanin4: '#f4511e',
  hakubi2: '#00a650',
  // JRC 在来線エリア（traininfo.jr-central.co.jp 準拠）
  zaisenichijoho_10001: '#f7931e',
  zaisenichijoho_10011: '#f7931e',
  zaisenichijoho_10013: '#2e7d32',
  zaisenichijoho_10012: '#6a1b9a',
  zaisenichijoho_10010: '#4fc3f7',
  zaisenichijoho_10002: '#8d5524',
  zaisenichijoho_10003: '#607d8b',
  zaisenichijoho_10004: '#8d4b3b',
  zaisenichijoho_10005: '#9e9d24',
  zaisenichijoho_10006: '#26a69a',
  // 都営地下鉄（キーは ToeiAreaLine の code）
  '1': '#e85298',
  '2': '#0079c2',
  '3': '#6cbb5a',
  '4': '#b6007a'
};

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
class TrainAonami {
  constructor() {
    this.position = "";
    this.trainnumber = "";
    this.sy = "";
    this.tostation = "";
    this.delay = "";
    this.locationCol = "";
  }
}
class TrainToei {
  constructor() {
    this.no = "";
    this.linename = [{
      name: ""
    }];
    this.displayType = "";
    this.direction = "";
    this.delayMinutes = 0;
    this.from = "";
    this.to = null;
    this.dest = "";
    this.owner = "";
    this.ownerColor = ToeiDefaultOwnerColor;
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
function buildTrainAonami(obj) {
  const train = new TrainAonami();
  train.position = obj["id"];
  train.trainnumber = obj.tr[0]["no"];
  train.traintype = obj.tr[0]["sy"];
  train.tostation = obj.tr[0]["ik"];
  train.delay = obj.tr[0]["dl"];
  train.locationCol = obj.tr[0]["hk"];
  return train;
}

// ODPT（公共交通オープンデータ）形式の列車JSON（都営地下鉄）を成形する
//   "odpt:trainNumber": "1659H", "odpt:railway": "odpt.Railway:Toei.Asakusa", "odpt:trainType": "odpt.TrainType:Toei.Local",
//   "odpt:railDirection": "odpt.RailDirection:Northbound",
//   "odpt:fromStation": 直前に通過／停車中の駅, "odpt:toStation": 次の駅（駅に停車中の場合は null）,
//   "odpt:destinationStation": ["odpt.Station:Keisei.Oshiage.Aoto"], "odpt:delay": 遅延（秒）
function buildTrainToei(obj) {
  const train = new TrainToei();
  train.no = obj["odpt:trainNumber"];
  train.linename = [{
    name: toeiOwnValue(ToeiRailwayName, obj["odpt:railway"]) || ""
  }];
  train.displayType = toeiTrainTypeNameGet(obj["odpt:trainType"]);
  train.direction = toeiDirectionSet(obj["odpt:railDirection"]);
  // odpt:delay は秒単位のため、他エリアと同じ分単位に変換する
  train.delayMinutes = Math.floor((obj["odpt:delay"] || 0) / 60);
  train.from = obj["odpt:fromStation"];
  train.to = obj["odpt:toStation"];
  const dests = obj["odpt:destinationStation"];
  train.dest = dests && dests.length > 0 ? toeiStationNameGet(dests[0]) : null;
  // 大江戸線など odpt:trainOwner を持たない列車は、運行会社（odpt:operator）を所有会社とみなす
  const ownerId = obj["odpt:trainOwner"] || obj["odpt:operator"];
  train.owner = toeiOwnerNameGet(ownerId);
  train.ownerColor = toeiOwnerColorGet(ownerId);
  return train;
}

/* ============================================================
 * 列車情報装飾関数（content.js と同一）
 * ========================================================== */
// API 応答由来の値を HTML 文字列に埋め込む前に無害化する（& < > " ' を実体参照に置換。null/undefined は空文字）
function escapeHtml(value) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return String(value == null ? '' : value).replace(/[&<>"']/g, ch => map[ch]);
}
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
        return escapeHtml(trainType);
      }
  }
}
function AddDispTypeMapCol(trainType, linename) {
  switch (linename) {
    case "aonami":
      {
        switch (trainType) {
          case "1":
            return '<span class="local">普通</span>';
          case "6":
            return '<span class="extra">ノンストップ</span>';
          default:
            return escapeHtml(trainType);
        }
      }
    default:
      return escapeHtml(trainType);
  }
}

// 快特・アクセス特急・通勤特急は既存の AddDispTypeCol に定義がないため、特急と同じ赤系の書式で装飾する
function AddDispTypeColToei(trainType) {
  switch (trainType) {
    case '快特':
    case 'エアポート快特':
    case 'アクセス特急':
    case '通勤特急':
      return '<span class="limitedexp">' + trainType + '</span>';
    default:
      return AddDispTypeCol(trainType, 'toei');
  }
}
function AddDestCol(trainDest) {
  switch (trainDest) {
    case null:
      return '';
    default:
      return '<span class="destination">' + escapeHtml(trainDest) + '</span>行き';
  }
}
function AddDestMapCol(trainDest, line) {
  switch (line) {
    case "aonami":
      {
        const staInfo = stations_Central.filter(Aostation => Aostation.kudariJun === trainDest && Aostation.ryokakuSenkuMei === "あおなみ線");
        return staInfo[0].ekiMei;
      }
    default:
      return '<span class="destination">' + escapeHtml(trainDest) + '</span>行き';
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
      return escapeHtml(LineMark);
  }
}
function nicknameSet(nickname, nickname_no, line) {
  switch (line) {
    case "central":
      {
        if (nickname != null && nickname_no == '-1') return escapeHtml(nickname);else if (nickname == null || nickname_no == '-1') return "";else return escapeHtml(nickname + nickname_no + "号");
      }
  }
  if (nickname == null) return "";else return escapeHtml(nickname);
}
function directionSet(direction, line) {
  switch (line) {
    case 'central':
      if (direction == 1) return "上り";else return "下り";
    default:
      if (direction == 0) return "上り";else return "下り";
  }
}

// 遅延分は数値に変換してから表示する（数値以外が来ても HTML として解釈されないようにする）
function delayMinutesSet(delayMinutes) {
  const minutes = Number(delayMinutes);
  if (isNaN(minutes) || minutes == 0) return '<span class="noDelay"></span>';else if (minutes >= 60) return '<span class="overDelay">60分以上遅れ</span>';else return '<span class="delayMinutes">' + minutes + '分遅れ</span>';
}

// 車両の所有会社を示す表記（所有会社が不明な場合は表示しない）
function toeiOwnerSet(owner) {
  return owner === '' ? '' : ' [' + owner + '車]';
}

// 辞書の参照。'constructor' や '__proto__' など、辞書自身の項目ではないキーは無視する
function toeiOwnValue(table, key) {
  return Object.prototype.hasOwnProperty.call(table, key) ? table[key] : undefined;
}

// "odpt.xxx:" などの接頭辞を除いた部分を返す
function toeiIdTail(id, prefix) {
  return typeof id === 'string' ? id.replace(prefix, '') : '';
}

// 辞書に無い駅は、駅IDの末尾（ローマ字）をそのまま表示する。HTMLに埋め込むためエスケープする
// （ToeiStationName は stationList.js で定義）
function toeiStationNameGet(stationId) {
  const key = toeiIdTail(stationId, 'odpt.Station:');
  return toeiOwnValue(ToeiStationName, key) || escapeHtml(key.split('.').pop());
}
function toeiTrainTypeNameGet(typeId) {
  const key = toeiIdTail(typeId, 'odpt.TrainType:Toei.');
  return toeiOwnValue(ToeiTrainTypeName, key) || escapeHtml(key);
}
function toeiDirectionSet(directionId) {
  return toeiOwnValue(ToeiDirectionMap, toeiIdTail(directionId, 'odpt.RailDirection:')) || '';
}
function toeiOwnerNameGet(ownerId) {
  return toeiOwnValue(ToeiOwnerName, toeiIdTail(ownerId, 'odpt.Operator:')) || '';
}
function toeiOwnerColorGet(ownerId) {
  return toeiOwnValue(ToeiOwnerColorMap, toeiIdTail(ownerId, 'odpt.Operator:')) || ToeiDefaultOwnerColor;
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
function StaGet_Other(pos, line) {
  switch (line) {
    case "aonami":
      {
        const position = pos.replace(/[A-Z]/, '').replace(/0{0,2}/, '').replace(/[A-Z]/, '');
        const staInfo = stations_Central.filter(Aostation => Aostation.kudariJun === position && Aostation.ryokakuSenkuMei === "あおなみ線");
        return staInfo[0].ekiMei;
      }
  }
}

// 駅に停車中（toStation なし）は駅名、駅間を走行中は「前駅～次駅」で表示
function StaGet_Toei(fromStation, toStation) {
  const from = toeiStationNameGet(fromStation);
  if (!toStation) return from;
  return from + "～" + toeiStationNameGet(toStation);
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
  const html = escapeHtml(train.no) + " " + LineMark + DispTypeAddCol + " " + escapeHtml(train.nickname) + " " + escapeHtml(typeChange) + " " + escapeHtml(train.via) + " " + DestAddCol + " " + escapeHtml(train.numberOfCars) + "両 " + delayMinutes + " 走行位置：" + position + direction + escapeHtml(aSeatInfo) + escapeHtml(otherInfo) + escapeHtml(ureSeatInfo);
  return {
    key: 'wu-' + idx,
    className: `kakomi-box3 kakomi-${train.dest.line}`,
    html,
    direction
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
  const html = escapeHtml(train.no) + " " + DispTypeAddCol + escapeHtml(typeChange) + nickname + " " + DestAddCol + " " + delayMinutes + " 走行位置：" + position + direction + escapeHtml(ureSeatInfo);
  return {
    key: 'wo-' + idx,
    className: 'kakomi-box3',
    html,
    direction
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
  const html = escapeHtml(train.trainnumber) + " " + DispTypeAddCol + " " + nickname + " " + DestAddCol + Dest2AddCol + " " + delayMinutes + " 走行位置：" + position + direction;
  return {
    key: 'ce-' + idx,
    className: 'kakomi-box3',
    html,
    direction
  };
}
function cardAonami(train, idx) {
  const line = 'aonami';
  const DispTypeAddCol = AddDispTypeMapCol(train.traintype, line);
  const DestAddCol = AddDestMapCol(train.tostation, line);
  const direction = directionSet(train.locationCol, line);
  const delayMinutes = delayMinutesSet(train.delay);
  const position = StaGet_Other(train.position, line);
  const html = escapeHtml(train.trainnumber) + " " + DispTypeAddCol + " " + DestAddCol + " " + delayMinutes + " 走行位置：" + position + direction;
  return {
    key: 'ao-' + idx,
    className: 'kakomi-box3',
    html,
    direction
  };
}
function cardToei(train, idx) {
  const DispTypeAddCol = AddDispTypeColToei(train.displayType);
  const DestAddCol = AddDestCol(train.dest);
  const owner = toeiOwnerSet(train.owner);
  const direction = train.direction;
  const delayMinutes = delayMinutesSet(train.delayMinutes);
  const position = StaGet_Toei(train.from, train.to);
  const html = escapeHtml(train.no) + " " + DispTypeAddCol + " " + DestAddCol + " " + delayMinutes + " 走行位置：" + position + direction + owner;
  return {
    key: 'to-' + idx,
    className: 'kakomi-box3',
    html,
    direction,
    borderColor: train.ownerColor
  };
}

// 受信JSON全体から、選択された路線の列車カード一覧を生成する（fetchLineTrains の case 'Toei' から呼ばれる）
// 受信JSONは列車の配列、または { statusCode, headers, body: [列車の配列] } の形式のどちらでも受け付ける
function buildCardsToei(body, line) {
  const list = Array.isArray(body) ? body : body && Array.isArray(body.body) ? body.body : null;
  if (!list) return [];
  const trains = list.map(buildTrainToei);
  const regex = new RegExp('[ ]');
  const displine = regex.test(line) ? line.split(' ')[1] : line;
  const trainsFilter = trains.filter(train => train.linename[0].name === displine);
  return trainsFilter.map((t, i) => cardToei(t, i));
}

/* ============================================================
 * 通信先エンドポイント（content.js と同一）
 * ========================================================== */
const LINE_INFO_ENDPOINT = "https://prod-38.japaneast.logic.azure.com:443/workflows/a98ba8e0a5b74390a09eecfc147607fb/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=ku2n91cu38w3igcdPj0abiDvNA4VzC8QZw7kbc4LIGk";

// 連打対策の設定値
const LINE_CACHE_TTL_MS = 30 * 1000; // 取得結果を再利用する期間（この間は路線ボタンの再選択で通信しない）
const REFRESH_COOLDOWN_MS = 10 * 1000; // 更新ボタンの連続押下を受け付けない期間
const LINE_FETCH_TIMEOUT_MS = 20 * 1000; // 応答がない場合に通信を打ち切るまでの時間

// signal: AbortController の signal（新しい取得の開始時・タイムアウト時に通信を中止するために使用）
async function fetchLineTrains(linename, flowType, line, signal) {
  const response = await fetch(LINE_INFO_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      getLineName: linename,
      flowType: flowType
    }),
    signal: signal
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
        // 運行中の列車がない路線は各項目が null のプレースホルダーになるため除外する
        const trainsFilter = trains.filter(t => t.linename[0].name === displine && t.traintype && t.tostation && t.tostation2 && t.nickname);
        return trainsFilter.map((t, i) => cardCentral(t, i));
      }
    case 'Aonami':
      {
        if (!Array.isArray(body)) return [];
        const trains = body.filter(obj => obj.tr && obj.tr.length > 0).map(buildTrainAonami);
        return trains.map((t, i) => cardAonami(t, i));
      }
    case 'Toei':
      return buildCardsToei(body, line);
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

// アイコン（ハンバーガーメニュー）
function MenuIcon() {
  return /*#__PURE__*/React.createElement("svg", {
    className: "h-5 w-5",
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 5h14M3 10h14M3 15h14",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}

// アイコン（閉じる）
function CloseIcon() {
  return /*#__PURE__*/React.createElement("svg", {
    className: "h-5 w-5",
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 5l10 10M15 5L5 15",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}

// アイコン（更新）
function RefreshIcon({
  spinning
}) {
  return /*#__PURE__*/React.createElement("svg", {
    className: `h-4 w-4 ${spinning ? 'animate-spin' : ''}`,
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M16 10a6 6 0 1 1-2-4.47M16 3v4h-4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}

// サイドメニュー内の開閉項目（エリアごとに展開すると路線ボタンが出現する。枠線に色付け、枠内は白／極薄緑）
function AccordionSection({
  title,
  defaultOpen = false,
  badge,
  children
}) {
  const [open, setOpen] = useState(defaultOpen);
  return /*#__PURE__*/React.createElement("div", {
    className: "overflow-hidden rounded-lg border border-emerald-300 bg-white shadow-sm"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOpen(o => !o),
    className: "flex w-full items-center justify-between gap-3 bg-emerald-50 px-3 py-2.5 text-left text-sm font-semibold text-emerald-900 transition-colors hover:bg-emerald-100"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-2"
  }, title, badge != null && /*#__PURE__*/React.createElement("span", {
    className: "rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700"
  }, badge)), /*#__PURE__*/React.createElement(ChevronIcon, {
    open: open
  })), open && /*#__PURE__*/React.createElement("div", {
    className: "border-t border-emerald-100 bg-emerald-50/60 px-3 py-2.5"
  }, children));
}

// 路線／外部リンク ボタン（color指定時は路線ごとの色を使用。disabled 時は押下できない）
function ChipButton({
  label,
  active,
  onClick,
  color,
  disabled = false
}) {
  if (color) {
    const style = active ? {
      backgroundColor: color,
      borderColor: color,
      color: '#fff'
    } : {
      borderColor: color,
      color
    };
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: onClick,
      disabled: disabled,
      style: style,
      className: "rounded-full border bg-white px-3 py-1.5 text-xs sm:text-sm font-medium shadow-sm transition-colors hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
    }, label);
  }
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    disabled: disabled,
    className: "rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 " + (active ? "border-emerald-600 bg-emerald-600 text-white shadow" : "border-emerald-200 bg-emerald-50 text-emerald-800 hover:border-emerald-400 hover:bg-emerald-100")
  }, label);
}

// disabled: 読み込み中は路線ボタンの連打を防ぐため全ボタンを押下不可にする
function ButtonGrid({
  items,
  selectedLine,
  onSelect,
  disabled = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, items.map((item, i) => /*#__PURE__*/React.createElement(ChipButton, {
    key: item.code + '-' + i,
    label: item.line,
    active: selectedLine === item.line,
    onClick: () => onSelect(item),
    color: LineColorMap[item.code] || DEFAULT_LINE_COLOR,
    disabled: disabled
  })));
}
function TrainCard({
  card
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `${card.className}${card.borderColor ? ' kakomi-owner' : ''} rounded-lg border border-slate-200 bg-white p-3 text-sm leading-relaxed shadow-sm`
    // borderColor を持つカード（都営地下鉄など）は、ホバー時だけ枠線を所有会社の色にする（色は re-style.css の .kakomi-owner:hover が参照）
    ,
    style: card.borderColor ? {
      '--owner-color': card.borderColor
    } : undefined,
    dangerouslySetInnerHTML: {
      __html: card.html
    }
  });
}

// ヘッダー：スマホ用メニュー開閉ボタン・タイトル・現在時刻
function AppHeader({
  onToggleMenu
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "sticky top-0 z-20 bg-gradient-to-r from-slate-900 via-emerald-900 to-slate-900 shadow-md"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mx-auto flex max-w-7xl items-center gap-3 px-4 py-3"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onToggleMenu,
    className: "rounded-lg p-2 text-white transition-colors hover:bg-white/10 lg:hidden",
    "aria-label": "メニューを開閉"
  }, /*#__PURE__*/React.createElement(MenuIcon, null)), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-white sm:text-xl"
  }, "列車走行位置ビューア"), /*#__PURE__*/React.createElement(Clock, null))));
}

// サイドメニュー：スマホは初期非表示のオフキャンバス（背景タップで閉じる）、PCは常時表示
function SideMenu({
  open,
  onClose,
  selectedLine,
  onSelectLine,
  onOpenInfoLink,
  disabled = false
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, open && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-30 bg-slate-900/50 lg:hidden",
    onClick: onClose
  }), /*#__PURE__*/React.createElement("aside", {
    className: "fixed inset-y-0 left-0 z-40 w-[300px] max-w-[85vw] transform overflow-y-auto bg-slate-100 p-4 shadow-xl transition-transform duration-300 ease-in-out " + "lg:static lg:z-auto lg:w-auto lg:max-w-none lg:translate-x-0 lg:overflow-visible lg:bg-transparent lg:p-0 lg:shadow-none " + (open ? "translate-x-0" : "-translate-x-full")
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-3 flex items-center justify-between lg:hidden"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-semibold text-emerald-800"
  }, "メニュー"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    className: "rounded-lg p-1.5 text-emerald-700 hover:bg-emerald-100",
    "aria-label": "メニューを閉じる"
  }, /*#__PURE__*/React.createElement(CloseIcon, null))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2"
  }, /*#__PURE__*/React.createElement(AccordionSection, {
    title: "更新情報（2026/10/29）",
    defaultOpen: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-1 text-sm text-slate-700"
  }, /*#__PURE__*/React.createElement("div", null, "都営エリアを追加しました。"))), /*#__PURE__*/React.createElement(AccordionSection, {
    title: "運行情報リンク（外部リンク）",
    defaultOpen: false,
    badge: OperationInfoPages.length
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, OperationInfoPages.map((item, i) => /*#__PURE__*/React.createElement(ChipButton, {
    key: item.code + i,
    label: item.line,
    onClick: () => onOpenInfoLink(item)
  })))), /*#__PURE__*/React.createElement(AccordionSection, {
    title: "JRW 近畿エリア",
    defaultOpen: false,
    badge: KinkiAreaLine.length
  }, /*#__PURE__*/React.createElement(ButtonGrid, {
    items: KinkiAreaLine,
    selectedLine: selectedLine,
    onSelect: onSelectLine,
    disabled: disabled
  })), /*#__PURE__*/React.createElement(AccordionSection, {
    title: "JRW 岡山エリア",
    defaultOpen: false,
    badge: OkayamaAreaLine.length
  }, /*#__PURE__*/React.createElement(ButtonGrid, {
    items: OkayamaAreaLine,
    selectedLine: selectedLine,
    onSelect: onSelectLine,
    disabled: disabled
  })), /*#__PURE__*/React.createElement(AccordionSection, {
    title: "JRW 広島/下関エリア",
    defaultOpen: false,
    badge: HiroSekiAreaLine.length
  }, /*#__PURE__*/React.createElement(ButtonGrid, {
    items: HiroSekiAreaLine,
    selectedLine: selectedLine,
    onSelect: onSelectLine,
    disabled: disabled
  })), /*#__PURE__*/React.createElement(AccordionSection, {
    title: "JRW 山陰エリア",
    defaultOpen: false,
    badge: SaninAreaLine.length
  }, /*#__PURE__*/React.createElement(ButtonGrid, {
    items: SaninAreaLine,
    selectedLine: selectedLine,
    onSelect: onSelectLine,
    disabled: disabled
  })), /*#__PURE__*/React.createElement(AccordionSection, {
    title: "JRC 全エリア",
    defaultOpen: false,
    badge: CentralAreaLine.length
  }, /*#__PURE__*/React.createElement(ButtonGrid, {
    items: CentralAreaLine,
    selectedLine: selectedLine,
    onSelect: onSelectLine,
    disabled: disabled
  })), /*#__PURE__*/React.createElement(AccordionSection, {
    title: "都営エリア",
    defaultOpen: false,
    badge: ToeiAreaLine.length
  }, /*#__PURE__*/React.createElement(ButtonGrid, {
    items: ToeiAreaLine,
    selectedLine: selectedLine,
    onSelect: onSelectLine,
    disabled: disabled
  })))));
}

// 選択中の路線名と更新ボタン（枠線・背景は選択中の路線カラーで装飾）
// refreshLocked: 更新ボタンの連続押下を防ぐクールダウン中
function SelectedLineBar({
  selectedLine,
  selectedCode,
  loading,
  refreshLocked,
  onRefresh
}) {
  const lineColor = selectedCode ? LineColorMap[selectedCode] || DEFAULT_LINE_COLOR : null;
  const canRefresh = !loading && !refreshLocked;
  return /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 shadow-sm transition-colors " + (lineColor ? "" : "border-slate-200 bg-white"),
    style: lineColor ? {
      borderColor: lineColor,
      backgroundColor: `color-mix(in srgb, ${lineColor} 12%, white)`
    } : undefined
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-slate-500"
  }, "選択中の路線"), /*#__PURE__*/React.createElement("div", {
    className: "text-lg font-semibold text-slate-800"
  }, selectedLine || "路線を選択してください")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onRefresh,
    disabled: !selectedCode || !canRefresh,
    title: refreshLocked && !loading ? "連続更新を防ぐため、しばらくお待ちください" : undefined,
    style: lineColor && canRefresh ? {
      backgroundColor: lineColor
    } : undefined,
    className: "inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-white shadow transition-colors disabled:cursor-not-allowed disabled:bg-slate-300 " + (lineColor && canRefresh ? "hover:opacity-90" : "bg-emerald-600 hover:bg-emerald-500")
  }, /*#__PURE__*/React.createElement(RefreshIcon, {
    spinning: loading
  }), "更新"));
}

// 進行方向（上り／下り）ごとの列車カード一覧
function DirectionColumn({
  label,
  cards
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-sm font-semibold text-emerald-700"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rounded-full bg-emerald-100 px-2 py-0.5"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "（", cards.length, "件）")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 gap-3 lg:grid-cols-2"
  }, cards.map(card => /*#__PURE__*/React.createElement(TrainCard, {
    key: card.key,
    card: card
  }))));
}

// 結果表示領域：読み込み中／エラー／該当なし／列車一覧のいずれかを表示
function TrainResultPanel({
  loading,
  errorMsg,
  hasSelection,
  cards
}) {
  // 進行方向（上り/下り）で表示領域を左右に分ける
  const upCards = cards.filter(card => card.direction === '上り');
  const downCards = cards.filter(card => card.direction === '下り');
  if (loading) {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-6 text-slate-500 shadow-sm"
    }, /*#__PURE__*/React.createElement("span", {
      className: "h-4 w-4 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent"
    }), "・・・読み込み中・・・");
  }
  if (errorMsg) {
    return /*#__PURE__*/React.createElement("div", {
      className: "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm"
    }, "エラーが発生しました：", errorMsg);
  }
  if (cards.length > 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-3 sm:gap-4"
    }, /*#__PURE__*/React.createElement(DirectionColumn, {
      label: "上り",
      cards: upCards
    }), /*#__PURE__*/React.createElement(DirectionColumn, {
      label: "下り",
      cards: downCards
    }));
  }
  // 路線選択済みで表示できる列車がない場合（路線未選択時は何も表示しない）
  if (hasSelection) {
    return /*#__PURE__*/React.createElement("div", {
      className: "rounded-xl border border-slate-200 bg-white px-4 py-6 text-slate-500 shadow-sm"
    }, "該当する列車情報がありません。");
  }
  return null;
}

// アプリ本体：状態管理と、各表示コンポーネントの組み立て
function App() {
  const [selectedLine, setSelectedLine] = useState(null);
  const [selectedCode, setSelectedCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [cards, setCards] = useState([]);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [refreshLocked, setRefreshLocked] = useState(false); // 更新ボタンのクールダウン中
  const requestSeq = useRef(0);
  const currentItemRef = useRef(null); // 更新ボタンでの再取得用に現在表示中の路線を保持
  const cacheRef = useRef(new Map()); // 路線ごとの取得結果のキャッシュ（キー：路線名）
  const abortRef = useRef(null); // 通信中の AbortController
  const lockTimerRef = useRef(null); // 更新ボタンのクールダウン解除タイマー

  // 画面を閉じるとき、通信とタイマーを後始末する
  useEffect(() => () => {
    if (abortRef.current) abortRef.current.abort();
    clearTimeout(lockTimerRef.current);
  }, []);

  // force: true の場合はキャッシュを使わず必ず取得する（更新ボタン用）
  const loadLineTrains = useCallback(async (item, force = false) => {
    currentItemRef.current = item;
    setSelectedLine(item.line);
    setSelectedCode(item.code);
    setErrorMsg(null);

    // 新しい取得結果が残っていれば、通信せずにそれを表示する
    const cached = cacheRef.current.get(item.line);
    if (!force && cached && Date.now() - cached.at < LINE_CACHE_TTL_MS) {
      if (abortRef.current) abortRef.current.abort();
      ++requestSeq.current;
      setCards(cached.cards);
      setLoading(false);
      return;
    }

    // 通信中のものがあれば中止し、今回の取得に切り替える
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, LINE_FETCH_TIMEOUT_MS);
    const seq = ++requestSeq.current;
    setLoading(true);
    setCards([]);
    // 更新ボタンは一定時間、連続して押せないようにする
    setRefreshLocked(true);
    clearTimeout(lockTimerRef.current);
    lockTimerRef.current = setTimeout(() => setRefreshLocked(false), REFRESH_COOLDOWN_MS);
    try {
      const result = await fetchLineTrains(item.code, item.flowType, item.line, controller.signal);
      cacheRef.current.set(item.line, {
        at: Date.now(),
        cards: result
      });
      if (requestSeq.current === seq) {
        setCards(result);
      }
    } catch (error) {
      if (requestSeq.current === seq) {
        if (error.name === 'AbortError') {
          // 中止のうち、画面に知らせるのはタイムアウトのみ（新しい取得への切り替え時は何もしない）
          if (timedOut) setErrorMsg("通信がタイムアウトしました。しばらくしてからもう一度お試しください。");
        } else {
          console.error(error.message);
          setErrorMsg(error.message);
        }
      }
    } finally {
      clearTimeout(timer);
      if (requestSeq.current === seq) {
        setLoading(false);
      }
    }
  }, []);

  // 路線ボタンは選択の切り替えのみを行う（同じ路線を再取得したい場合はメイン領域の更新ボタンを使う）
  const handleSelectLine = useCallback(item => {
    if (loading) return;
    if (currentItemRef.current && currentItemRef.current.line === item.line) return;
    loadLineTrains(item);
    setSideMenuOpen(false);
  }, [loadLineTrains, loading]);
  const handleRefresh = useCallback(() => {
    if (loading || refreshLocked) return;
    if (currentItemRef.current) {
      loadLineTrains(currentItemRef.current, true);
    }
  }, [loadLineTrains, loading, refreshLocked]);
  const handleOpenInfoLink = useCallback(item => {
    switch (item.area) {
      case 'JRW':
        window.open('https://trafficinfo.westjr.co.jp/' + item.code + '.html', '_blank', 'noopener,noreferrer');
        break;
      case 'JRC':
        window.open('https://traininfo.jr-central.co.jp/' + item.code + '/index.html?lang=ja', '_blank', 'noopener,noreferrer');
        break;
    }
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-slate-100"
  }, /*#__PURE__*/React.createElement(AppHeader, {
    onToggleMenu: () => setSideMenuOpen(o => !o)
  }), /*#__PURE__*/React.createElement("main", {
    className: "mx-auto max-w-7xl grid grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[340px_1fr]"
  }, /*#__PURE__*/React.createElement(SideMenu, {
    open: sideMenuOpen,
    onClose: () => setSideMenuOpen(false),
    selectedLine: selectedLine,
    onSelectLine: handleSelectLine,
    onOpenInfoLink: handleOpenInfoLink,
    disabled: loading
  }), /*#__PURE__*/React.createElement("section", {
    className: "flex flex-col gap-4"
  }, /*#__PURE__*/React.createElement(SelectedLineBar, {
    selectedLine: selectedLine,
    selectedCode: selectedCode,
    loading: loading,
    refreshLocked: refreshLocked,
    onRefresh: handleRefresh
  }), /*#__PURE__*/React.createElement(TrainResultPanel, {
    loading: loading,
    errorMsg: errorMsg,
    hasSelection: !!selectedCode,
    cards: cards
  }))));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
