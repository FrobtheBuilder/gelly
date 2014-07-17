// Gelly - An irc bot that returns booru links
var irc = require("irc");
var conf = require("./config.js");
//var backends = require("./backends.js");
var backend_list = [];

var ibsearch = require("./backend/ibsearch.js");
backend_list.push(ibsearch);


String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

var client = new irc.Client(conf.server, conf.nick, conf);

client.on("message", function(nick, to, text, message) {
	if (text.charAt(0) == conf.prefix) delegate(text.split(conf.prefix)[1], to);
});

function delegate(command, to) {
	var command_arr = command.split(" ");

	if (command_arr[0] === "porn") {
		command_arr[0] = "ib";
		command_arr.splice(1, 0, "any");
		console.log(command_arr);
	}

	backend_list.forEach(function(element) {
		element.execute({client: client, command_arr: command_arr, recipient: to}) 
		//^^see if any of the modules can handle the message
	})
}
