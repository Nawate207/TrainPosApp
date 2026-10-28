$lineOther = @(
    "hokuriku",
    "kusatsu",
    "nara",
    "sagano",
    "sanin1",
    "sanin2",
    "sanin3",
    "sanin4",
    "fukuchiyama",
    "bantan",
    "maizuru",
    "wakayama1",
    "wakayama2",
    "manyomahoroba",
    "kansai",
    "kinokuni",
    "unominato",
    "setoohashi",
    "ako2",
    "sanyo1",
    "sanyo2",
    "sanyo3",
    "tsuyama",
    "hakubi1",
    "hakubi2",
    "fukuen1",
    "kabe",
    "geibi1",
    "kure",
    "yamaguchi",
    "imbi1"
)
# Logic Apps の署名付き URL はコードに埋め込まない。環境変数 TRAINPOS_STATION_URL に設定してから実行する
$url = $env:TRAINPOS_STATION_URL
if ([string]::IsNullOrEmpty($url)) { throw "環境変数 TRAINPOS_STATION_URL に Logic Apps の URL を設定してください" }

$lineUrban = @(
    "hokurikubiwako",
    "kyoto",
    "kobesanyo",
    "ako",
    "kosei",
    "osakahigashi",
    "takarazuka",
    "tozai",
    "gakkentoshi",
    "osakaloop",
    "yumesaki",
    "yamatoji",
    "hanwahagoromo",
    "kansaiairport"
)

foreach($line in $lineUrban){
    Write-Host $line
    $body = ConvertTo-Json -InputObject @{getLineName=$line;pos="0000_####"}
    $response = Invoke-WebRequest -Uri $url -Method POST -ContentType "application/json" -Body $body
}
