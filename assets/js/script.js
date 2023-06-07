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
      .then(response => response.json())
      .then(data => {
        if (data.Response === "True") {
          // Retrieve the IMDB ID
          const imdbId = data.imdbID;
  
          // Call the getSources function with the IMDB ID
          getSources(imdbId);
  
          // Rest of your code for displaying movie info
          const movieInfo = document.getElementById('movieInfo');
          let ratingsHTML = "";
          data.Ratings.forEach(rating => {
            ratingsHTML += `<p>${rating.Source}: ${rating.Value}</p>`;
          });
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
          const movieInfo = document.getElementById('movieInfo');
          movieInfo.innerHTML = `<p>Movie not found!</p>`;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  // Function to fetch sources using Watchmode API
  function getSources(titleId) {
    fetch(`https://api.watchmode.com/v1/title/${titleId}/details/?apiKey=WPmG7Zz5vHjq40wGf0WSfvoq2z6F38BSqO3r9xPe&append_to_response=sources`)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the response data to the console
  
        // Rest of your code for displaying the sources
        if (data.sources && data.sources.length > 0) {
          const sources = data.sources;
          console.log(sources); // Log the sources to the console
  
          // Remove duplicates from the sources array based on name
          const uniqueSources = Array.from(new Set(sources.map(source => source.name)))
            .map(name => sources.find(source => source.name === name));
  
          const sourcesList = document.getElementById('sourcesList');
          const sourcesHTML = uniqueSources.map(source => `<li>${source.name}</li>`).join('');
          sourcesList.innerHTML = `<ul>${sourcesHTML}</ul>`;
        } else {
          const sourcesList = document.getElementById('sourcesList');
          sourcesList.innerHTML = `<p>No sources found for this title ID.</p>`;
        }
      })
      .catch(error => {
        console.log(error);
        const sourcesList = document.getElementById('sourcesList');
        sourcesList.innerHTML = `<p>Error: ${error.message}</p>`;
      });
  }