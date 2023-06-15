var watchlistEl = document.getElementById("watchlist");
var card = document.createElement('div');
var localWatchlist = [];
card.className = "card";
card.setAttribute("style", "width: 18rem;");

document.addEventListener('DOMContentLoaded', function() {
if(JSON.parse(localStorage.getItem("savedWatchlist")) != null) {
    localWatchlist = (JSON.parse(localStorage.getItem("savedWatchlist")).filter(item => item !== null));
    console.log(localWatchlist)
    for(var i=0; i<localWatchlist.length; i++){
        card.innerHTML = `<img src=${localWatchlist[i].Poster} class="card-img-top" alt=${localWatchlist[i].Title}>
        <div class="card-body">
          <h5 class="card-title">${localWatchlist[i].Title}</h5>
          <p class="card-text">${localWatchlist[i].Plot}</p>
          <a href="#" class="btn btn-primary">See More</a>
        </div>`
        watchlistEl.appendChild(card);
        card = document.createElement('div');
        card.className = "card";
        card.setAttribute("style", "width: 18rem;");
    }
} else {
    console.log("didn't work")
}
});