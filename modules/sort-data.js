function sortData(param, type, checker_max) {

	param.sort(function(a, b) {
		if (type == '/winners') {return b.wins-a.wins;}
		else if (type == '/manyMatches') {return b.games-a.games;}
		else if (type == '/fewMatches') {return a.games-b.games;}
	   	else {return b.defeats-a.defeats;}
	});
	param.splice(checker_max);
	if (type == '/manyMatches' || type == '/fewMatches') {
		newParam=[];
		for (let i=0;i<param.length;i++) {
			newParam.push(param[i].id);
		}
		param=newParam;
	}
	return param;
}


module.exports = sortData;
