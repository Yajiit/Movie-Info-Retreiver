var watchedEl = document.getElementById("watched");
var card = document.createElement('div');
var localWatched = [];
var posterBtn = document.getElementsByClassName('listPoster')
var selectedMovie;
var selectedMovieData;
card.className = "card card-custom";

document.addEventListener('DOMContentLoaded', function() {
    if(JSON.parse(localStorage.getItem("savedWatched")) != null) {
        localWatched = (JSON.parse(localStorage.getItem("savedWatched")));
        console.log(localWatched)
        for(var i=0; i<localWatched.length; i++){
            card.innerHTML = `
            <input type="image" src=${localWatched[i].poster} class="listPoster" id="${localWatched[i].title}" value=${i}>
            `
            watchedEl.appendChild(card);
            card = document.createElement('div');
            card.className = "card";
        }
    } else {
        console.log("didn't work")
    }
    $(".listPoster").click(function(event) {
        event.preventDefault();
        console.log(localWatched);
        selectedMovie = $(this).val();
        console.log(selectedMovie);
        selectedMovieData = {
            title: localWatched[selectedMovie].title,
            poster: localWatched[selectedMovie].poster,
            ageRating: localWatched[selectedMovie].ageRating,
            actors: localWatched[selectedMovie].actors,
            criticalRatings: localWatched[selectedMovie].criticalRatings,
            plot: localWatched[selectedMovie].plot,
            imdbId: localWatched[selectedMovie].imdbID,
            year: localWatched[selectedMovie].year,
            val: selectedMovie
        }
        console.log(selectedMovieData)
        localStorage.setItem("selectedMovie", JSON.stringify(selectedMovieData));
        document.location.href = "movie.html";
    })
});