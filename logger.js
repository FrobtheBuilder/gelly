var fs = require("fs");
var ibsearch = require("./backend/ibsearch.js");

exports.execute = function(request) {
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
		};

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

}