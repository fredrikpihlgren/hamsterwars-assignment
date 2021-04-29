
const getDatabase = require('../database.js');
const db = getDatabase();

const express = require('express');
const router = express.Router();

const getAllData = require('../modules/get-all-data.js');
const getOneData = require('../modules/get-one-data.js');
const deleteOneData = require('../modules/delete-one-data.js');
const postData = require('../modules/post-data.js');
const putData = require('../modules/put-data.js');



function paramCheckers(object) {
    const paramcheckers=[
        {type: object.name, mess: "Object must have a name.", val: 'string'},
        {type: object.age, mess:"Object must be of an age.", val: 'number'},
        {type: object.favFood, mess:"Object must have a favorite food.", val: 'string'},
        {type: object.loves, mess:"Object must love something.", val: 'string'},
        {type: object.imgName, mess:"Object must have an image.", val: 'string'},
        {type: object.wins, mess:"Object must have a win-variable.", val: 'number'},
        {type: object.defeats, mess:"Object must have a defeat-variable.", val: 'number'},
        {type: object.games, mess:"Object must have a games-variable.", val: 'number'}
    ];
    return paramcheckers;
}


//** REST API ** 
//GET all hamsters
router.get('/', (req, res) => {
    try {
        //send in db, empty array, route, req & res, calltype:
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

    try {
        if (id == "random") {
            getAllData(db, [], 'hamstrar', req, res, 'random');
        }
        else {
            getOneData(id, db, 'hamstrar', 'Hamster', req, res, myItem);
        }
    }
    catch {
        console.log('An error occurred '+error.message);
        res.status(500).send(error.message);
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
        const object = req.body;
        let paramcheckers=paramCheckers(object);
        postData(db, 'hamstrar', req, res, object, paramcheckers);
    }
    catch(error) {
        console.log('An error occurred '+error.message);
        res.status(500).send(error.message);
    }
});


//PUT /hamsters/:id

router.put('/:id', async (req, res) => {
    const object = req.body;
    let paramcheckers=paramCheckers(object);
    //db, dbname, req, res, object, paramcheckers
    putData(db, 'hamstrar', req, res, object, paramcheckers);

});



module.exports = router;