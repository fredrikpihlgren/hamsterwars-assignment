
const getDatabase = require('../database.js');
const db = getDatabase();

const express = require('express');
const router = express.Router();

const getAllData = require('../modules/get-all-data.js');
const getOneData = require('../modules/get-one-data.js');
const deleteOneData = require('../modules/delete-one-data.js');
const postData = require('../modules/post-data.js');


function paramCheckers(object) {
    const paramcheckers=[
        {type: object.winnerId, mess: "Object must have a value.", val: 'string'},
        {type: object.loserId, mess:"Object must have a value.", val: 'string'}
    ];
    return paramcheckers;
}


//** REST API ** 
//GET all matches
router.get('/', (req, res) => {
    try {
        //send in db, empty array, route, req & res, calltype:
        getAllData(db, [], 'matches', req, res, '');
    }
    catch(error) {
        console.log('An error occurred '+error.message);
        res.status(500).send(error.message);
    }
});



//GET /matches/:id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    let myItem=[];
        try {
            getOneData(id, db, 'matches', 'Match', req, res, myItem);
        }
        catch(error) {
            console.log('An error occurred '+error.message);
            res.status(500).send(error.message);
        }

});


//DELETE /matches/:id
router.delete('/:id', (req, res) => {
    const id=req.params.id;
    deleteOneData(id, db, 'matches', req, res);
});


//POST /matches
router.post('/', (req, res) => {
    try {
        const object = req.body;
        let paramcheckers=paramCheckers(object);
        postData(db, 'matches', req, res, object, paramcheckers);
    }
    catch(error) {
        console.log('An error occurred '+error.message);
        res.status(500).send(error.message);
    }
});


module.exports = router;