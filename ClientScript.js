function createSelection(books){
    let array = books;

    //Create and append select list
    var selectList = document.createElement("select");
    selectList.id = "mySelect";
    myParent.appendChild(selectList);

    //Create and append the options
    for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
        option.value = array[i];
        option.text = array[i];
        selectList.appendChild(option);
    }
}

function getBooksList(){
    fetch('http://localhost:9000/books')
    .then(res => res.json())
    .then(data=>console.log(data))
}