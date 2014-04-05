'use strict';

var Person = require('./models/person');

// handles POST: /persons
exports.create = function (req, res , next){
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


// handles GET: /persons
exports.getToken = function (req, res , next){
	Person.getToken({
      name: req.query.name,
      //deviceSignature: req.query.deviceSignature,
  }, function (err, person) {
      if (err) return next(err);
      res.send(200, {
        token: person.token,
        // base64image: person.base64image
      });
      return next();
  });
};

