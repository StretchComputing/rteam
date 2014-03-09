'use strict';

var Person = require('./models/person');

// handles POST: /persons
exports.create = function (req, res , next){
	// TODO check for all required fields and build complete object to send to Person.create()

	// TODO -- store Base64 photo in file system, store path in neo
	var photoPath = "/fake/for/now";

	// TODO -- no idea how to interface with voice API yet, but store signature ID in neo
	var voiceSignatureId = "123456890";

	Person.create({
      name: req.params.name,
      photoPath: photoPath,
      voiceSignatureId: voiceSignatureId
  }, function (err, person) {
      if (err) return next(err);
      res.send(201, {
        name: person.name,
        photoPath: person.photoPath,
        voiceSignatureId: person.voiceSignatureId
      });
      return next();
  });
};


// handles GET: /persons
exports.getToken = function (req, res , next){
	var username = req.params.username;
	var password = req.params.password;

	if(success) {
		return next();
	} else {
		return next(err);
	}
};

