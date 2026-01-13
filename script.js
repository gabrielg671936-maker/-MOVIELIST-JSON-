
console.log("js console");

let data;
let grid = document.querySelector(".grid-container");

var xhttp = new XMLHtppRequest();

xhttp.onreadystatechange = function() {
if (this.readyState == 4 &&this.status ==200){

     data = JSON.parse(xhttp.responseText);
     console.log(data);


     data.forEach(function(game){
     let card = document.createElement("div");
     card.classList.add("card");

     let textData = 

     "<div class='game=title'>"+ game.title + "</div>" +
     "<span>" +
     "Publisher:" + game.publisher + "<br>" +
     "Release Date:" + game.releaseDate + "<br>" + 
     "Needs Research:" + 
     "</span>";

     card.innerHTML = textData;

    if(game.imgSrc) {

        card.style.backgroundImage = "url("+game.imgSrc + ")";
    }
    grid.appendChild(card);
     });

}
};

xhttp.open("GET","gamedata.json",true);
xhttp.send()











document.addEventListener("DOMContentLoaded", function () {

    fetch("list.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (movies) {
            const ul = document.getElementById("movie-list");

            movies.forEach(function (movie) {
                const li = document.createElement("li");
                li.textContent = movie.title + " (" + movie.year + ")";
                ul.appendChild(li);
            });
        })
        .catch(function (error) {
            console.error("Error loading JSON:", error);
        });

});
