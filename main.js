// Gelly - An irc bot that returns Gelbooru links
var irc = require("irc");
var conf = require("./config.js");
var backends = require("./backends.js");
var regexer = require("./regexer.js");

var backend_list = [];
function initBackends() {
	backends.list.forEach(function (el) {
		backend_list.push(require(el));
	});
}


var client = new irc.Client(conf.server, conf.nick, conf);

client.on("message", function(nick, to, text, message) {
	if (text.charAt(0) == conf.prefix) processCommand(text.split(conf.prefix)[1], to);
});

function processCommand(command, to) {
	var command_arr = command.split(" ");
	var backend_to_call = command_arr[0]

	var action_raw_arr = command_arr[1].split(",")
	var action = action_raw_arr[0];
	var params = action_raw_arr.slice(1);

	client.say(to, backend_list[backend_list.indexOf(backend_to_call)].execute(action, params));
}