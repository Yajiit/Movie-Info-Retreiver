var watchlistEl = document.getElementById("watchlist");
var card = document.createElement('div');
var localWatchlist = [];
card.className = "card";

document.addEventListener('DOMContentLoaded', function() {
if(JSON.parse(localStorage.getItem("savedWatchlist")) != null) {
    localWatchlist = (JSON.parse(localStorage.getItem("savedWatchlist")).filter(item => item !== null));
    console.log(localWatchlist)
    for(var i=0; i<localWatchlist.length; i++){
        card.innerHTML = `
        <input type="image" src=${localWatchlist[i].poster} class="listPoster" id="${localWatchlist[i].title}">
        `
        watchlistEl.appendChild(card);
        card = document.createElement('div');
        card.className = "card";
    }
} else {
    console.log("didn't work")
}
});

function watchlistRemove(){
    console.log("hello")
}