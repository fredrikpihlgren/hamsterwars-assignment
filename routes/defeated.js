const getDatabase = require('../database.js');
const db = getDatabase();

const express = require('express');
const router = express.Router();

const getAllData = require('../modules/get-all-data.js');


//** REST API ** 
//GET all matches
router.get('/:id', (req, res) => {
    try {
        //send in db, empty array, route, req & res, calltype:
        getAllData(db, [], 'matches', req, res, 'matches');
    }
    catch(error) {
        console.log('An error occurred '+error.message);
        res.status(500).send(error.message);
    }
});


module.exports = router;