var Person = require('./models/person');

exports.create = function (req, res , next){
	// TODO check for all required fields and build complete object to send to Person.create()
	Person.create({
      name: req.body['name']
  }, function (err, user) {
      if (err) return next(err);
      // TODO bulid JSON return
  });
};


exports.getToken = function (req, res , next){
	var username = req.params.username;
	var password = req.params.password;

	if(success) {
		return next();
	} else {
		return next(err);
	}
};

