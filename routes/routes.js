
/*
 * routes/routes.js
 * 
 * Routes contains the functions (callbacks) associated with request urls.
 */

var http = require('http');
var request = require('request'); // library to make requests to remote urls
var Q = require('q'); // library for javascript promises
var moment = require("moment"); // date manipulation library
var Model = require("../models/model.js"); //db model... call like Model.Topic

//Twilio
var twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

/*
	GET /
*/
exports.index = function(req, res) {
	
	console.log("main page requested");

		//build and render template
		var viewData = {
			pageTitle : "ITP January"
		}

		res.render('index.html', viewData);

}

exports.twilioCallback =  function(req,res){

	console.log(req);
	
  var body = ''; // will hold the body of the message

  req.on('data', function(data) {
    console.log('got here');
    body += data;
  });

  req.on('end', function() {
  	console.log('got here 2');
    //Create TwiML response
    var twilioResp = new twilio.TwimlResponse();

    twilioResp.sms('Thanks, your message of "' + body + '" was received!');

   res.writeHead(200, {'Content-Type': 'text/xml'});
   res.end(twilioResp.toString());
   });

}
