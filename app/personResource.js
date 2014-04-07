/* global exports */
'use strict';

var Person = require('./models/person');

// handles POST: /persons
exports.create = function (req, res, next) {
	// TODO check for all required fields and build complete object to send to Person.create()

	Person.create({
      name: req.params.name,
      base64image: req.params.base64image,
      deviceSignature: req.params.deviceSignature,
      voiceSignatureId: req.params.voiceSignatureId
  }, function (err, person) {
      if (err) return next(err);
      res.send(201, {
        token: person.token,
      });
      return next();
  });
};


// handles GET: /persons/token
exports.getToken = function (req, res, next) {
	Person.getToken({
    name: req.query.name,
    //deviceSignature: req.query.deviceSignature,
  }, function (err, person) {
    if (err) { return next(err); }
    res.send(200, {
      token: person.token,
      // base64image: person.base64image
    });
    return next();
  });
};

// handles GET: /persons
exports.get = function (req, res, next) {
	Person.get({
    token: req.query.token,
    //deviceSignature: req.query.deviceSignature,
  }, function (err, person, apiError) {
    if (err) { return next(err); }
    if (!person) {
			res.send(401);
    } else if (apiError) {
			res.send(422, apiError);
    } else {
			res.send(200, {
				name: person.name,
				base64image: person.base64image,
				expert1: person.expert1,
				expert2: person.expert2,
				learning: person.learning,
				notificationFrequency: person.notificationFrequency
			});
    }
		return next();
  });
};

// handles PUT: /persons
exports.update = function (req, res, next) {
	Person.update({
		expert1: req.params.expert1,
		expert2: req.params.expert2,
		learning: req.params.learning,
		notificationFrequency: req.params.notificationFrequency,
    token: req.params.token,
    //deviceSignature: req.query.deviceSignature,
  }, function (err, person, apiError) {
    if (err) { return next(err); }
    if (!person) {
			res.send(401);
    } else if (apiError) {
			res.send(422, apiError);
    } else {
			res.send(200);
    }
		return next();
  });
};

