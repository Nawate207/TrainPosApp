const area = document.getElementById('area').innerText;
window.addEventListener('load', () => {
    //サイドメニューのボタン出力
    switch (area) {
        case '近畿エリア': AreaArray.splice(0, 1);
            AreaArray.map(k => areaButton(k.code, k.area, k.url.replace('public/', './')));
            KinkiAreaLine.map(k => lineButton(k.code, k.line));
            //配列にtype=0みたいに識別子をつけて、その番号によって実行する関数を変更すれば1ページに近畿エリア全部入るのでは？
            break;
        case '北陸・近畿2エリア': AreaArray.splice(1, 1);
            AreaArray.map(k => areaButton(k.code, k.area, k.url.replace('public/', './')));
            Kinki2AreaLine.map(k => lineButton(k.code, k.line));
            break;
        case '岡山・福山エリア': AreaArray.splice(2, 1);
            AreaArray.map(k => areaButton(k.code, k.area, k.url.replace('public/', './')));
            OkayamaAreaLine.map(k => lineButton(k.code, k.line));
            break;
        case '広島・下関エリア': AreaArray.splice(3, 1);
            AreaArray.map(k => areaButton(k.code, k.area, k.url.replace('public/', './')));
            HiroSekiAreaLine.map(k => lineButton(k.code, k.line));
            break;
        case '山陰エリア': AreaArray.splice(4, 1);
            AreaArray.map(k => areaButton(k.code, k.area, k.url.replace('public/', './')));
            SaninAreaLine.map(k => lineButton(k.code, k.line));
            break;
        case '東海エリア': AreaArray.splice(5, 1);
            AreaArray.map(k => areaButton(k.code, k.area, k.url.replace('public/', './')));
            CentralAreaLine.map(k => lineButton(k.code, k.line));
            break;
        case '運用検索ページ':
            AreaArray.map(k => areaButton(k.code, k.area, k.url.replace('public/', './')));
            UnyoList.map(k => unyoButton(k.code, k.name));
            break;
        case 'TrainPos/InfoSearch App':
            AreaArray.map(k => areaButton(k.code, k.area, k.url));
            break;
        default:
            AreaArray.map(k => areaButton(k.code, k.area, k.url.replace('public/', './')));
            break;
    }
    if (area === '運用検索ページ') {
        sideBtnArray.splice(0, 1);
        sideBtnArray.map(k => infoButton(k.areaName, k.url, k.value));
    } else if (area === '運用表') {
        sideBtnArray.splice(1, 1);
        sideBtnArray.map(k => infoButton(k.areaName, k.url, k.value));
    }
    else {
        sideBtnArray.map(k => infoButton(k.areaName, k.url, k.value));
    }
}, false);

/**
 * 
 * @param {String} areaName 
 * @param {String} url 
 * @param {String} value 
 */
function infoButton(areaName, url, value) {
    const outputArea = document.getElementById(areaName);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'button';
    button.onclick = function () {
        switch (area) {
            case 'TrainPos/InfoSearch App':
                if (value === '運用検索ページ' || value === '運用表') location.href = url;
                else window.open(url, '_blank');
                break;
            default:
                if (value === '運用検索ページ' || value === '運用表') location.href = url.replace('public/', './');
                else window.open(url, '_blank');
        }
    }
    button.innerText = value;
    outputArea.appendChild(button);
}

/**
 * 
 * @param {String} code 
 * @param {String} area 
 * @param {String} url 
 */
function areaButton(code, area, url) {
    const outputArea = document.getElementById('areaSelect');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `button ${code}`;
    button.onclick = function () {
        location.href = url;
    }
    button.innerText = area;
    outputArea.appendChild(button);
}

/**
 * 
 * @param {String} code 
 * @param {String} line 
 */
function lineButton(code, line) {
    const outputArea = document.getElementById('lineSelect');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `button ${code}`;
    button.name = 'word';
    button.onclick = function () {
        getData(code);
    }
    button.innerText = line;
    outputArea.appendChild(button);
}

/**
 * 
 * @param {String} code 
 * @param {String} name 
 */
function unyoButton(code, name) {
    const outputArea = document.getElementById('sishoBtn');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `button ${code}`;
    button.name = 'word';
    button.onclick = function () {
        getData(code);
    };
    button.innerText = name;
    outputArea.appendChild(button);
}
