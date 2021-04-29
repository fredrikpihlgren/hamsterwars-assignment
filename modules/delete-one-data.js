
async function deleteOneData(id, db, dbname, req, res) {
	const docRef = await db.collection(dbname).doc(id).get();

    if (!docRef.exists) {
        res.sendStatus(404);
        return;
    }

    console.log(2);

	await db.collection(dbname).doc(id).delete();
	res.status(200).send(id+' was deleted successfully');
	return
}


module.exports = deleteOneData;