const isObject = require('../modules/is-object.js');

async function putData(db, dbname, req, res, object, paramcheckers) {

	const id = req.params.id;
    const docRef = await db.collection(dbname).doc(id).get();

    
    let status=isObject(object, "", 'PUT', paramcheckers);
    if (!status.objStatus) {
        res.status(400).send(status.errmsg);
        return;
    }
    if (Object.keys(object).length === 0) {
        res.status(400).send("Object cannot be empty.");
        return;
    }

    if (!docRef.exists) {
        res.status(404).send('Object does not exist');
        return
    }
    
    const docRef2 = await db.collection(dbname).doc(id).set(object, {merge: true});
    res.status(200).send(id+' updated with success.');
	
}

module.exports = putData;