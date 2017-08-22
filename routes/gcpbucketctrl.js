//

//configration for the gcould buckets access via REST
//var gcs = require('@google-cloud/storage')({
//	  projectId: 'thermal-shuttle-153100',
//	  keyFilename: './config/My First Project-cc3e7088371f.json'
//	});

////gcs.getBuckets(function(err, buckets) {
////	  if (!err) {
//////	    console.log(JSON.stringify(buckets));
////	  }
////	});
//
////This will help in getting the bucket stream 
//var bucket = gcs.bucket('indx-node-gcp-bucket');  
//	
//bucket.getFilesStream()
//.on('error', console.error)
//.on('data', function(file) {
//  // file is a File object.
//	console.log("inside the get file stream method.....");
////	console.log(file);
//})
//.on('end', function() {
//  // All files retrieved.
//	console.log("finished uploading the file(s).....");
//
//});


//logic to upload a file to GCS bucket

// Imports the Google Cloud client library
const Storage = require('@google-cloud/storage');

// The name of the bucket to access, e.g. "my-bucket"
// const bucketName = "my-bucket";

// The name of the local file to upload, e.g. "./local/path/to/file.txt"
// const filename = "./local/path/to/file.txt";

// Instantiates a client
const storage = Storage();

// Uploads a local file to the bucket
