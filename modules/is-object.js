
function isObject(object, err_details) {
    if (!object) {
        err_details+="is not a valid object\n";
        return {objStatus: false, errmsg: err_details}
    }
    else {
        var checkInput;
        switch (checkInput) {
            case object.name: err_details+="Object must have a name.\n"; break;
            case object.age: err_details+="Object must be of an age.\n"; break;
            case object.favFood: err_details+="Object must have a favorite food.\n"; break;
            case object.loves: err_details+="Object must love something.\n"; break;
            case object.imgName: err_details+="Object must have an image.\n"; break;
            case object.wins: err_details+="Object must have a win-variable.\n"; break;
            case object.defeats: err_details+="Object must have a defeat-variable.\n"; break;
            case object.games: err_details+="Object must have a games-variable.\n"; break;
        }
        if (err_details.length > 0) {
            return {objStatus: false, errmsg: err_details}
        }
        else return {objStatus: true, errmsg: err_details}
    }
    return {objStatus: true, errmsg: err_details}
}



module.exports = isObject;