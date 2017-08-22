var chokidar = require('chokidar');	//Imports module that is downloaded from NPM
var subjectModule = require('./subjects');
var Client = require('node-rest-client').Client;	
var config = require('../config/config.json');


/* Chokidar module: 
	Directory monitoring module used to monitor changes to a directory & trigger processes accordingly.
	
	Changes it can detect: 1. Addition of new file(s)
						   2. Modification of file(s)	
						   3. Deletion of file(s)
						   4. Deletion of Directory(s)
*/
	//Getting the file location to monitor from configuration
	var filepath = config.fileSourceLocation.fileLocation;
	
	var watcher = chokidar.watch(filepath, {
		//Different Flags can be set here
		ignored: /[\/\\]\./, 
		ignoreInitial: true,	//ignores files that already exist.
		persistent: true,
		usePolling: false,	//Set to True for monitoring files over a network(GCP).
//		interval:1, 
//		binaryInterval: 1
		});
	watcher
	  .on('add', function(path) {
		  console.log('File', path, 'has been added');
		  
		  // Set up for calling the REST API End-point where CSV parser is listening
		  var client = new Client();			  
		  
		  //This is the REST API EndPoint which parses the CSV whose location is fed by query parameter 
		  var parserAPIEndPoint = "http://127.0.0.1:3000/getcsv/parsecsv/";		  
		  
		  var args = {
					parameters: {filepath:path},	
//				    headers: { "Content-Type": "text/plain" }
				};
			//Making REST API call using the parameters set in above lines
		  	client.get(parserAPIEndPoint, args, function (data, response) {
		  		console.log("path received by REST client via query param is:: "+args.parameters.filepath);
		  		console.log("JSON received after parsing CSV:: ");
		  		console.log(data);			
		  	}); // End of Set up for calling the REST API End-point where CSV parser is listening	
	  })	
	  .on('addDir', function(path) {console.log('Directory', path, 'has been added');})	//triggers process on addition of dir
	  .on('change', function(path) {console.log('File', path, 'has been changed');}) //triggers process on file change
	  .on('unlink', function(path) {console.log('File', path, 'has been removed');}) //triggers process on file deletion
	  .on('unlinkDir', function(path) {console.log('Directory', path, 'has been removed');}) //triggers process on dir deletion 
	  .on('error', function(error) {console.error('Error happened', error);}) //handles the errors that has occured.
	 
	// 'add', 'addDir' and 'change' events also receive stat() results as second argument. 
	// http://nodejs.org/api/fs.html#fs_class_fs_stats 
	watcher.on('change', function(path, stats) {
	  console.log('File', path, 'changed size to', stats.size);
	});
// End of Chokidar(directory monitoring module used for monitoring changes to a directory)
	