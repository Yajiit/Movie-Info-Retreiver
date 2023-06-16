var watchedEl = document.getElementById("watched");
var card = document.createElement('div');
var localWatched = [];
var posterBtn = document.getElementsByClassName('listPoster')
var selectedMovie;
var selectedMovieData;
card.className = "card";

document.addEventListener('DOMContentLoaded', function() {
    if(JSON.parse(localStorage.getItem("savedWatched")).length != 0) {
        localWatched = (JSON.parse(localStorage.getItem("savedWatched")));
        console.log(localWatched)
        for(var i=0; i<localWatched.length; i++){
            card.innerHTML = `
            <input type="image" src=${localWatched[i].Poster} class="listPoster" id="${localWatched[i].Title}" value=${i}>
            `
            watchedEl.appendChild(card);
            card = document.createElement('div');
            card.className = "card";
        }
    } else {
        watchedEl.innerHTML = `
        <h2>Nothing to See</h2>
        <h4>You haven't added anything to your watched yet, search some movies you've watched and save them here</h4>
        `
    }
    $(".listPoster").click(function(event) {
        event.preventDefault();
        console.log(localWatched);
        selectedMovie = $(this).val();
        console.log(selectedMovie);
        selectedMovieData = {
            Title: localWatched[selectedMovie].Title,
            Poster: localWatched[selectedMovie].Poster,
            Rated: localWatched[selectedMovie].Rated,
            Actors: localWatched[selectedMovie].Actors,
            Ratings: localWatched[selectedMovie].Ratings,
            Plot: localWatched[selectedMovie].Plot,
            imdbId: localWatched[selectedMovie].imdbID,
            Year: localWatched[selectedMovie].Year,
            val: selectedMovie
        }
        console.log(selectedMovieData)
        localStorage.setItem("selectedMovie", JSON.stringify(selectedMovieData));
        document.location.href = "movie.html";
    })
});