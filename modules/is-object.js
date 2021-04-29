
function isObject(object, err_details, type, paramcheckers) {
    let sendstat=false;
    if (!object) {
        err_details+="is not a valid object";
    }
    else {

        if (type == 'PUT') {
            for (let i=0;i<paramcheckers.length;i++) {
                let looptype=typeof(paramcheckers[i].type);
                if (looptype !== 'undefined') {
                    if (paramcheckers[i].type.length <= 0) { 
                        console.log(paramcheckers[i], ' will be checked');
                            err_details+='Lines cannot be blank.\n';
                    }
                    else {
                        if (typeof(paramcheckers[i].type) !== paramcheckers[i].val) {
                            err_details+=paramcheckers[i].type+' must be a '+paramcheckers[i].val;
                        }
                    }
                }
            }
        }
        else {

            for (let i=0;i<paramcheckers.length;i++) {
                let looptype=typeof(paramcheckers[i].type);
                if (looptype === 'undefined') {
                        err_details+=paramcheckers[i].mess+'\n';
                }
                else {
                    if (paramcheckers[i].type.length <= 0) {
                        err_details+='Lines cannot be blank.\n';
                    }
                    else {
                        if (typeof(paramcheckers[i].type) !== paramcheckers[i].val) {
                            err_details+=paramcheckers[i].type+' must be a '+paramcheckers[i].val;
                        }
                    }
                }
            }

        }

        if (!err_details.length > 0) {
            sendstat=true;
        }
    }
    return {objStatus: sendstat, errmsg: err_details}
}



module.exports = isObject;

