// Import required modules.
let http = require("http");
const { MongoClient, ServerApiVersion } = require('mongodb');
let mongoose = require("mongoose");

var express = require('express');
let socketIo = require("socket.io");

var app = express();
let server = http.createServer(app);

let functions = require("./functions");

// Connect to MongoDB.

let url = "mongodb+srv://spencerunderhill:HfENVb6xReiYYmx4@cluster0.nm23cgo.mongodb.net/LibraryDB?retryWrites=true&w=majority";
mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true});

// Define a Schema.
let loginSchema = new mongoose.Schema({_id: mongoose.ObjectId, username: String, password: String});
// Define a Model.
let loginModel = mongoose.model("logins", loginSchema);

// Define a Schema.
let bookSchema = new mongoose.Schema({_id: mongoose.Schema.ObjectId, Name: String, TakenOut: String, id: String});
// Define a Model.
let bookModel = mongoose.model("books", bookSchema);




let bookList;
let loginList;

allBooksRoute();
allLoginRoute();



//get login details
async function listAllLogin() {
    let login = await loginModel.find();
    return login;
}

async function allLoginRoute() {
    let login = await listAllLogin();
    loginList = login;
}

//get books
async function listAllBooks() {
    let books = await bookModel.find();
    return books;
}

async function allBooksRoute() {
    let books = await listAllBooks();
    bookList = books;
}

async function checkoutBook(id, user){
    console.log("updating");
    bookModel.findById(id).then(
        function(value){
            value.TakenOut = user;
            
            value.save();
            allBooksRoute();
        },
        function(error){
            console.log(error);
        }
    );
}

async function ReturnBook(id){
        console.log("returning");
        bookModel.findById(id).then(
            function(value){
                value.TakenOut = "n/a";
                
                value.save();
                allBooksRoute();
            },
            function(error){
                console.log(error);
            }
        );


    }

async function refreshBook(){
        bookModel = mongoose.model("books", bookSchema);
        await allBooksRoute();
    }


//check login details
async function checkLoginDetails(user, pass){

    let foundLogin = false;
    loginList.forEach((element)=>{
        if(element.username == user){
            if(element.password == pass){
                foundLogin = true;
            }
        }
    });
    if(foundLogin == true){
        return 1;
    }
    else{
        return 0;
    }
}

//testing
async function returnHello(){
    return functions.returnHello();
}



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.get('/success', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/hello', (req, res) => {
    res.send("Hello!");
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

    let recievedMessage = event.data;

    try{
        
        recievedMessage = JSON.parse(event.data);

        let funcResult;
        
        if(recievedMessage.messageType == "login"){
            //run function with promise
            checkLoginDetails(recievedMessage.username,recievedMessage.password, recievedMessage.id).then(
                function(value){
                    //if we get our value
                    funcResult = value;

                    //populate table with value and messenger id
                    let resultObj = {
                        result: funcResult,
                        id: recievedMessage.id
                    }

                    //send the success code to all clients (this will be filtered based on their ID)
                    sockserver.clients.forEach(client => {
                        client.send(JSON.stringify(resultObj));
                    })
                
                },
                function(error){
                    console.log("error" + error);
                }
            )
        }
        else if(recievedMessage.messageType == "selection"){
            //take out the book
            if(recievedMessage.bookID != 0){
                checkoutBook(recievedMessage.bookID, recievedMessage.username);
            }
            sockserver.clients.forEach(client => {
                allBooksRoute();
                console.log('distributing refresh');
                client.send('refresh');
            })


        }

        else if(recievedMessage.messageType == "return"){
            //take out the book
            if(recievedMessage.bookID != 0){
                ReturnBook(recievedMessage.bookID);
            }
            sockserver.clients.forEach(client => {
                refreshBook();
                console.log('distributing refresh');
                client.send('refresh');
            })
        }    
    }
    catch{
        recievedMessage = event.data;
        console.log("recieved string");
    }
    
 

   sockserver.clients.forEach(client => {
     console.log(`distributing message: "Hi There"`)
     client.send(`Hi There`)
   })
 }
 ws.onerror = function () {
   console.log('websocket error')
 }
});

module.exports.app = app;
module.exports.returnHello = returnHello;