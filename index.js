console.log ("js console");

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
        let games = JSON.parse(xhttp.responseText);
        console.log(game[0].title);
    }
};

xhttp.open("GET","list.json",true);
xhttp.send();
