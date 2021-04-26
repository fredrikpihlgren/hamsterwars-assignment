const isObject = require('../modules/is-object.js');

async function postData(db, req, res) {
	//OBS! måste installera express.json för att detta ska funka
	const object = req.body;

	let status=isObject(object, "");
    if (!status.objStatus) {
        res.status(400).send(status.errmsg);
        return;
    }
    const docRef = await db.collection('hamstrar').add(object);
    res.status(200).send({ id: docRef.id });
}

module.exports = postData;