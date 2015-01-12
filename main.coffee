irc = require("irc")
config = require("./config.js")

client = new irc.Client config.server, config.nick, config
modules = ["./backend/gelbooru"]

bot = require("./bot.coffee")


bot.init(client, modules)
bot.bind(config.prefix)