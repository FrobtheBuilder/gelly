// Gelly - An irc bot that returns Gelbooru links
var irc = require("irc");
var conf = require("./config.js");

var client = new irc.Client(conf.server, conf.nick, conf);
