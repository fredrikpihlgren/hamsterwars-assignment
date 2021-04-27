function sortData(param, type, checker_max) {

	param.sort(function(a, b) {
		if (type == 'winners') {return b.wins-a.wins;}
	   	else {return b.defeats-a.defeats;}
	});
	let checker=0;
	for (let i=0;i<checker_max;i++) {
		let checker_type=param[i].defeats;
		if (type == 'winners') {checker_type=param[i].wins;}
		if (checker_type > 0) {checker++;}
		else {break;}
	}
	param.splice(checker);
	//if (checker <= 0) {
		//if all items were zero or less:
		//console.log('No '+type+' were found.');
	//}
	return param;
}


module.exports = sortData;
