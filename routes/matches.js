
const getDatabase = require('../database.js');
const db = getDatabase();

const express = require('express');
const router = express.Router();

const getAllData = require('../modules/get-all-data.js');
const getOneData = require('../modules/get-one-data.js');
const deleteOneData = require('../modules/delete-one-data.js');
const postData = require('../modules/post-data.js');



//** REST API ** 
//GET all matches
router.get('/', (req, res) => {
    try {
        //skicka in db, tom array, route, req & res, calltype:
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
            //skicka in id, db, route, titel, req & res:
            let myPromise=getOneData(id, db, 'matches', 'Match', req, res, myItem);
            myPromise.then(function(result) {
                console.log(result);
                res.status(200).send(result);
            });
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


module.exports = router;