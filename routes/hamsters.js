
const getDatabase = require('../database.js');
const db = getDatabase();

const express = require('express');
const router = express.Router();

const getAllData = require('../modules/get-all-data.js');
const getOneData = require('../modules/get-one-data.js');
const deleteOneData = require('../modules/delete-one-data.js');
const postData = require('../modules/post-data.js');



//** REST API ** 
//GET all hamsters
router.get('/', (req, res) => {
    try {
        //skicka in db, tom array, route, req & res:
        let myPromise=getAllData(db, [], 'hamstrar', req, res);
        myPromise.then(function(result) {
            console.log(result);
            res.status(200).send(result);
        });
    }
    catch(error) {
        console.log('ett fel inträffade '+error.message);
        res.status(500).send(error.message);
    }
});


//GET /hamsters/:id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    let myItem=[];

    if (id == "random") {
        try {
        //skicka in db, tom array, route, req & res:
            let myPromise=getAllData(db, [], 'hamstrar', req, res);
            myPromise.then(function(result) {
                let randomNumber=Math.floor(Math.random() * result.length);
                //console.log(result.length, result);
                res.status(200).send(result[randomNumber]);
            });
        }
        catch(error) {
            console.log('ett fel inträffade '+error.message);
            res.status(500).send(error.message);
        }
            
    }
    else {
        try {
            //skicka in id, db, route, titel, req & res:
            let myPromise=getOneData(id, db, 'hamstrar', 'Hamster', req, res, myItem);
            myPromise.then(function(result) {
                console.log(result);
                res.status(200).send(result);
            });
        }
        catch(error) {
            console.log('ett fel inträffade '+error.message);
            res.status(500).send(error.message);
        }
    }

});


//DELETE /hamsters/:id
router.delete('/:id', (req, res) => {
    const id=req.params.id;
    deleteOneData(id, db, 'hamstrar', req, res);
});



//POST /hamsters
router.post('/', (req, res) => {
    postData(db, req, res);
});


//PUT /hamsters/:id

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



module.exports = router;