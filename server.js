const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');


const PORT = 1337;
const staticFolder = path.join(__dirname, 'public');

//Middleware
app.use( express.json() );
app.use( cors() );
app.use( express.static(staticFolder) );

app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`, req.params);
	next();
});


//Routes
app.get('/', (req, res) => {
	res.send('welcome to the excercise project');
});


app.listen(PORT, () => {
	console.log('Server listening on port '+PORT);
});