// Import required modules.
let http = require("http");
const { MongoClient, ServerApiVersion } = require('mongodb');
let mongoose = require("mongoose");

var express = require('express');
var app = express();

// Connect to MongoDB.
let url = "mongodb+srv://spencerunderhill:HfENVb6xReiYYmx4@cluster0.nm23cgo.mongodb.net/LibraryDB?retryWrites=true&w=majority";
mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true});

// Define a Schema.
let moduleSchema = new mongoose.Schema({_id: mongoose.ObjectId, Name: String, TakenOut: String});
// Define a Model.
let Module = mongoose.model("books", moduleSchema);

async function listAllModules() {
    let modules = await Module.find();
    return modules;
}

async function allModulesRoute(response) {
    let modules = await listAllModules();
    response.write(JSON.stringify(modules));
    response.end()
}

// let server = http.createServer(function(request, response) {
//     allModulesRoute(response);
// });

app.get('/', (req, res) => {
    allModulesRoute(res);
    res.sendFile(__dirname + '/index.html');
});

app.listen(9000, () => {
    console.log("Server listening on Port 9000.");
});

// server.listen(9000, function() {
//     console.log("Listening on 9000");
// });