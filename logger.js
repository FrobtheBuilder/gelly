var fs = require("fs");
var ibsearch = require("./backend/ibsearch.js");

var client;
var recipient;

exports.execute = function(request) {
	client = request.client;
	recipient = request.recipient;
	if (request.command_arr[0] == "prof" || request.command_arr[0] == "profile") 
		printProfile(request.nick);
	else
		log(request);
}

function log(request) {

	var command_processed = ibsearch.processQuery(request.command_arr.slice(1))
	var tags = command_processed[1].slice(1);

	fs.readFile("./profiles.log", {encoding: "utf8"}, function(err, data) {
		if (err) {
			fs.writeFileSync("./profiles.log", "{}");
			data = "{}";
		}

		var data_obj = JSON.parse(data);

		if (data_obj[request.nick] === undefined) {
			data_obj[request.nick] = {};
		}

		tags.forEach(function(tag) {
			if (data_obj[request.nick]) {
				if (data_obj[request.nick][tag] === undefined) {
					data_obj[request.nick][tag] = 1;
				}
				else {
					data_obj[request.nick][tag] += 1;
				}
			}
		});

		fs.writeFile("./profiles.log", JSON.stringify(data_obj));
	});
}


function printProfile(nick) {
	fs.readFile("./profiles.log", {encoding: "utf8"}, function(err, data) {
		if (err) {
			fs.writeFileSync("./profiles.log", "{}");
			data = "{}";
		}
		var data_obj = JSON.parse(data);
		client.say(recipient, "Profile of "+nick+":");
		if (data_obj[nick] != undefined) {
			var profstring = "";
			for (tag in data_obj[nick]) {
				if (data_obj[nick].hasOwnProperty(tag)) {
					profstring += tag + ": " + data_obj[nick][tag] + ", ";
				}
			}
			profstring = profstring.substr(0, profstring.length-2);
			client.say(recipient, profstring);
		}
		else {
			client.say(recipient, "No Data.");
		}
	});
}