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

function headerDate(){
    //
}