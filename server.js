// Import required modules.
let http = require("http");
const { MongoClient, ServerApiVersion } = require('mongodb');
let mongoose = require("mongoose");

var express = require('express');
let socketIo = require("socket.io");

var app = express();
let server = http.createServer(app);

// Connect to MongoDB.
let url = "mongodb+srv://spencerunderhill:HfENVb6xReiYYmx4@cluster0.nm23cgo.mongodb.net/LibraryDB?retryWrites=true&w=majority";
mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true});

// Define a Schema.
let moduleSchema = new mongoose.Schema({_id: mongoose.ObjectId, Name: String, TakenOut: String});
// Define a Model.
let Module = mongoose.model("books", moduleSchema);

let bookList;

allBooksRoute();

async function listAllBooks() {
    let books = await Module.find();
    return books;
}

async function allBooksRoute() {
    let books = await listAllBooks();
    bookList = books;
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static('public'));

app.use('/books', (req,res)=>{
    res.json(bookList);
})

app.listen(9000, () => {
    console.log("Server listening on Port 9000.");
});


const { WebSocketServer } = require('ws')
const sockserver = new WebSocketServer({ port: 456 })

sockserver.on('connection', ws => {
 console.log('New client connected!')
ws.binaryType = "arraybuffer";
ws.binaryType = "blob";
 ws.send('connection established')
 ws.on('close', () => console.log('Client has disconnected!'))
 ws.onmessage = function(event){

    if(typeof event.data === String){
        console.log("recieved string");
    }

   console.log(typeof event.data);
   let recievedMessage = event.data;
   
   console.log(recievedMessage);

   sockserver.clients.forEach(client => {
     console.log(`distributing message: "Hi There"`)
     client.send(`Hi There`)
   })
 }
 ws.onerror = function () {
   console.log('websocket error')
 }
});


