var http = require("http");
var events = require("events");

exports.alias = "ib";

var options = {
	hostname: 'ibsearch.i-forge.net',
	port: 80,
	method: 'POST'
};

var client;
var recipient;


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

exports.processQuery = function(command_arr) { //processes the command args, without the actual command in the array.
	var action;
	var params;
	command_arr.forEach(function (part) {
		if (part.contains("-")) {
			action = part.substr(1);
		}
	})

	if (action) {
		params = command_arr.slice(action_raw_arr.indexOf("-"+action)+1);
	}
	else {
		action = "search";
		params = command_arr;
	}

	if (action = "s") action = "search";
	return [action, params];
}

exports.execute = function(request) {
	client = request.client;
	recipient = request.recipient;

	if (request.command_arr[0] != "ib") return false;

	var command_processed = module.exports.processQuery(request.command_arr.slice(1));

	if (command_processed[0] == "search") 
	search(command_processed[1]);
}

function search(params) {
	var site;
	var req;

	if (params[0] != undefined) {
		site = params[0];
	} 
	else {
		site = "any";
	}
	
	var raw_response;

	if (site == "g") site = "gelbooru";
	if (site == "any" || site == "all") { site = "-site:lolibooru" } else { site = "site:"+site } //lolibooru is down

	options.path = "/?action=search&search[phrase]="+site;
	var tags = params.splice(1);
	tags.forEach(function(tag) {
		options.path += "+%2B"+tag;
	})
	options.path += "&search[count]=100&format=js&js[data]=json";
	console.log(options.path);

	req = http.request(options);

	req.on('response', function(res) {
		res.on("data", function (chunk) {
			raw_response += chunk;
		})
		res.on("end", function() {
			var undefinedGotIbSearch = process;
			eval(raw_response); //process(); lel good use of eval
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
		return_string = "Sorry, no results.";
	}
	client.say(recipient, '14'+return_string);
}