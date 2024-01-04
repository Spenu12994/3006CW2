let server = require("./server");


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

module.exports.returnHello = returnHello;
module.exports.checkLoginDetailTest = checkLoginDetailTest;