
const getDatabase = require('../database.js');
const db = getDatabase();

const express = require('express');
const router = express.Router();


//** REST API ** 
//GET hamsters
router.get('/', async (req, res) => {
    //console.log('/tools REST API');
    //res.send('/tools REST API');

    const hamsterRef = db.collection('hamstrar');
    const snapshot = await hamsterRef.get();

    if (snapshot.empty) {
        res.send([]);
        return;
    }

    let items = [];
    snapshot.forEach(doc => {
        const data = doc.data();
        data.id = doc.id;
        items.push(data);
    });
    res.send(items);
});


//GET /hamsters/:id

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const docRef = await db.collection('hamstrar').doc(id).get();

    if (!docRef.exists) {
        res.status(404).send('Hamster does not exist');
        return
    }

    const data = docRef.data();
    res.send(data);
})


//POST /hamsters

router.post('/', async (req, res) => {
    const object = req.body; //OBS! måste installera express.json för att detta ska funka

    console.log('POST TESTING: ', object);

    if (!isHamsterObject(object)) {
        res.sendStatus(400);
        return;
    }

    const docRef = await db.collection('hamstrar').add(object);
    res.send(docRef.id);
})


//PUT /hamsters/:id

//KOLLA PATCH OCKSÅ

router.put('/:id', async (req, res) => {
    const object = req.body; //OBS! måste installera express.json för att detta ska funka
    const id = req.params.id;

    if (!object || !id) {
        res.sendStatus(400);
        return;
    }

    /*vi kan kontrollera om det finns ett doc som matchar id i databasen
    Denna kod godkänner id som inte matchar, och lägger till ett nytt doc i databasen
    */

    const docRef=db.collection('hamstrar').doc(id);
    await docRef.set(object, {merge: true});
    res.sendStatus(200);

});


function isHamsterObject(object) {
    if (!object) {
        return false;
    }
    else if (!object.name || !object.age) {
        return false;
    }
    return true;
}

//DELETE /hamsters/:id

router.delete('/:id', async (req, res) => {
    const id=req.params.id;

    if (!id) {
        res.sendStatus(400);
        return
    }
    if (!docRef.exists) {
        res.status(404).send('Hamster does not exist');
        return
    }

    await db.collection('hamstrar').doc(id).delete();
    res.sendStatus(200);
});


module.exports = router;