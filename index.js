var neo4j = require('neo4j');
var server = require("./server/server");

server.start();
var db = new neo4j.GraphDatabase('http://localhost:7474');

//var node = db.createNode({hello: 'world'});     // instantaneous, but...
//node.save(function (err, node) {    // ...this is what actually persists.
//    if (err) {
//        console.error('Error saving new node to database:', err);
//    } else {
//        console.log('Node saved to database with id:', node.id);
//    }
//});