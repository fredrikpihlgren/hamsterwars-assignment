const display = document.querySelector('#displayData');
const fetchButton = document.querySelector('#fetchData');

fetchButton.addEventListener('click', async event => {
	//console.log("hello world!");

	//FETCH TIME
	try {
		const response = await fetch('/hamsters');
		const json = await response.json();

		let text = JSON.stringify(json);
		display.textContent=text;
	}
	catch(err) {
		console.log('something went wrong. '+err.message);
	}
	
});