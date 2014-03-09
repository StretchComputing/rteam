var http = require("http");
var restify = require('restify');
var hello = require('./helloResource');
var person = require('./personResource');

function start() {

  ///////////////
  // init Restify
  ///////////////
	var server = restify.createServer();
	server.use(restify.acceptParser(server.acceptable));
	server.use(restify.authorizationParser());
	server.use(restify.dateParser());
	// parsed URL content will always be available in req.query
	server.use(restify.queryParser());
	// request data into a JavaScript object on the server automatically
	server.use(restify.bodyParser());
	// configures CORS support
	server.use(restify.CORS());
	server.use(restify.gzipResponse());
	server.use(restify.throttle({
	  burst: 100,
	  rate: 50,
	  ip: true,
	  overrides: {
	    '192.168.1.1': {
	      rate: 0,        // unlimited
	      burst: 0
	    }
	  }
	}));
	server.use(restify.conditionalRequest());

	//////////
	// Routing
	//////////

	// hello resource routing
	server.get('/hello/:name', hello);
	server.head('/hello/:name', hello);

	// person resource routing
	var PERSON_PATH = '/persons'
	server.get({path : PERSON_PATH , version : '0.1.0'} , person.getToken);
	server.post({path : PERSON_PATH , version: '0.1.0'}, person.create);
	//server.del({path : PERSON_PATH +'/:jobId' , version: '0.1.0'} ,deleteJob);

	///////////////
	// start server
	///////////////
	server.listen(8888, function() {
	  console.log('%s listening at %s', server.name, server.url);
	});

}

exports.start = start;
