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
	catch {
		console.log('something went wrong.');
		//use not vague messages like these. Try err. in combo with some ifs?
	}
	

});