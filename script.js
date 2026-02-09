    var grid = document.getElementById('grid-container');
var form = document.getElementById('addMovieForm');
let movies;

//load movies from JSON file
if(localStorage.getItem('customMovies')){ //checks if there are custom movies in localStorage
    movies = JSON.parse(localStorage.getItem('customMovies'));
    if (grid) {
        createMovieCard();
    }
} else{
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            movies = JSON.parse(request.responseText);
            localStorage.setItem('customMovies', JSON.stringify(movies)); // Store movies in localStorage for later use
            if (grid) {
                createMovieCard();
            }
        }
    };

    request.open("GET", "movieList.json", true);
    request.send();
}

// Function to create and display a movie card
function createMovieCard(movie) {
function createMovieCard() {
    grid.innerHTML = '';

    movies.forEach(function(movie) {
    let card = document.createElement("div");
    card.classList.add("card");

    let castList = movie.cast.join(', ') 
    let genresList = movie.genres.join(', ')

    let textData =
        "<div class='movie-title'>" + movie.title + "</div>" +
        "<div class='movie-year'>Released: " + movie.year + "</div>";

    if (movie.cast) {
        textData += "<div class='movie-cast'>Cast: " + castList + "</div>";
        textData += "<div class='movie-cast'>Cast: " + movie.cast.join(', ') + "</div>";
    }
    textData += "<div class='movie-genres'>Genres: " + genresList + "</div>";

    card.innerHTML = textData;
    textData += "<div class='movie-genres'>Genres: " + movie.genres.join(', ') + "</div>";

    if (movie.thumbnail) {
        card.style.backgroundImage = "url(" + movie.thumbnail + ")";
    }

    return card;
}

// Load JSON movies
function loadJSONMovies() {
    const req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (req.readyState === 4 && req.status === 200) {
            let movies = JSON.parse(req.responseText);
            const gridContainer = document.getElementById('grid-container');

                movies.forEach(function(movie) {
                    gridContainer.appendChild(createMovieCard(movie));
                });
        }
    }

    req.open("GET", "movieList.json", true);
    req.send();
}

// Load custom added movies from localStorage
function loadCustomMovies() {
    let customMovie = localStorage.getItem('customMovies') || '[]'; // Default to empty array if no custom movies
    const customMovies = JSON.parse(customMovie); 
    const gridContainer = document.getElementById('grid-container');

    if (gridContainer && customMovies.length > 0) {
        customMovies.forEach(function(movie) {
            gridContainer.appendChild(createMovieCard(movie));
        });
    }
}

// Handle form submission
const form = document.getElementById('addMovieForm');
if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const title = document.getElementById('title').value;
        const year = parseInt(document.getElementById('year').value); //parseInt to convert string to number
        const genre = document.getElementById('genre').value;

        // Create new movie object
        const newMovie = {
            title: title,
            year: year,
            genres: [genre], // Store genre as an array 
            cast: []
        };

        // Get existing custom movies from localStorage
        let customMovie = localStorage.getItem('customMovies') || '[]'; // Default to empty array if no custom movies
        let customMovies = JSON.parse(customMovie);
        customMovies.push(newMovie);
        localStorage.setItem('customMovies', JSON.stringify(customMovies));//takes new customMovies and turns it back to JSON

        // Show success message
        const result = document.querySelector('.result');
        if (result) { //checks if result exists
            result.style.display = 'block';
        }

        // Optionally redirect to home page after 1 second
        setTimeout(()=>{
            window.location.href = 'index.html';
        }, 1000);
    card.innerHTML = textData;
    grid.appendChild(card);
    });
}
};

//form submission
if (form) {
    let titleInput = document.getElementById('title');
    let yearInput = document.getElementById('year');
    let genreInput = document.getElementById('genre');

//Save current movie list displayed
function saveMovieList() {
    // Extract movie data from each card (this assumes you have the data stored)
    // Since we're already managing custom movies, we just save them
    let customMovies = localStorage.getItem('customMovies') || '[]';
    
    // Save custom movies
    const saveData = {
        customMovies: JSON.parse(customMovies)
    form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Create new movie object
    var newMovie = {
        title: titleInput.value,
        year: parseInt(yearInput.value), //parseInt to convert string to number
        genres: [genreInput.value], // Store genre as an array 
        cast: []
    };

    movies.push(newMovie);
    localStorage.setItem('customMovies', JSON.stringify(movies));//takes new customMovies and turns it back to JSON

    localStorage.setItem('savedMovieList', JSON.stringify(saveData));
    
    // Show confirmation message
    alert('Movie list saved successfully!');
}
    if(grid){ 
        createMovieCard();
    }

// Load saved movie list
function loadMovieList() {
    const saveData = localStorage.getItem('savedMovieList');
    if (!saveData) {
        alert('No saved movie list found!');
        return;
    // Show success message
    const result = document.querySelector('.result');
    if (result) { //checks if result exists
        result.style.display = 'block';
    }
    
    const parsedData = JSON.parse(saveData);
    
    // Clear current custom movies and restore saved ones
    localStorage.setItem('customMovies', JSON.stringify(parsedData.customMovies));
    
    // Set flag to indicate we're in load mode
    localStorage.setItem('loadMode', 'true'); //fixes issue where movies weren't loading properly
    
    alert('Movie list loaded! Refreshing page...');
    window.location.reload();
}

const save = document.getElementById('save');
if (save) {
    save.addEventListener('click', function(event) {
        event.preventDefault();
        saveMovieList();
    });
}
    // Optionally redirect to home page after 1 second
    setTimeout(()=>{
        window.location.href = 'index.html';
    }, 1000);

const load = document.getElementById('load');
if (load) {
    load.addEventListener('click', function(event) {
        event.preventDefault();
        loadMovieList();
    form.reset();
    });
}
// Load movies when page loads
window.addEventListener('DOMContentLoaded', function() {
    loadJSONMovies();
    
    // Only load custom movies if user clicked Load button
    const isLoadMode = localStorage.getItem('loadMode') === 'true';
    if (isLoadMode) {
        loadCustomMovies();
        // Clear the flag after loading
        localStorage.removeItem('loadMode');
    }
});
