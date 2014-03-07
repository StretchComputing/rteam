// person.js
// Person model logic.

var neo4j = require('neo4j');
// TODO  keep db definition in this file?
var db = new neo4j.GraphDatabase(process.env.NEO4J_URL || 'http://localhost:7474');

// constants:

var INDEX_NAME = 'nodes';
var INDEX_KEY = 'type';
var INDEX_VAL = 'person';

var EXPERT_IN_REL = 'expertIn';
var EXPERIENCE_WITH_REL = 'experienceWith';
var LEARNING_REL = 'learning';

// constructor is exported: this allows other modules to call the static methods defined below
var Person = module.exports = function Person(_node) {
    // all we'll really store is the node; the rest of our properties will be
    // derivable or just pass-through properties (see below).
    this._node = _node;
}

// public instance properties:

Object.defineProperty(Person.prototype, 'id', {
    get: function () { return this._node.id; }
});

Object.defineProperty(Person.prototype, 'exists', {
    get: function () { return this._node.exists; }
});

Object.defineProperty(Person.prototype, 'name', {
    get: function () {
        return this._node.data['name'];
    },
    set: function (name) {
        this._node.data['name'] = name;
    }
});

// private instance methods:

Person.prototype._getExpertInRel = function (skill, callback) {
    var query = [
        'START person=node({personId}), skill=node({skillId})',
        'MATCH (person) -[rel?:EXPERT_IN_REL]-> (skill)',
        'RETURN rel'
    ].join('\n')
        .replace('EXPERT_IN_REL', EXPERT_IN_REL);

    var params = {
        userId: this.id,
        otherId: other.id,
    };

    db.query(query, params, function (err, results) {
        if (err) return callback(err);
        var rel = results[0] && results[0]['rel'];
        callback(null, rel);
    });
};

///////////////////////////////////////////////////////////////////////////
// public instance methods: inherited by any instance of the Person 'class'
///////////////////////////////////////////////////////////////////////////

Person.prototype.save = function (callback) {
    this._node.save(function (err) {
        callback(err);
    });
};

Person.prototype.del = function (callback) {
    this._node.del(function (err) {
        callback(err);
    }, true);   // true = yes, force it (delete all relationships)
};

Person.prototype.follow = function (other, callback) {
    this._node.createRelationshipTo(other._node, 'follows', {}, function (err, rel) {
        callback(err);
    });
};

Person.prototype.unfollow = function (other, callback) {
    this._getFollowingRel(other, function (err, rel) {
        if (err) return callback(err);
        if (!rel) return callback(null);
        rel.del(function (err) {
            callback(err);
        });
    });
};

// calls callback w/ (err, following, others) where following is an array of
// users this user follows, and others is all other users minus him/herself.
Person.prototype.getFollowingAndOthers = function (callback) {
    // query all users and whether we follow each one or not:
    var query = [
        'START user=node({userId}), other=node:INDEX_NAME(INDEX_KEY="INDEX_VAL")',
        'MATCH (user) -[rel?:FOLLOWS_REL]-> (other)',
        'RETURN other, COUNT(rel)'  // COUNT(rel) is a hack for 1 or 0
    ].join('\n')
        .replace('INDEX_NAME', INDEX_NAME)
        .replace('INDEX_KEY', INDEX_KEY)
        .replace('INDEX_VAL', INDEX_VAL)
        .replace('FOLLOWS_REL', FOLLOWS_REL);

    var params = {
        userId: this.id,
    };

    var user = this;
    db.query(query, params, function (err, results) {
        if (err) return callback(err);

        var following = [];
        var others = [];

        for (var i = 0; i < results.length; i++) {
            var other = new Person(results[i]['other']);
            var follows = results[i]['COUNT(rel)'];

            if (user.id === other.id) {
                continue;
            } else if (follows) {
                following.push(other);
            } else {
                others.push(other);
            }
        }

        callback(null, following, others);
    });
};

///////////////////////////////////////////////////////
// static methods: methods of the constructor function
///////////////////////////////////////////////////////
Person.get = function (id, callback) {
    db.getNodeById(id, function (err, node) {
        if (err) return callback(err);
        callback(null, new Person(node));
    });
};

Person.getAll = function (callback) {
    db.getIndexedNodes(INDEX_NAME, INDEX_KEY, INDEX_VAL, function (err, nodes) {
        // if (err) return callback(err);
        // FIXME the index might not exist in the beginning, so special-case
        // this error detection. warning: this is super brittle!
        // the better and correct thing is to either ensure the index exists
        // somewhere by creating it, or just use Neo4j's auto-indexing.
        // (the Heroku Neo4j add-on doesn't support auto-indexing currently.)
        if (err) return callback(null, []);
        var users = nodes.map(function (node) {
            return new Person(node);
        });
        callback(null, users);
    });
};

// Create Person
// required fields were validated by calling routine, so no need to do it here
Person.create = function (person, callback) {
		console.log("entering Person.create()");
    var query = [
        "CREATE (n:TYPE {props})",
        "RETURN n",
    ].join('\n')
        .replace('TYPE','PERSON');
    var params = {
        props: person,
    };
    db.query(query, params, function (err, results) {
        if(err) return callback(err);
        // key of return node comes from "RETURN n" in cypher query above
        var node = results[0].n;
        var person = new Person(node);
				callback(null, personIdn);

				// don't see why any of the following code is needed. The save seems redundant with the Cypher code above.
        //node.save(function (err) {
            //if (err) return callback(err);
            // for neo4j 2.0, there's auto auto-indexingg
            //node.index(INDEX_NAME, INDEX_KEY, INDEX_VAL, function (err) {
            //    if (err) return callback(err);
                		//callback(null, user);
            //});
        //});
    });
};