import * as chai from 'chai';
import chaiHttp from 'chai-http'

chai.use(chaiHttp);
let server = require("../server");


suite("suire routes", function(){
    test("Test GET /hello", function(){
        let app = server.app;
        chai.request(app).get("/hello")
            .end(function(error, response){
                chai.assert.equal(response.status, 200);
            })
    })
})