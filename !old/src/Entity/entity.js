/**
 * 
 * @param {*} obj 
 * @return {Train}
 */
function buildTrain(obj) { //jsonから取得した各要素について？？？
    const train = new Train();
    train.dest = buildDestination(obj["dest"]);
    train.direction = obj["direction"];
    train.displayType = obj["displayType"];
    train.delayMinutes = obj["delayMinutes"];
    train.nickname = obj["nickname"];
    train.no = obj["no"];
    train.numberOfCars = obj["numberOfCars"];
    train.pos = obj["pos"];
    train.type = obj["type"];
    train.typeChange = obj["typeChange"];
    train.via = obj["via"];
    return train;
}

/**
 * 
 * @param {*} obj
 * @return {Destination}
 */
function buildDestination(obj) {
    return new Destination(obj["code"], obj["line"], obj["text"]);
}

class Train {
    constructor() {
        this.no = "";
        this.dest = {};
        this.direction = 0;
        this.displayType = "";
        this.delayMinutes = 0;
        this.nickname = "";
        this.numberOfCars = 0;
        this.pos = "";
        this.type = "";
        this.typeChange = "";
        this.via = "";
    }
}

class Destination {
    constructor(code, line, text) {
        this.code = code;
        this.line = line;
        this.text = text;
    }
}



/**
 * 
 * @param {*} obj 
 * @return {Train}
 */
function buildTrainOther(obj) { //jsonから取得した各要素について？？？
    const train = new TrainOther();
    train.dest = obj["dest"];
    train.direction = obj["direction"];
    train.delayMinutes = obj["delayMinutes"];
    train.displayType = obj["displayType"];
    train.nickname = obj["nickname"];
    train.no = obj["no"];
    train.pos = obj["pos"];
    train.type = obj["type"];
    train.notice = obj["notice"];
    return train;
}

class TrainOther {
    constructor() {
        this.no = "";
        this.dest = "";
        this.direction = 0;
        this.displayType = "";
        this.delayMinutes = 0;
        this.nickname = "";
        this.pos = "";
        this.type = "";
        this.notice = "";
    }
}


/**
 * 
 * @param {*} obj 
 * @return {Train}
 */
function buildTrainC(obj) { //jsonから取得した各要素について？？？
    const train = new TrainC();
    train.dest = obj["yukisaki"];
    train.direction = obj["jogeKbn"];
    train.delayMinutes = obj["chienJifun"];
    train.displayType = obj["resshaShubetsuMei"];
    train.nickname = obj["aishoMei"];
    train.no = obj["resshaBng"];
    train.pos = obj["ryokakuEkiCd"];
    train.ekikanKbn = obj["ekiEkikanKbn"];
    return train;
}

class TrainC {
    constructor() {
        this.no = "";
        this.dest = "";
        this.direction = 0;
        this.displayType = "";
        this.delayMinutes = 0;
        this.nickname = "";
        this.pos = "";
        this.ekikanKbn = 0;
    }
}

/**
 * 
 * @param {*} obj 
 * @return {Train}
 */
function buildUnyo(obj) { //jsonから取得した各要素について？？？
    const unyo = new Unyo();
    unyo.UnyoNo = obj["UnyoNo"];
    unyo.TrainNo = obj["TrainNo"];
    unyo.Position = obj["Position"];
    unyo.Type = obj["Type"];
    unyo.TypeChange = obj["TypeChange"];
    unyo.Destination = obj["Destination"];
    unyo.Day = obj["Day"];
    unyo.FirstTime = obj["FirstTime"];
    unyo.EndTime = obj["EndTime"];
    return unyo;
}

class Unyo {
    constructor() {
        this.UnyoNo = "";
        this.TrainNo = "";
        this.Position = "";
        this.Position = "";
        this.Type = "";
        this.TypeChange = "";
        this.Destination = "";
        this.Day = "";
        this.FirstTime = "";
        this.EndTime = "";
    }
}
