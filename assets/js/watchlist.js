var watchlistEl = document.getElementById("watchlist");
var card = document.createElement('div');
var localWatchlist = [];
var posterBtn = document.getElementsByClassName('listPoster')
var selectedMovie;
var selectedMovieData;
card.className = "card";

document.addEventListener('DOMContentLoaded', function() {
    if(JSON.parse(localStorage.getItem("savedWatchlist")) != null) {
        localWatchlist = (JSON.parse(localStorage.getItem("savedWatchlist")).filter(item => item !== null));
        console.log(localWatchlist)
        for(var i=0; i<localWatchlist.length; i++){
            card.innerHTML = `
            <input type="image" src=${localWatchlist[i].poster} class="listPoster" id="${localWatchlist[i].title}" value="${[i]}">
            `
            watchlistEl.appendChild(card);
            card = document.createElement('div');
            card.className = "card";
        }
    } else {
        console.log("didn't work")
    }
    $(".listPoster").click(function(event) {
        event.preventDefault();
        console.log(localWatchlist);
        selectedMovie = $(this).val();
        console.log(selectedMovie);
        selectedMovieData = {
            title: localWatchlist[selectedMovie].title,
            poster: localWatchlist[selectedMovie].poster,
            ageRating: localWatchlist[selectedMovie].ageRating,
            actors: localWatchlist[selectedMovie].actors,
            criticalRatings: localWatchlist[selectedMovie].criticalRatings,
            plot: localWatchlist[selectedMovie].plot,
            imdbId: localWatchlist[selectedMovie].imdbID,
            year: localWatchlist[selectedMovie].year,
            val: selectedMovie
        }
        console.log(selectedMovieData)
        localStorage.setItem("selectedMovie", JSON.stringify(selectedMovieData));
        document.location.href = "movie.html";
    })
});