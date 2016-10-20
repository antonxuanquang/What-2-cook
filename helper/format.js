var formatSearchUrl = function(baseUrl, apiKey, query) {
	var url = baseUrl + 'search?' + 'key=' 
			+ apiKey;
	if (query.query) url += '&q=' + query.query;
	if (query.sort) url += '&sort=' + query.sort;
	if (query.page) url += '&page=' + query.page;
	return url;
}

var formatGetUrl = function(baseUrl, apiKey, id) {
	return baseUrl + 'get?' + 'key=' 
			+ apiKey + '&rId=' + id;
}


exports.formatSearchUrl = formatSearchUrl;
exports.formatGetUrl = formatGetUrl;