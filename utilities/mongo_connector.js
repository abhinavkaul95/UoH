const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongoose = require("mongoose");

// MongoDB configurations
const url = process.env.MONGODB_URL || 'mongodb://localhost:27017/';
const dbName = process.env.MONGODB_DATABASE || 'uoh_health_care_centre';
const dbPath = url + dbName
mongoose.connect(dbPath, {
    useNewUrlParser: true,
});
mongoose.connection.on("error", () => {
    console.log("> error occurred from the database");
}).once("open", () => {
    console.log("> successfully opened the database");
});
module.exports = mongoose;
/*const find = function (db, collection, callback) {
    // Find documents from the collection
    collection.find().toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        return result;
    });
}

const insert_many = function (db, collection, ins_data, callback) {
    // Insert some documents
    collection.insertMany(ins_data, function (err, result) {
        assert.equal(err, null);
        console.log("Inserted documents into", collection.namespace);
        callback(result);
    });
}

const insert_one = function (db, collection, doc, callback) {
    // Insert one documents
    collection.insertOne(doc, function (err, result) {
        assert.equal(err, null);
        console.log("Inserted one document into", collection.namespace);
        callback(result);
    });
}

// Use connect method to connect to the server and close after use
var mongo_op = function mongo_op(operation, coll, ins_data) {
    var result;
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        const collection = db.collection(coll);
        res = operation(db, collection, ins_data, function () {
            client.close();
        });
    });
}

module.exports.mongo_op = mongo_op;
module.exports.find = find;
module.exports.insert_many = insert_many;
module.exports.insert_one = insert_one;*/