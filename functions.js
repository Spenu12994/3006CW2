let server = require("./server");
let bookID;

function returnHello(){
    return "hello";
}

async function checkLoginDetailTest(usr,pass){
    let list = [{"_id":"6592ee5e9314688eba9940fc","username":"test1","password":"testpass1"},
    {"_id":"6593254a2978ad23f6a420a4","username":"test2","password":"testpass2"},
    {"_id":"659325582978ad23f6a420a5","username":"test3","password":"testpass3"},
    {"_id":"6593255f2978ad23f6a420a6","username":"test4","password":"testpass4"}]
    let result = await server.checkLoginDetails(usr, pass,list);
    return result;
}

async function createUser(){
    await server.createUser("SuiteTest", "SuiteTestPass");
    return (await server.findUser("SuiteTest"));
}

async function deleteUser(){
    await server.deleteUser("SuiteTest");
    return (await server.findUser("SuiteTest"));
}

async function createBook(){
    bookID = await server.createBook("SuiteBookTest");
    return (await server.findBook("SuiteBookTest"));
}

async function deleteBook(){
    await server.deleteBook(bookID);
    return (await server.findBook("SuiteBookTest"));
}

module.exports.returnHello = returnHello;
module.exports.checkLoginDetailTest = checkLoginDetailTest;

module.exports.createUser = createUser;
module.exports.deleteUser = deleteUser;

module.exports.createBook = createBook;
module.exports.deleteBook = deleteBook;