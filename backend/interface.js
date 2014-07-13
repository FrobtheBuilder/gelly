//here is defined an empty skeleton backend, which defines exactly what duties a backend must fulfill
exports.alias = "skeleton"; //alias is the command that references the backend, in this case <prefix>skeleton
exports.execute = function(action, params) { 
	//where action is a string, ideally referencing the action to be performed. comes after command.
	//params is an array of extra information. Comes after action and a space. Multiple params separated by a comma
	//example: ^alias action param1,param2,etc

	return "hi!";
	//this function must return a string. The string will be what is said by the bot.
}