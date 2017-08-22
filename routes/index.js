
//Importing the modules
var Client = require('node-rest-client').Client;
var csvToJSONClient = require("csvtojson");
var chokidar = require('chokidar');

//importing config file for the connection pooling 
var config = require('../config/config.json');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

//exports.index = function(req, res){
//	res.render('index', { title: 'ejs' });};

exports.getDataView = function(req, res){
	res.render('infoRender.html');
};

exports.getvueTable = function(req, res){
	res.render('vueTable.html');
};

/*
 * Fetching Sample data from BSA API with Originating ID as input parameter
 */
exports.getDataWithOriginatingID = function(req, res){	 

	//Creating am instance of the REST client 
	var client = new Client();

	//Setting up the parameters for the REST client to make a GET call
	var urlEndPoint = config.BSA.planeURL;	
	var username = config.BSA.username;
	var password = config.BSA.password;	
	var orignatingID = req.params.origID;	
	var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');	
	var args = {
		parameters: { dataelement: "originating_id", value: orignatingID },	
	    headers: { 'Authorization': auth, "Content-Type": "application/json" }
	};
	 	
	//Making REST API call using the parameters set in above lines
	client.get(urlEndPoint, args, function (data, response) {
			console.log(data);			
	    	res.send(data);	    	    
	});	 
};


/*
 * Fetching Sample data from BSA API with BST_Registeration ID as input parameter
 */
exports.getDataWithBSTRegID = function(req, res){	 
	var client = new Client();
	
	//Setting up the parameters for the REST client to make a GET call
	var urlEndPoint = config.BSA.planeURL;
	var username = config.BSA.username;
	var password = config.BSA.password;	
	var regID = req.params.regID;
	var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
	
	var args = {
		parameters: { dataelement: "bst_registration", value: regID },	
	    headers: { 'Authorization': auth, "Content-Type": "application/json" }
	};
	 	
	//Making REST API call using the parameters set in above lines
	client.get(urlEndPoint, args, function (data, response) {
			console.log(data);			
	    	res.send(data);	    	    
	});	 
};

/*
 * Get Status of the sample using the Originating ID as input parameter
 */
exports.getSampleStatusOrigId = function(req, res){	 
	
	//Creating am instance of the REST client 
	var client = new Client();
	
	//Setting up the parameters for the REST client to make a GET call
	var urlEndPoint = config.BSA.planeURL;	
	var username = config.BSA.username;
	var password = config.BSA.password;	
	var orignatingID = req.params.origID;
	var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
	
	var args = {
		parameters: { dataelement: "originating_id", value: orignatingID },	
	    headers: { 'Authorization': auth, "Content-Type": "application/json" }
	};
	
	//Making REST API call using the parameters set in above lines
	client.get(urlEndPoint, args, function (data, response) {
			console.log(data);
			var output = data;
	    	res.send("sample_status :"+output[0].sample_status);
	});	 
};

/*
 * Get Status of the sample using the Originating ID as input parameter
 */
exports.getShipmentDetails = function(req, res){	 
	
	//Creating am instance of the REST client 
	var client = new Client();
	
	//Setting up the parameters for the REST client to make a GET call
	var urlEndPoint = config.BSA.shipmentAPI;	
	var username = config.BSA.username;
	var password = config.BSA.password;	
	var registerationID = req.params.regID;
	var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
	
	var args = {
		parameters: { bstRegistration: registerationID },	
	    headers: { 'Authorization': auth, "Content-Type": "application/json" }
	};
	
	//Making REST API call using the parameters set in above lines
	client.get(urlEndPoint, args, function (data, response) {
			console.log(data);			
	    	res.send(data);	    	    
	});	 	 
};

/*
 * Find the row/rows in CSV matching the given columnName and its Value as input parameter
 * Outputs the result as JSON
 */
exports.findInCSV = function(req, res){
	
	var jsondata;
	
	//	Getting the Column name and the value to be searched as path parameter
	var columnToFind = req.params.columnName;
	var valueToFind = req.params.itemValue;
	
	csvToJSONClient()
	  .fromFile('files/'+'TechCrunchcontinentalUSA.csv')
	  .on("end_parsed",function(jsonArrayObj){ 
 
	     jsondata = jsonArrayObj;
	     
	     var found = jsonArrayObj.filter(function(a){
	    	 if(columnToFind === "city")
	    		 return a.city === valueToFind;
	    	 else if(columnToFind === "permalink")
	    		 return a.permalink === valueToFind;
	     });
	     console.log("element found::"+JSON.stringify(found));
	     
	     res.send(found);	     
	   });	
};


/*
 * Parse the content of the Medidata CSV file
 */
exports.parseMedidataCSV = function(req, res){
	var jsondata;
	csvToJSONClient()
	  .fromFile('files/'+'PICI_Randomization_data.csv')
	  .on("end_parsed",function(jsonArrayObj){ //when parse finished, result will be emitted here.
//	     console.log(jsonArrayObj); 
	     jsondata = jsonArrayObj;
	     res.json(jsondata);	     
	   });		
};


/*
 * Print all the content of CSV as JSON
 */
exports.csvtojson = function(req, res){
	var jsondata;
	csvToJSONClient()
	  .fromFile('files/'+'theBSAFile.csv')
	  .on("end_parsed",function(jsonArrayObj){ //when parse finished, result will be emitted here.
	     console.log(jsonArrayObj); 
	     jsondata = jsonArrayObj;
	     
//	     var found = jsonArrayObj.filter(function(a){
//	    	 return a.city === "Gilbert";
//	     });
//	     console.log("element found::"+jsondata);	     
	     res.json(jsondata);	     
	   });		
};

/*
 * Parses the CSV file whose path is passed as Query parameter.
 */
exports.csvtojsonFromPath = function(req, res){	
	var jsondata;
	var addedFilePath = req.query.filepath; //fetching the file path to be parsed from query parameter
	
	console.log("Inside csv to json from path::");
	console.log("path received over query in csvtoJSONFromPath:: "+addedFilePath);
	
	csvToJSONClient()
	  .fromFile(addedFilePath)
	  .on("end_parsed",function(jsonArrayObj){ //when parse finished, result will be emitted here.
//	     console.log(jsonArrayObj); 
	     jsondata = jsonArrayObj;
	     res.send(jsondata);	     
	   });		
};
