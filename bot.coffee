events = require "events"
_ = require "lodash"
config = require "./config"
require "./polyfill"

module.exports = do ->

	bot =
		client: {}
		modules: []

		#basically a wrapper that emits events when a 
		#message is recieved in the form of a command
		command: new events.EventEmitter()

		init: (client, modules) ->
			bot.client = client

			modules.forEach (module) ->
				bot.modules.push(require module)

			bot.modules.forEach (module) ->
				if typeof module.init == "function"
					module.init(bot, client)
			

		bind: (prefix) ->	
			bot.client.on 'message', (nick, to, text, message) ->
				if text.startsWith(prefix)
					bot.command.emit('command', text.split(prefix)[1..])
					console.log text.split(prefix)[1..]
	


	init: bot.init
	bind: bot.bind
