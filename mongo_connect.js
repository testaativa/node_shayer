// var MongoClient = require('mongodb').MongoClient;
var {MongoClient, ObjectID} = require('mongodb'); //object destructuring
var url = 'mongodb://localhost:27017/shayer';

module.exports.connect = function connect(callback) {
    MongoClient.connect(url, function(err, conn){
        if(err){
            console.log('Unable to connect to database');
        }
        /* exports the connection */
        module.exports.db = conn.db('shayer');
        callback(err);
    });
};
