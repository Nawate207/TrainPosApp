

/**
 * 
 * @param {string} pos 
 */
function StaGet(pos) {
    const position = pos.split('_');
    const pos1 = posMatch_U(position[0]);
    const pos2 = posMatch_U(position[1]);
    if (pos2[0].name == "") return pos1[0].name;
    else {
        const result = (pos1[0].name + "－" + pos2[0].name);
        return result;
    }
}

/**
 * 
 * @param {string} pos 
 */
function StaGet_other(pos) {
    const position = pos.split('_');
    const pos1 = posMatch_O(position[0]);
    const pos2 = posMatch_O(position[1]);
    if (pos2[0].name == "") return pos1[0].name;
    else {
        const result = (pos1[0].name + "－" + pos2[0].name);
        return result;
    }
}

/**
 * 
 * @param {*} pos 
 * @param {*} ekikanKbn 
 */
function StaGet_Central(pos, ekikanKbn) {
    if (ekikanKbn == 1) {
        const position = posMatch_C(pos);
        return position[0].name;
    }
    else if (ekikanKbn == 2) {
        const position = posMatch_C(pos);
        return position[0].name + " 付近 ";
    }
}

/**
 * 
 * @param {*} pos 
 */
function posMatch_O(pos_o) {
    return stations_other.filter(Ostation => {
        if (Ostation.code === pos_o) return Ostation;

    });
}


/**
 * 
 * @param {*} pos 
 */
function posMatch_U(pos_u) {
    return stations_urban.filter(Ustation => {
        if (Ustation.code === pos_u) return Ustation;

    });
}

/**
 * 
 * @param {string} pos_C
 */
function posMatch_C(pos_C) {
    return stations_Central.filter(Cstation => {
        if (Cstation.code === pos_C) {
            return Cstation.name;
        }
    });
}
