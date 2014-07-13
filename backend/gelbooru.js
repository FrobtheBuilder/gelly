var http = require("http");

exports.alias = "gelbooru";

var options = {
	hostname: 'gelbooru.org',
	port: 80,
	method: 'POST'
};

exports.execute = function(action, params) {
	//param 1: tag to search
}

function search(search_string, search_query) {
	options.path = "/index.php?page=dapi&s=post&q=index";
}