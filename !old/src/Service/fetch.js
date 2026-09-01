const elem = document.getElementById('elem');

/**
 * 
 * @param {String} line 
 */
async function getData(line) {
    elem.innerHTML = "<div class='nowloading'>読み込み中</div>";
    const area = document.getElementById('area');
    let params = new URLSearchParams();
    params.set('word', line);
    if (area.innerText === '東海エリア') {
        const result = await fetchTrain('lineC.php?', params.toString());
        const trains = result.lst.map(buildTrainC);
        viewTrainsC(trains);
    } else if (area.innerText === '運用検索ページ') {
        const result = await fetchTrain('jsonGet.php?', params.toString());
        const unyo = result.Unyo.map(buildUnyo);
        viewUnyo(unyo);
        document.getElementById("form").addEventListener('click', () => search(unyo));
    } else {
        const result = await fetchTrain('line.php?', params.toString());
        if (area.innerText === "近畿エリア") {
            const trains = result.trains.map(buildTrain);
            viewTrains(trains);
        } else {
            const trains = result.trains.map(buildTrainOther);
            viewTrainsOther(trains);
        }
    }
}

/**
 * 
 * @param {String} request 
 * @param {*} param 
 */
async function fetchTrain(request, param) {
    try {
        const result = await fetch(request + param, {
        // const result = await fetch("../../public/line.php?word=kyoto", {
            method: 'GET',
            mode: 'cors',
            header: 'Content-Type: application/json',
            cache: 'no-cache',
            credentials: 'same-origin',
        });
        if (!result.ok) {
            throw new Error("error");
        }
        const resultData = await result.json();
        return resultData;
    } catch (e) {
        elem.innerText = e.message;
        throw e;
    }
}
