irc = require("irc")
config = require("./config.js")

client = new irc.Client config.server, config.nick, config

client.on "message", (nick, to, text, message) ->
	console.log("message")