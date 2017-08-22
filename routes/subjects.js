var Client = require('node-rest-client').Client;
var csvToJSONClient = require("csvtojson");
var http = require('http');

exports.csvtojsonFromPath = function(req, res){
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
	     console.log('Inside subject module export!!');	     	     
	   });		
	res.send(jsondata);
};


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
	     console.log("element found::"+jsondata);	     
	   });		
    res.send(jsondata);	     
};

//exports.getCompanyRatings = function(req, res){
//	dbConn.getCompanyRatings(function(err,rows){
//		console.log(rows);
//		 res.send(rows);
//	});		  
//};
//
//exports.getCompanyRatings = function(callback) {
//	var query = "select companyName as name, companyGroup as 'group',overallRating as 'Overall Rating',cultRatng as 'Culture And Values Rating',compsRating as 'Compensation And Benefits Rating',currRatng as 'Career Opportunities Rating',wrkLyfRatng as 'WorkLife Balance Rating' from companysenti ";
//	connection.query(query, function(err, rows) {
//		console.log(rows);
//		callback(err, rows);
//	})
//	};