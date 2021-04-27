

async function getAllData(db, items, dbname, req, res, calltype) {
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
    if (calltype == 'random') {
        let randomNumber=Math.floor(Math.random() * items.length);
        //console.log(items.length, items);
        console.log(items[randomNumber]);
        res.status(200).send(items[randomNumber]);
        return items[randomNumber];
    }
    else {
	    res.status(200).send(items);
	    return items;
    }

}



module.exports = getAllData;