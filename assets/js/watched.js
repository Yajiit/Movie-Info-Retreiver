var watchedEl = document.getElementById("watched");
var card = document.createElement('div');
var localWatched = [];
card.className = "card card-custom";
card.setAttribute("style", "width: 18rem;");

document.addEventListener('DOMContentLoaded', function() {
if(JSON.parse(localStorage.getItem("savedWatched")) != null) {
    localWatched = (JSON.parse(localStorage.getItem("savedWatched")));
    console.log(localWatched)
    for(var i=0; i<localWatched.length; i++){
        card.innerHTML = `<img src=${localWatched[i].Poster} class="card-img-top" alt=${localWatched[i].Title}>
        <div class="card-body">
          <h5 class="card-title">${localWatched[i].Title}</h5>
          <p class="card-text">${localWatched[i].Plot}</p>
          <a href="#" class="btn btn-primary">See More</a>
        </div>`
        watchedEl.appendChild(card);
        card = document.createElement('div');
        card.className = "card card-custom";
        card.setAttribute("style", "width: 18rem;");
    }
} else {
    console.log("didn't work")
}
});