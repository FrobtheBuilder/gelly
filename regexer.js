module.exports = {
	startsWith : function (subject, string) {
		var escape = false;
		if (subject === '^') escape = true;
		if (!escape) 
			reg = new RegExp("^"+"string");
		else 
			reg = new RegExp("^"+"\\"+"string");
		
		return subject.match(reg);
	}
}