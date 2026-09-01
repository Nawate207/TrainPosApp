/**
 * 
 * @param {Train[]} trains 
 */
function viewTrains(trains) {
    const elem = document.getElementById("elem");
    while (child = elem.firstChild) elem.removeChild(child);
    const trainElems = trains.map(trainElement);
    trainElems.forEach(element => {
        elem.appendChild(element);
    });
}

/**
 * 
 * @param {Train} train
 * @return {HTMLElement}
 */
function trainElement(train) {
    const DispTypeAddCol = AddDispTypeCol(train.displayType, train.dest.line);
    const DestAddCol = AddDestCol(train.dest.text);
    const LineMark = LineMarkGet(train.dest.line);
    const direction = directionSet(train.direction);
    const delayMinutes = delayMinutesSet(train.delayMinutes);
    const position = StaGet(train.pos);
    // const text = `${train.no} ${train.displayType}${train.nickname} ${train.typeChange} ${train.via} ${train.dest.text}行き ${train.numberOfCars}両 ${delayMinutes} 走行位置：${position}${direction}`;
    const text = train.no + " " + LineMark + DispTypeAddCol + train.nickname + " " + train.typeChange + " " + train.via + " " + DestAddCol + "行き " + train.numberOfCars + "両 " + delayMinutes + " 走行位置：" + position + direction;
    const elem = document.createElement('div');
    // elem.className = 'kakomi-box3';
    elem.className = `kakomi-box3 kakomi-${train.dest.line}`;
    // elem.innerText = text;
    elem.innerHTML = text;
    return elem;
}
