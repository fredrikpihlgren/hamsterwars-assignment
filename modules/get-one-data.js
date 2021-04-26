
async function getOneData(id, db, dbname, titel, req, res, myItem) {
    const docRef = await db.collection(dbname).doc(id).get();

    if (!docRef.exists) {
        res.status(404).send(titel+' does not exist');
        return
    }

    const data = docRef.data();
	myItem.push(data);
    //res.send(data);
	return data;
}

module.exports = getOneData;