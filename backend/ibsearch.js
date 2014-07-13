var http = require("http");
var events = require("events");
var eventEmitter = new events.EventEmitter();

exports.e = eventEmitter;
exports.alias = "ib";

var options = {
	hostname: 'ibsearch.i-forge.net',
	port: 80,
	method: 'POST'
};
var req;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

exports.execute = function(action, params) {
	//param 1: site to search
	//param 2... tags
	if (action == "search" || action == "s") search(params);
}

function search(params) {
	var site;

	if (params[0] != undefined) {
		site = params[0];
	} 
	else {
		site = "any";
	}
	
	var raw_response;

	if (site == "g") site = "gelbooru";
	if (site == "any" || site == "all") { site = "" } else { site = "site:"+site }

	options.path = "/?action=search&search[phrase]="+site;
	var tags = params.splice(1);
	tags.forEach(function(tag) {
		options.path += "+%2B"+tag;
	})
	options.path += "&search[count]=100&format=js&js[data]=json";
	console.log(options.path);
	req = http.request(options)

	req.on('response', function(res) {
		res.on("data", function (chunk) {
			raw_response += chunk;
		})
		res.on("end", function() {
			var undefinedGotIbSearch = process;
			eval(raw_response); //process();
		})

	})
	req.end();
}

function process(response) {
	var response_object = JSON.parse(response);
	var return_string;
	if (response_object !== undefined && response_object.response !== undefined) {
		return_string = response_object.response[getRandomInt(0,response_object.response.length-1)].page_url;
	}
	else {
		return_string = "Sorry, bad request."
	}
	eventEmitter.emit('return', return_string);
}