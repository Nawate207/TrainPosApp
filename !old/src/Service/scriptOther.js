/**
 * 
 * @param {Train[]} trains 
 */
function viewTrainsOther(trains) {
    const elem = document.getElementById("elem");
    while (child = elem.firstChild) elem.removeChild(child);
    const trainElems = trains.map(trainElementoOther);
    trainElems.forEach(element => {
        elem.appendChild(element);
    });
}

/**
 * 
 * @param {Train} train 
 * @return {HTMLElement}
 */
function trainElementoOther(train) {
    const line = "";
    const DispTypeAddCol = AddDispTypeCol(train.displayType, line);
    const DestAddCol = AddDestCol(train.dest);
    const nickname = nicknameSet(train.nickname);
    const direction = directionSet(train.direction);
    const delayMinutes = delayMinutesSet(train.delayMinutes);
    const position = StaGet_other(train.pos);
    // const text = `${train.no} ${train.displayType}${nickname} ${train.dest}行き ${delayMinutes} 走行位置：${position}${direction}`;
    const text = train.no + " " + DispTypeAddCol + nickname + " " + DestAddCol + "行き " + delayMinutes + " 走行位置：" + position + direction;
    const elem = document.createElement('div');
    elem.className = 'kakomi-box3';
    // elem.innerText = text;
    elem.innerHTML = text;
    return elem;
}
