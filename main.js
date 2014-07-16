// Gelly - An irc bot that returns Gelbooru links
var irc = require("irc");
var conf = require("./config.js");
var backends = require("./backends.js");

String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

var ibsearch = require("./backend/ibsearch.js");

var client = new irc.Client(conf.server, conf.nick, conf);

client.on("message", function(nick, to, text, message) {
	if (text.charAt(0) == conf.prefix) processCommand(text.split(conf.prefix)[1], to);
});

function processCommand(command, to) {

	var command_arr = command.split(" ");
	var backend_to_call;
	var action;
	var params;

	if (command_arr[0] === "porn") {

		command_arr[0] = "ib";
		//command_arr[1] = "-s";
		command_arr.splice(1, 0, "any");
		console.log(command_arr);
	}
	
	backend_to_call = command_arr[0];

	var action_raw_arr = command_arr.slice(1);

	action_raw_arr.forEach(function (part) {
		if (part.contains("-")) {
			action = part.substr(1);
		}
	})

	if (action) {
		params = action_raw_arr.splice(action_raw_arr.indexOf("-"+action, 1));
	}
	else {
		action = "search";
		params = action_raw_arr;
	}
	
	ibsearch.e.removeAllListeners('return');
	ibsearch.e.once('return', function(string) {
		client.say(to, string);
	});

	ibsearch.execute(action, params);
}
