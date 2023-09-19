var fs = require('fs')


let oldPart = '-(1)-'
let newPart = '-'


function processFile(filepath) {
	if(filepath.indexOf(oldPart) === -1) {
		return;
	}
	var newFilepath = filepath.replace(oldPart, newPart);
	console.log(filepath, '->', newFilepath);
	fs.rename(filepath, newFilepath, function (err) {
  		if (err) throw err;
  		console.log('renamed complete');
	});
}


function getFiles (dir) {
	var files = fs.readdirSync(dir);
	files.forEach(function(file) {
		var name = dir + file;
		if (fs.statSync(name).isDirectory()) {
			getFiles(name);
		} else {
			processFile(name);		
		}
	})
}

getFiles('.')
