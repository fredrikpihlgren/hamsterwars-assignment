
function isObject(object, err_details) { //, type, paramcheckers
    let sendstat=false;
    if (!object) {
        err_details+="is not a valid object";
    }
    else {
        if (!err_details.length > 0) {
            sendstat=true;
        }
    }
    return {objStatus: sendstat, errmsg: err_details}
}



module.exports = isObject;

