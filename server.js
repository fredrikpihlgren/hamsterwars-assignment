const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const animals = require('./routes/animals.js');
const hamsters = require('./routes/hamsters.js');


const PORT = 1337;
const staticFolder = path.join(__dirname, 'public');

//Middleware
//Logger, skriver ut info om kommande requests
app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`, req.params);
	next();
});
app.use( express.json() );
app.use( cors() );
app.use( express.static(staticFolder) );




//Routes
app.use('/animals', animals);


//REST API FOR HAMSTERS
app.use('/hamsters', hamsters);


/*
app.get('/', (req, res) => {
	res.send('welcome to the excercise project');
});
*/


//Startar servern
app.listen(PORT, () => {
	console.log('Server listening on port '+PORT);
});