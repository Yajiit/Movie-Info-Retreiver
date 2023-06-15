document.addEventListener('DOMContentLoaded', function() {
    var localWatchlist = [];
    var watchlistRemoveBtn = document.createElement('button');
    watchlistRemoveBtn.innerHTML = "Remove from Watchlist";
    watchlistRemoveBtn.className="listButtons";
    watchlistRemoveBtn.addEventListener('click', watchlistRemove);

    // retrieve the movieInfo data from local storage
    const movieData = JSON.parse(localStorage.getItem('selectedMovie'));
    console.log(movieData)

    const val = movieData.val
  
      // retrieve the movieInfo element
    const movieInfo = document.getElementById('movieInfo');
      // create a string to display ratings
    let ratingsHTML = "";
      // use foreach to create a line per rating
    if (movieData.criticalRatings.length > 0) {
        movieData.criticalRatings.forEach(rating => {
            ratingsHTML += `<p>${rating.Source}: ${rating.Value}</p>`;
        });
    }
  
    // Create the HTML content to display the movie information
    moviePoster.innerHTML = `<img src="${movieData.poster}" alt="${movieData.title} Poster" class="poster"> `
    const htmlContent = `
        <h2>${movieData.title}</h2>
        <p>Year: ${movieData.year}</p>
        <p>Rating: ${movieData.rating}</p>
        <p>Director: ${movieData.director}</p>
        <p>Starring: ${movieData.actors}</p>
        <p>Plot Synopsis: ${movieData.plot}</p>
        ${ratingsHTML}
    `;

    if(JSON.parse(localStorage.getItem("savedWatchlist")).length != 0) {
        localWatchlist = (JSON.parse(localStorage.getItem("savedWatchlist")));
    } else console.log('empty');

    // Set the HTML content to the movieInfo element
    movieInfo.innerHTML = htmlContent;


    for (i=0; i<localWatchlist.length; i++) {
        if (localWatchlist[i].title == movieData.title) {
            movieInfo.append(watchlistRemoveBtn);
        }
    }

    function watchlistRemove() {
        if(JSON.parse(localStorage.getItem("savedWatchlist")) != null){
            for (i=0; i<localWatchlist.length; i++) {
                if (localWatchlist[i].title == movieData.title) {
                    localWatchlist.splice(i, 1);
                    localStorage.setItem("savedWatchlist", JSON.stringify(localWatchlist));
                    console.log(localStorage.getItem("savedWatchlist"));
                }
            }
        }
    }
});