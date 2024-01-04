var chai = require('chai');
var chaiHttp = require('chai-http');
let server = require("../server");
chai.use(chaiHttp);

suite("Suite routes", function(){
    test("Test GET /hello", function() {
        chai.request('http://localhost:9000/').get("/hello") // Act.
        .end(function(error, response) {
        chai.assert.equal(response.status, 200); // Assert.
        });
    })
});