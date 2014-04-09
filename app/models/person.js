'use strict';
// person.js
// Person model logic.

var neo4j = require('neo4j'),
		// TODO  keep db definition in this file?
		db = new neo4j.GraphDatabase(process.env.NEO4J_URL || 'http://localhost:7474'),
		fs = require('fs'),

	// Sublime linter has weird rules about indenting literals.
	constants = Object.freeze({
		indexName: 'nodes',
		indexKey: 'type',
		indexVal: 'person',
		expertInRel: 'expertIn',
		experienceWithRel: 'experienceWith',
		learningRel: 'learning',
		imagePath: './filestore/images/'
	});

// constructor is exported: this allows other modules to call the static methods defined below
var Person = module.exports = function (node) {
	this.getData = function () {
		return node.data;
	};

	this.getId = function () {
		return node.id;
	};
};


// // private instance methods:
// // example code: not used in rTeam
// Person.prototype._getExpertInRel = function (skill, callback) {
// 	var query = [
// 			'START person=node({personId}), skill=node({skillId})',
// 			'MATCH (person) -[rel?:EXPERT_IN_REL]-> (skill)',
// 			'RETURN rel'
// 		].join('\n')
// 		.replace('EXPERT_IN_REL', constants.expertInRel),

// 		params = {
// 			userId: this.id,
// 			otherId: other.id,
// 		};

// 	db.query(query, params, function (err, results) {
// 		if (err) { return callback(err); }
// 		var rel = results[0] && results[0].rel;
// 		callback(null, rel);
// 	});
// };

///////////////////////////////////////////////////////////////////////////
// privileged instance methods: inherited by any instance of the Person 'class'
///////////////////////////////////////////////////////////////////////////
Object.defineProperty(Person.prototype, 'id', {
	get: function () { return this.getId(); }
});

Object.defineProperty(Person.prototype, 'name', {
	get: function () {
		return this.getData().name;
	},
	set: function (name) {
		this.getData().name = name;
	}
});

Object.defineProperty(Person.prototype, 'uniqId', {
	// TODO support generating this from name/phone/email qualifiier.
	get: function () { return this.getData().name.replace(' ', '.'); }
});

Object.defineProperty(Person.prototype, 'base64image', {
	get: function () {
		fs.readFile(constants.imagePath + this.uniqId, function (err, data) {
			if (err) { throw err; }
			console.log('Person.get.base64image', 'succeeded');
			return data;
		});
	},
	set: function (base64image) {
		this.saveImage(base64image);
	}
});

Object.defineProperty(Person.prototype, 'voiceSignatureId', {
	get: function () {
		return this.getData().voiceSignatureId;
	},
	set: function (voiceSignatureId) {
		this.getData().voiceSignatureId = voiceSignatureId;
	}
});

Object.defineProperty(Person.prototype, 'deviceSignature', {
	get: function () {
		return this.getData().deviceSignature;
	},
	set: function (deviceSignature) {
		this.getData().deviceSignature = deviceSignature;
	}
});

Object.defineProperty(Person.prototype, 'token', {
	get: function () {
		return this.getData().token;
	},
	set: function (token) {
		this.getData().token = token;
	}
});

Object.defineProperty(Person.prototype, 'expert1', {
	get: function () {
		return this.getData().expert1;
	},
	set: function (expert1) {
		this.getData().expert1 = expert1;
	}
});

Object.defineProperty(Person.prototype, 'expert2', {
	get: function () {
		return this.getData().expert2;
	},
	set: function (expert2) {
		this.getData().expert2 = expert2;
	}
});

Object.defineProperty(Person.prototype, 'learning', {
	get: function () {
		return this.getData().learning;
	},
	set: function (learning) {
		this.getData().learning = learning;
	}
});

Object.defineProperty(Person.prototype, 'notificationFrequency', {
	get: function () {
		return this.getData().notificationFrequency;
	},
	set: function (notificationFrequency) {
		this.getData().notificationFrequency = notificationFrequency;
	}
});


// calls callback w/ (err, following, others) where following is an array of
// users this user follows, and others is all other users minus him/herself.
// example code: not used in rTeam
// Person.prototype.getFollowingAndOthers = function (callback) {
//     // query all users and whether we follow each one or not:
//     var query = [
//         'START user=node({userId}), other=node:INDEX_NAME(INDEX_KEY="INDEX_VAL")',
//         'MATCH (user) -[rel?:FOLLOWS_REL]-> (other)',
//         'RETURN other, COUNT(rel)'  // COUNT(rel) is a hack for 1 or 0
//     ].join('\n')
//         .replace('INDEX_NAME', constants.indexName)
//         .replace('INDEX_KEY', constants.indexKey)
//         .replace('INDEX_VAL', constants.indexVal)
//         .replace('FOLLOWS_REL', constants.followsRel);

//     var params = {
//         userId: this.id,
//     };

//     var user = this;
//     db.query(query, params, function (err, results) {
//         if (err) return callback(err);

//         var following = [];
//         var others = [];

//         for (var i = 0; i < results.length; i++) {
//             var other = new Person(results[i]['other']);
//             var follows = results[i]['COUNT(rel)'];

