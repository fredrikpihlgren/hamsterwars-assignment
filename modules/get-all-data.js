const sortData = require('../modules/sort-data.js');

async function getAllData(db, items, dbname, req, res, calltype) {
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
        //console.log(items[randomNumber]);
        return_array=false;
        res.status(200).send(items[randomNumber]);
        return items[randomNumber];
    }
    else if (calltype == '/winners' || calltype == '/losers' || calltype == '/manyMatches' || calltype == '/fewMatches')  {
        let sortedArray=sortData(items, calltype, 5);
        if (sortedArray.length <= 0) {
            res.status(404).send('No '+calltype+' were found.');
            return;
        }
        res.status(200).send(sortedArray);
        return sortedArray;
    }
    if (return_array) {
        if (req.baseUrl == '/matchWinners' || req.baseUrl == '/defeated') {
            let newItems=[];
            for (let i=0;i<items.length;i++) {
                if (req.params.id === items[i].winnerId) {
                    //console.log('object with index '+i+' that had winner id:'+items[i].winnerId+' was deleted.');
                    if (req.baseUrl == '/matchWinners') {newItems.push(items[i]);}
                    else {newItems.push(items[i].loserId);}
                }
            }
            items=newItems;
            if (items.length <= 0) {
                res.status(404).send('No '+calltype+' were found.');
                return;
            }
        }
	    res.status(200).send(items);
	    return items;
    }

}



module.exports = getAllData;