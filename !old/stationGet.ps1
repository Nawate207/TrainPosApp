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
$url = "https://prod-16.japaneast.logic.azure.com:443/workflows/4f5aa1095c784e90a1d870f577c8a8d4/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=civI5EOthUyDpnCFbocM93hHeMYTl-Jo1z6FIDL7JTU"

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
