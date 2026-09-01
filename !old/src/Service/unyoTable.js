window.addEventListener('load', async () => {
    //テーブル生成
    //入力機能付与
    //ヘッダー（1行目）：日付
    //A列：運番リスト（運番クリックで関数実行＝＞行路検索）
    //B列：備考
    //C列以降：充当編成入力欄
    const sishoArray = ['宮支', '明支'];
    const table = document.createElement('table');
    // const tableHead =日付生成関数;
    const tableList = sishoArray.map(k => UnBanList(k));
}, false);

//運番リストの配列を生成する
function UnBanList(Name) {
    // [...Array(100)].map((_, i) => Name + i);
    let array = [];
    let result = [];
    switch (Name) {
        case '宮支':
            array = [...Array(14)].map((_, i) => Name + (i + 501));
            array1 = [...Array(5)].map((_, i) => Name + (i + 531));
            array2 = [...Array(4)].map((_, i) => Name + (i + 551));
            array3 = [...Array(4)].map((_, i) => Name + (i + 601));
            result = array.concat(array1.concat(array2.concat(array3)));
            console.log(result);
            break;
        case '明支':
            array = [...Array(100)].map((_, i) => Name + (i + 1));
            result = array;
            console.log(result);
            break;
    }
}