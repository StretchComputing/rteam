// no model for this resource as of yet

exports.world = function (req, res, next) {
	// name param must be defined for routing to have gotten here
	console.log("entered server.respondToHello()");
  res.send('hello ' + req.params.name);
  return next();
};
