// 呼び出しを許可する (flowType, getLineName) の組み合わせ。
// 値は、画面側（re-content.jsx の *AreaLine）の路線定義と同じ。路線を追加したら、ここにも追加する。
// 許可リストに無い値は、上流（Logic Apps）へ一切転送しない。

const ALLOWED = new Map<string, ReadonlySet<string>>([
    ['KinkiUrban', new Set([
        'hokurikubiwako', 'kyoto', 'kobesanyo', 'ako', 'kosei', 'osakahigashi', 'takarazuka', 'tozai',
        'gakkentoshi', 'osakaloop', 'yumesaki', 'yamatoji', 'hanwahagoromo', 'kansaiairport',
    ])],
    ['JrwOther', new Set([
        'hokuriku', 'kusatsu', 'nara', 'sagano', 'sanin1', 'sanin2', 'fukuchiyama', 'bantan', 'maizuru',
        'wakayama1', 'wakayama2', 'manyomahoroba', 'kansai', 'kinokuni',
        'unominato', 'setoohashi', 'ako2', 'sanyo1', 'tsuyama', 'hakubi1', 'fukuen1',
        'kabe', 'sanyo2', 'sanyo3', 'geibi1', 'kure', 'yamaguchi',
        'sanin3', 'imbi1', 'sanin4', 'hakubi2',
    ])],
    ['Jrc', new Set([
        'zaisenichijoho_10001', 'zaisenichijoho_10011', 'zaisenichijoho_10013', 'zaisenichijoho_10012',
        'zaisenichijoho_10010', 'zaisenichijoho_10002', 'zaisenichijoho_10003', 'zaisenichijoho_10004',
        'zaisenichijoho_10005', 'zaisenichijoho_10006', 'zaisenichijoho_10007', 'zaisenichijoho_10009',
        'zaisenichijoho_10008', 'zaisenichijoho_99999',
    ])],
    ['Aonami', new Set(['Aonami'])],
    ['Toei', new Set(['1', '2', '3', '4'])],
]);

/** 許可された (flowType, getLineName) の組み合わせなら true。型・長さ・内容をすべて検証する */
export function isAllowedLine(flowType: unknown, lineName: unknown): flowType is string {
    if (typeof flowType !== 'string' || typeof lineName !== 'string') return false;
    const codes = ALLOWED.get(flowType);
    return codes !== undefined && codes.has(lineName);
}
