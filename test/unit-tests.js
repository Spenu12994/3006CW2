var chai = require('chai');
var chaiHttp = require('chai-http');
var chaiAsPromised = require('chai-as-promised');
let server = require("../server");
let functions = require("../functions");
var should = chai.should();
var done = chai.done;
chai.use(chaiHttp);
chai.use(chaiAsPromised);

// chai.request('http://localhost:9000/').get("/hello") // Act.
//         .end(function(error, response) {
//         chai.assert.equal(response.status, 200); // Assert.
//         });
//     })
console.log("this is the server" + server);



suite("Suite routes", function(){

    suiteSetup(function(){
        
    });

    test("Test hello function", function() {
        let result = functions.returnHello();
        chai.assert.isString(result, "Result should be string");
        chai.assert.equal(result, "hello", "Result should say 'hello'");
        
    })

    test("test server function", function(){
         server.returnHello().then(
            function(value){
                chai.assert.isString(value,"Result should be string");
                chai.assert.equal(value, "hello", "result should say hello");
            }
        );
    })

    test("test GET /hello", function(){
        let app = server.app;
        chai.request(app).get("/hello")
        .end(function(error, response){
            chai.assert.equal(response.status, 200);
        })
    })

    test("Test login function (good login)", function() {
        return Promise.resolve(functions.checkLoginDetailTest("test1", "testpass1")).should.eventually.equal(1);
        
    })

    test("Test login function (bad login)", function() {
        return Promise.resolve(functions.checkLoginDetailTest("test1", "wrongPassword")).should.eventually.equal(0);
    });


    test("Testing User Creating", function(){
        return Promise.resolve(functions.createUser()).should.eventually.equal(1);
    });

    test("Testing User Deletion", function(){
        return Promise.resolve(functions.deleteUser()).should.eventually.equal(0);
    });

    test("Testing Book Creating", function(){
        return Promise.resolve(functions.createBook()).should.eventually.equal(1);
    });

    test("Testing Book Deletion", function(){
        return Promise.resolve(functions.deleteBook()).should.eventually.equal(0);
    });

    suiteTeardown(function(){
        server.closeServer();
    });
});