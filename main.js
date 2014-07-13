// Gelly - An irc bot that returns Gelbooru links
var irc = require("irc");
var conf = require("./config.js");
var backends = require("./backends.js");
var regexer = require("./regexer.js");

var backend_list = [];
var ibsearch = require("./backend/ibsearch.js");
function initBackends() {
	backends.list.forEach(function (el) {
		backend_list.push(require("./backend/"+el+".js"));
	});
	console.log(backend_list);
	
}


var client = new irc.Client(conf.server, conf.nick, conf);

client.on("message", function(nick, to, text, message) {
	if (text.charAt(0) == conf.prefix) processCommand(text.split(conf.prefix)[1], to);
});

function processCommand(command, to) {

	if (command == "ib") {
		var action = "search";
		var params = [];
	}
	else {
		var command_arr = command.split(" ");
		var backend_to_call = command_arr[0]

		var action_raw_arr = command_arr.splice(1);

		var action = action_raw_arr[0];
		var params = action_raw_arr.slice(1);
	}
	

	ibsearch.e.once('return', function(string) {
		client.say(to, string);
		ibsearch.e.removeAllListeners('return');
	});

	ibsearch.execute(action, params);
}
