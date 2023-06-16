document.addEventListener('DOMContentLoaded', function() {
    var localWatchlist = [];
    var localWatched = [];
    var watchedBtn = document.createElement('button');
    watchedBtn.innerHTML = "Add to Watched";
    watchedBtn.className="listButtons";
    watchedBtn.addEventListener('click', watchedAdd);
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
    if (movieData.Ratings.length > 0) {
        movieData.Ratings.forEach(rating => {
            ratingsHTML += `<p>${rating.Source}: ${rating.Value}</p>`;
        });
    }
  
    // Create the HTML content to display the movie information
    moviePoster.innerHTML = `<img src="${movieData.Poster}" alt="${movieData.Title} Poster" class="poster"> `
    const htmlContent = `
        <h2>${movieData.Title}</h2>
        <p>Year: ${movieData.Year}</p>
        <p>Rating: ${movieData.Rated}</p>
        <p>Director: ${movieData.Director}</p>
        <p>Starring: ${movieData.Actors}</p>
        <p>Plot Synopsis: ${movieData.Plot}</p>
        ${ratingsHTML}
    `;

    if(JSON.parse(localStorage.getItem("savedWatchlist")).length != 0) {
        localWatchlist = (JSON.parse(localStorage.getItem("savedWatchlist")));
    } else console.log('empty');

    if(JSON.parse(localStorage.getItem("savedWatched")).length != 0) {
        localWatched = (JSON.parse(localStorage.getItem("savedWatched")));
    } else console.log('empty');

    // Set the HTML content to the movieInfo element
    movieInfo.innerHTML = htmlContent;


    for (i=0; i<localWatchlist.length; i++) {
        if (localWatchlist[i].Title == movieData.Title) {
            movieInfo.append(watchlistRemoveBtn);
            let isMovieAlreadyAdded = false;
            for (let i = 0; i < localWatched.length; i++) {
                if (localWatched[i].Title === movieData.Title) {
                isMovieAlreadyAdded = true;
                break;
                }
            };
            if (!isMovieAlreadyAdded){
                movieInfo.append(watchedBtn);
            }
        }
    }

    function watchedAdd() {
        if(JSON.parse(localStorage.getItem("savedWatched")) != null) {
          localWatched = (JSON.parse(localStorage.getItem("savedWatched")));
        };
        let isMovieAlreadyAdded = false;
        for (let i = 0; i < localWatched.length; i++) {
          if (localWatched[i].Title === movieData.Title) {
            isMovieAlreadyAdded = true;
            break;
          }
        };
        if (!isMovieAlreadyAdded){
            localWatched.push(movieData);
            localStorage.setItem("savedWatched", JSON.stringify(localWatched));
            console.log(localWatched);
            console.log(localStorage.savedWatched);
        }
        watchlistRemove();
    }

    function watchlistRemove() {
        if(JSON.parse(localStorage.getItem("savedWatchlist")).length != 0){
            for (i=0; i<localWatched.length; i++) {
                if (localWatchlist[i].Title == movieData.Title) {
                    localWatchlist.splice(i, 1);
                    localStorage.setItem("savedWatchlist", JSON.stringify(localWatchlist));
                    console.log(localStorage.getItem("savedWatchlist"));
                    break;
                }
            }
        }
    }
});