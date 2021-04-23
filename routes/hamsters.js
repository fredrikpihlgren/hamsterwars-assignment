
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

    if (!object || !object.name || !object.age) {
        res.sendStatus(400);
        return;
    }

    const docRef = await db.collection('hamstrar').add(object);
    res.send(docRef.id);
})


//PUT /hamsters/:id
//DELETE /hamsters/:id


module.exports = router;