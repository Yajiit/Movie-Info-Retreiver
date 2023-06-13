var watchedEl = document.getElementById("watched");
var card = document.createElement('div');
var localWatched = [];
card.className = "card card-custom";

document.addEventListener('DOMContentLoaded', function() {
if(JSON.parse(localStorage.getItem("savedWatched")) != null) {
    localWatched = (JSON.parse(localStorage.getItem("savedWatched")));
    console.log(localWatched)
    for(var i=0; i<localWatched.length; i++){
        card.innerHTML = `
        <input type="image" src=${localWatched[i].poster} class="listPoster" id="${localWatched[i].title}">
        `
        watchedEl.appendChild(card);
        card = document.createElement('div');
        card.className = "card card-custom";
    }
} else {
    console.log("didn't work")
}
});