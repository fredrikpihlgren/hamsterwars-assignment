const isObject = require('../modules/is-object.js');

async function postData(db, dbname, req, res, object, paramcheckers) {

	let status=isObject(object, "", 'POST', paramcheckers);
    if (!status.objStatus) {
        res.status(400).send(status.errmsg);
        return;
    }
    const docRef = await db.collection(dbname).add(object);
    res.status(200).send({ id: docRef.id });
}

module.exports = postData;