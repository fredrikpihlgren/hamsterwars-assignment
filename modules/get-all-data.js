const sortData = require('../modules/sort-data.js');

async function getAllData(db, items, dbname, req, res, calltype) {
	//console.log(items, dbname, req, res);
	const myRef = db.collection(dbname);
    const snapshot = await myRef.get();
    let return_array=true;

    if (snapshot.empty) {
        //res.send([]);
        res.status(404).send('No objects were found.');
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
        return_array=false;
        res.status(200).send(items[randomNumber]);
        return items[randomNumber];
    }
    else if (calltype == 'winners' || calltype == 'losers') {
        //data in, type (string, 'wins'/'defeats'), max number of objects to be listed
        let sortedArray=sortData(items, calltype, 5);
        if (sortedArray.length <= 0) {
            res.status(404).send('No '+calltype+' were found.');
            return;
        }
    }
    if (return_array) {
	    res.status(200).send(items);
	    return items;
    }

}



module.exports = getAllData;