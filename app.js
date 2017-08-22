
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , chokidarModule = require('./routes/chokidarModule');
//  , gcpnodeconnection = require('./routes/gcpbucketctrl');

var config = require('./config/config.json');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
//app.set('view engine', 'html');
//app.engine('html', require('jade').renderFile);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
	
app.get('/', routes.index);
app.get('/users', user.list);


//***** Set of APIs for BSA API-Integration *****
//Get sample data from BSA APIs with Originating ID as input parameter
app.get('/bsa/getdata/orignatingid/:origID', routes.getDataWithOriginatingID);

//Get Sample Data from BSA APIs With BSTRegID as input parameter
app.get('/bsa/getdata/bstregid/:regID', routes.getDataWithBSTRegID);

//Get Status of Sample from BSA API With BSTRegID as input parameter
app.get('/bsa/getsamplestatus/orignatingid/:origID', routes.getSampleStatusOrigId);

//Get Sample shipment details from BSA Shipment APIs
app.get('/bsa/getShipmentDetails/bstregid/:regID', routes.getShipmentDetails);

//Print the CSV file as JSON Array
app.get('/bsa/csvtojson', routes.csvtojson);

//Find row(s) in CSV file matching given Column Name and Column Value as input parameter
app.get('/bsa/findincsv/column/:columnname/value/:itemValue', routes.findInCSV);

//*****END of APIs for BSA API-Integrations part *****  


//***** API to parse the CSV whose path is passed as query parameter *****
//parse the CSV file from a path & print it in JSON 
app.get('/getcsv/parsecsv/:filepath?', routes.csvtojsonFromPath);
//***** End of API to parse the CSV whose path is passed as query parameter *****


//***** API to parse the medidata sample CSV
//parse the mediData CSV file and print in JSON 
app.get('/medidata/parsecsv', routes.parseMedidataCSV);
//***** End of API to parse the medidata sample CSV


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
