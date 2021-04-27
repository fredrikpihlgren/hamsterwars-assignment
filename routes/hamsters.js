
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
        //skicka in db, tom array, route, req & res, calltype:
        getAllData(db, [], 'hamstrar', req, res, '');
    }
    catch(error) {
        console.log('An error occurred '+error.message);
        res.status(500).send(error.message);
    }
});


//GET /hamsters/:id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    let myItem=[];

    if (id == "random") {
        try {
            //skicka in db, tom array, route, req & res, calltype:
            getAllData(db, [], 'hamstrar', req, res, 'random');
        }
        catch(error) {
            console.log('An error occurred '+error.message);
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
            console.log('An error occurred '+error.message);
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
    try {
        postData(db, req, res);
    }
    catch(error) {
        console.log('An error occurred '+error.message);
        res.status(500).send(error.message);
    }
});


//PUT /hamsters/:id

const isObject = require('../modules/is-object.js'); //delete after

router.put('/:id', async (req, res) => {
    const object = req.body;
    const id = req.params.id;
    const docRef = await db.collection('hamstrar').doc(id).get();

    if (!docRef.exists) {
        res.status(404).send('Object does not exist');
        return
    }
    //let status=isObject(object, "");
    //console.log(status.objStatus);
    //|| Object.keys(object).length <= 0
    if (!object) {
        res.status(400).send(status.errmsg);
        return;
    }
    
    if (Object.keys(object).length === 0) {
        res.status(400).send("Object cannot be empty.");
        return;
    }

    /*
    let titt=Object.keys(object).length;
    console.log(titt, 'apa');
    if (titt == "") {console.log('göken');}
    console.log(Object.keys(object));
    */
    
    /*vi kan kontrollera om det finns ett doc som matchar id i databasen
    Denna kod godkänner id som inte matchar, och lägger till ett nytt doc i databasen
    */

    const docRef2 = await db.collection('hamstrar').doc(id).set(object, {merge: true});
    res.status(200).send(id+' updated with success.');

});



module.exports = router;