function search(obj){
        const searchText = formfunc();
        const searchResult = searchUnyo(searchText[0], obj);
        const searchResult1 = searchTrainNo(searchText[1], searchResult);
        const searchResult2 = searchType(searchText[2], searchResult1);
        const searchResult3 = searchDest(searchText[3], searchResult2);
        const searchResult4 = searchDay(searchText[4], searchResult3);
        viewUnyo(searchResult4);
}

/**
 * 
 * @param {string} 
 */
function formfunc() {
    const UnyoNo_text = document.forms.Unyo_Search.Unyo_Text.value;
    const TrainNo_text = document.forms.Unyo_Search.TrainNo_Text.value;
    const Type_text = document.forms.Unyo_Search.Type_Text.value;
    const Dest_text = document.forms.Unyo_Search.Dest_Text.value;
    const Day_text = document.forms.Unyo_Search.Day_Text.value;
    return array = [UnyoNo_text, TrainNo_text, Type_text, Dest_text, Day_text];
}

/**
 * 
 * @param {Train} train 
 * @return {HTMLElement}
 */
function trainElement(train) {
    // const text = `${train.UnyoNo} ${train.TrainNo}${train.Position} ${train.Type} ${train.Destination}行き ${train.FirstTime} ${train.EndTime} ${train.Day}`;
    const TypeAddCol = AddDispTypeCol(train.Type);
    const DestAddCol = AddDestCol(train.Destination);
    const elem = document.createElement('div');
    elem.className = 'kakomi-box3';
    // elem.innerText = text;
    elem.innerHTML = train.UnyoNo + " " + train.TrainNo + train.Position + " " + TypeAddCol + " " + train.TypeChange + " " + DestAddCol + " " + train.FirstTime + " " + train.EndTime + " " + train.Day;
    return elem;
}

/**
 * 
 * @param {Train[]} trains 
 */
function viewUnyo(trains) {
    const elem = document.getElementById("elem");
    while (child = elem.firstChild) elem.removeChild(child);
    const trainElems = trains.map(trainElement);
    trainElems.forEach(element => {
        elem.appendChild(element);
    });
}

/**
 * 
 * @param {string} text 
 * @param {Train[]} trains 
 * @return {Train[]}
 */
function searchUnyo(text, trains) {
    return trains.filter(train => {
        if (train.UnyoNo === text) return train.UnyoNo;
        else if (text === "") return train.UnyoNo;
    });
}

/**
 * 
 * @param {string} text 
 * @param {Train[]} trains 
 * @return {Train[]}
 */
function searchTrainNo(text, trains) {
    return trains.filter(train => {
        // return train.TrainNo.match(text) != null;
        if (train.TrainNo === text) return train.TrainNo;
        else if (text === "") return train.TrainNo;
    });
}

/**
 * 
 * @param {string} text 
 * @param {Train[]} trains 
 * @return {Train[]}
 */
function searchType(text, trains) {
    return trains.filter(train => {
        // return train.Type.match(text) != null;
        if (train.Type === text) return train.Type;
        else if (text === "") return train.Type;
    });
}

/**
 * 
 * @param {string} text 
 * @param {Train[]} trains 
 * @return {Train[]}
 */
function searchDest(text, trains) {
    return trains.filter(train => {
        return train.Destination.match(text) != null;
    });
}

/**
 * 
 * @param {string} text 
 * @param {Train[]} trains 
 * @return {Train[]}
 */
function searchDay(text, trains) {
    return trains.filter(train => {
        return train.Day.match(text) != null;
    });
}
