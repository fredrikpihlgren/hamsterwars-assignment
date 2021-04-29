function sortData(param, type, checker_max) {

	param.sort(function(a, b) {
		if (type == '/winners') {return b.wins-a.wins;}
	   	else {return b.defeats-a.defeats;}
	});
	param.splice(checker_max);
	return param;
}


module.exports = sortData;
