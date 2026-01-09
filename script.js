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
