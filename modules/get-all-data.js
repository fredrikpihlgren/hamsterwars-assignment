

async function getAllData(db, items, dbname, req, res) {
	//console.log(items, dbname, req, res);
	const myRef = db.collection(dbname);
    const snapshot = await myRef.get();

    if (snapshot.empty) {
        //res.send([]);
        res.status(404).send('No hamsters were found.');
        return;
    }

    snapshot.forEach(doc => {
        const data = doc.data();
        data.id = doc.id;
        items.push(data);
    });
	//res.status(200).send(items);
	return items;

}



module.exports = getAllData;