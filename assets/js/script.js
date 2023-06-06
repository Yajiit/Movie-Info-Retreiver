// event listener for search button
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', searchMovie);
  });
  
// function to fetch movie info
function searchMovie() {
  const input = document.getElementById('searchInput');
  const query = input.value;

  // fetch through omdb api
  fetch(`https://www.omdbapi.com/?apikey=f26b11a3&t=${query}`)
//   parse through JSON and put into 'data'
    .then(response => response.json())
    .then(data => {
      // check if response is valid
      if (data.Response === "True") {
        // if valid, create varaible for movie info
        const movieInfo = document.getElementById('movieInfo');
        
        // putting the user/critic ratings into a single variable
        let ratingsHTML = "";
        data.Ratings.forEach(rating => {
          ratingsHTML += `<p>${rating.Source}: ${rating.Value}</p>`;
        });
        // adds data to the html element for movie info
        movieInfo.innerHTML = `
          <h2>${data.Title}</h2>
          <p>Year: ${data.Year}</p>
          <p>Rating: ${data.Rated}</p>
          <p>Director: ${data.Director}</p>
          <p>Starring: ${data.Actors}</p>
          <p>Plot Synopsis: ${data.Plot}</p>
          ${ratingsHTML}
          <img src="${data.Poster}" alt="${data.Title} Poster">
        `;
      } else {
        // if not valid give movie not found message
        const movieInfo = document.getElementById('movieInfo');
        movieInfo.innerHTML = `<p>Movie not found!</p>`;
      }
    })
    .catch(error => {
      // log errors
      console.log(error);
    });
}