//             if (user.id === other.id) {
//                 continue;
//             } else if (follows) {
//                 following.push(other);
//             } else {
//                 others.push(other);
//             }
//         }

//         callback(null, following, others);
//     });
// };

///////////////////////////////////////////////////////
// static methods: methods of the constructor function
///////////////////////////////////////////////////////
// example code: not used in rTeam
// Person.get = function (id, callback) {
//     db.getNodeById(id, function (err, node) {
//         if (err) return callback(err);
//         callback(null, new Person(node));
//     });
// };

// example code: not used in rTeam
// Person.getAll = function (callback) {
//     db.getIndexedNodes(constants.indexName, constants.indexKey, constants.indexVal, function (err, nodes) {
//         // if (err) return callback(err);
//         // FIXME the index might not exist in the beginning, so special-case
//         // this error detection. warning: this is super brittle!
//         // the better and correct thing is to either ensure the index exists
//         // somewhere by creating it, or just use Neo4j's auto-indexing.
//         // (the Heroku Neo4j add-on doesn't support auto-indexing currently.)
//         if (err) return callback(null, []);
//         var users = nodes.map(function (node) {
//             return new Person(node);
//         });
//         callback(null, users);
//     });
// };

// Create Person
// required fields were validated by calling routine, so no need to do it here
// person parm: JS object literal containing all person properties to persist
Person.create = function (person, callback) {
	console.log('entering Person.create()');
	var query = [
			'CREATE (n:TYPE {props})',
			'RETURN n',
		].join('\n')
		.replace('TYPE', 'PERSON'),

		base64image = person.base64image,

		params = {
			props: {
				name: person.name,
				deviceSignature: person.deviceSignature,
				voiceSignatureId: person.voiceSignatureId,
				token: Person.createToken()
			}
		};

	db.query(query, params, function (err, results) {
		console.log('entering db.query callback');
		if (err) { return callback(err); }
    // key of return node comes from "RETURN n" in cypher query above
    var node = results[0].n,
				person = new Person(node);

		// person.base64image = base64image;
		person.saveImage(base64image);

    callback(null, person);
	});
};

Person.getToken = function (person, callback) {
	console.log('entering Person.getToken() personName = ', person.name);
	var query = [
			'MATCH (n)',
			'WHERE n.name = {personName}',
			'RETURN n',
		].join('\n'),

		params = {
			personName: person.name
		};

	db.query(query, params, function (err, results) {
		console.log('entering getToken db.query callback results = ', results);
		if (err) { return callback(err); }
    // key of return node comes from "RETURN n" in cypher query above
    var node = results[0].n,
				person = new Person(node);

		console.log('after creating new Person from retrieved node');
		console.log('Person retrieved from db in getToken', person.token);
		// TODO get the base64 image from the file
		// person.saveImage(base64image);
		// person.base64image = base64image;

    callback(null, person);
	});
};

Person.get = function (person, callback) {
	console.log('entering Person.get() token = ', person.token);
	var query = [
			'MATCH (n)',
			'WHERE n.token = {token}',
			'RETURN n',
		].join('\n'),

		params = {
			token: parseFloat(person.token)
		};

	db.query(query, params, function (err, results) {
		console.log('entering get db.query callback results = ', results);
		if (err) { return callback(err); }
    // key of return node comes from "RETURN n" in cypher query above
    var node = results && results[0].n,
				person;

		if (!node) {
			return callback();
		}

		person = new Person(node);

		// TODO get the base64 image from the file
		// person.saveImage(base64image);
		// person.base64image = person.getImage();

    callback(null, person);
	});
};

Person.update = function (person, callback) {
	console.log('entering Person.update() token = ', person.token);
	var query = [
			'MATCH (n)',
			'WHERE n.token = {token}',
			'SET n.expert1 = {expert1},',
			'n.expert2 = {expert2},',
			'n.learning = {learning},',
			'n.notificationFrequency = {notificationFrequency}',
			'RETURN n',
		].join('\n'),

		params = {
			token: parseFloat(person.token),
			expert1: person.expert1 || '',
			expert2: person.expert2 || '',
			learning: person.learning || '',
			notificationFrequency: person.notificationFrequency || ''
		};

	db.query(query, params, function (err, results) {
		console.log('entering update db.query callback results = ', results);
		if (err) { return callback(err); }
    // key of return node comes from "RETURN n" in cypher query above
    var node = results && results[0].n,
				person;

		if (!node) {
			return callback();
		}

		person = new Person(node);

		// TODO get the base64 image from the file
		// person.saveImage(base64image);
		// person.base64image = person.getImage();

    callback(null, person);
	});
};

Person.createToken = function () {
	// TODO create a 40 character hash
	var min = 4000000,
			max = 10000000000;
	return Math.random() * (max - min) + min;
};

Person.prototype.saveImage = function (base64image) {
	fs.writeFile(constants.imagePath + this.uniqId, base64image, function (err) {
		if (err) { throw err; }
		console.log('saveImage', 'file written successfully');
	});
};
