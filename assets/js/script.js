// EventListener adds when the page loads
document.addEventListener('DOMContentLoaded', function() {
  // adds event listener to searchButton
    const searchButton = document.getElementById('searchButton');
    // when searchButton is clicked execute function searchMovie
    searchButton.addEventListener('click', searchMovie);
});

var imdbId;
var movieObject;

var watchlistButton = document.createElement('button');
var watchedButton = document.createElement('button');
watchlistButton.addEventListener('click', watchlistAdd)
watchedButton.addEventListener('click', watchedAdd)

watchlistButton.innerHTML = "Add to Watchlist";
watchedButton.innerHTML = "Add to Watched";
watchlistButton.className="listButtons";
watchedButton.className="listButtons";

var localWatched = [];
var watched = [];
var localWatchlist = [];
var watchlist = [];

function watchedAdd() {
  if(JSON.parse(localStorage.getItem("savedWatched")) != null) {
    localWatched = (JSON.parse(localStorage.getItem("savedWatched")));
  };
  watched = localWatched;
  watched.push(movieObject);
  localStorage.setItem("savedWatched", JSON.stringify(watched));
  console.log(watched);
  console.log(localStorage.savedWatched);
}

function watchlistAdd() {
  if(JSON.parse(localStorage.getItem("savedWatchlist")) != null) {
    localWatchlist = (JSON.parse(localStorage.getItem("savedWatchlist")));
  };
  watchlist = localWatchlist;
  watchlist.push(movieObject);
  localStorage.setItem("savedWatchlist", JSON.stringify(watchlist));
  console.log(watchlist);
  console.log(localStorage.savedWatchlist);
}

  // searchMovie function to fetch movie info
  function searchMovie(event) {
    // prevent form submission
    event.preventDefault();
    // grabs the text field with id searchInput from html and sets it as variable called input
    const input = document.getElementById('searchInput');
    // grabs the entered text value from the input and sets it as query
    const query = input.value;
  
    // fetch through omdb api
    fetch(`https://www.omdbapi.com/?apikey=f26b11a3&t=${query}`)
    // take the response and parse w JSON
      .then(response => response.json())
      // take the parsed response and runs as "data"
      .then(data => {
        // omdb api's parsed JSON object has a "Response" property that will return as "True" when a valid title is searched.
        // we can check the data.Response property to see if a valid movie was found 
        if (data.Response === "True") {
       // saves JSON response to local storage
        localStorage.setItem('movieInfo', JSON.stringify(data));
          // Retrieve the IMDB ID. This will be used for the Watchmode api's fetch
          const imdbId = data.imdbID;
  
          // DISABLED TO SAVE API USES
          // Call the getSources function with the IMDB ID
          // getSources(imdbId);

                    // Call the getRecommendations function with the movie title
                    getRecommendations(data.Title);
                    // Call the getTrailer function with the movie title
                    getTrailer(data.Title);
                    
        // grabs the movieInfo <div> and sets as variable
        const movieInfo = document.getElementById('movieInfo');
        // creates a blank string called ratingsHTML to later be filled with a forEarch loop of all the available critic/user ratings
        let ratingsHTML = "";
        // forEach loop to go over each "Ratings" property in the JSON object data
        data.Ratings.forEach(rating => {
          // appends each one to the ratingsHTML string as its own paragraph with the source and score value of each critic/user rating
          // within the JSON object data property "Ratings" each user/critic score has it's own "Source" and "Value" property stored separately
          ratingsHTML += `<p>${rating.Source}: ${rating.Value}</p>`;
        });



        movieObject = {
          title: data.Title,
          poster: data.Poster,
          plot: data.Plot,
          imdbId: data.imdbID
        }
        // creats a template literal string that dynamically replaces any content in the movieInfo with the retrieved JSON data arranged in a readable form
        moviePoster.innerHTML = `<img src="${data.Poster}" alt="${data.Title} Poster">`;

        movieInfo.innerHTML = `
          <h2>${data.Title}</h2>
          <p>Year: ${data.Year}</p>
          <p>Rating: ${data.Rated}</p>
          <p>Director: ${data.Director}</p>
          <p>Starring: ${data.Actors}</p>
          <p>Plot Synopsis: ${data.Plot}</p>
          ${ratingsHTML}
        `;

        movieInfo.append(watchlistButton);
        movieInfo.append(watchedButton);

        // applies <h2> tag to the movie Title for CSS styling, then adds a paragraph for each other retrieved JSON data property, including the ratingsHTML assembled earlier
        // other available properties from omdb api's JSON data include: Runtime, Genre, Writer, Language

        // if the Reponse property of the JSON data is not True then display a not found message
      } else { 
        // grabs movieInfo div from html
        const movieInfo = document.getElementById('movieInfo');
        // sets content of movieInfo to Movie not found message
        movieInfo.innerHTML = `<p>Movie not found!</p>`;
      }
    })

    // if an error is caught during the fetch then log it to the console
    .catch(error => {
      console.log(error);
    });
}
  
  // Function to fetch sources using Watchmode API
  function getSources(titleId) {
    // puts the imdb titleID into a fetch request
    fetch(`https://api.watchmode.com/v1/title/${titleId}/details/?apiKey=WPmG7Zz5vHjq40wGf0WSfvoq2z6F38BSqO3r9xPe&append_to_response=sources`)
    // parses resopnse as JSON object
      .then(response => response.json())
      // runs that JSON response object as data
      .then(data => {
      // saves JSON response to local storage
      localStorage.setItem('sources', JSON.stringify(data));
        console.log(data); // Logs the response data to the console
  
      // if conditional to check that there are more than zero sources fetched
      if (data.sources && data.sources.length > 0) {
        // assigns array of streaming sources from data to variable "sources"
        const sources = data.sources;
        console.log(sources); // Log the sources to the console
  
        // Remove duplicates from the sources array based on name
        // extracts all source names into an array with sources.map(source => source.name)
        // that array passes through "new Set()" to remove duplicate names
        // then uses Array.from() to create another array and puts the non duplicated names into it
        const uniqueSources = Array.from(new Set(sources.map(source => source.name)))
         
        // uses sources.find() to invoke a callback function on each element in the sources array
        // each "name" property of the element "source" is compared to the current name being mapped and returns the element if a match is found
        .map(name => sources.find(source => source.name === name));
  
        // grabs the sourcesList div and makes into variable
        const sourcesList = document.getElementById('sourcesList');
          // maps an array of each source.name property with list item tags then joins them together into a single string
        const sourcesHTML = uniqueSources.map(source => `<li>${source.name}</li>`).join('');
          // takes the list items from sourcesHTML and puts them into a unordered list at the sourcesList <div>
          sourcesList.innerHTML = `<ul>${sourcesHTML}</ul>`;
        } else {
          // if there number of sources is 0, displays "No sources found" message
          const sourcesList = document.getElementById('sourcesList');
          sourcesList.innerHTML = `<p>No sources found for this title ID.</p>`;
        }
      })
      // if an error is caught log it to the console and displays error on page
      .catch(error => {
        console.log(error);
        const sourcesList = document.getElementById('sourcesList');
        sourcesList.innerHTML = `<p>Error: ${error.message}</p>`;
      });
  }

  // Function to fetch YouTube video
function getTrailer(title) {
  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(title)}%20trailer&type=video&key=AIzaSyBjlHZovY7E-pNRbyj040cVvcy0jPcF1PI`, {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101 Safari/537.36'
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch trailer from YouTube API.');
      }
      return response.json();
    })
    .then(data => {
      if (data.items && data.items.length > 0) {
        const trailerContainer = document.getElementById('trailerContainer');
        const videoId = data.items[0].id.videoId; // Assuming the first video is the trailer

        trailerContainer.innerHTML = `
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
      } else {
        const trailerContainer = document.getElementById('trailerContainer');
        trailerContainer.innerHTML = `<p>No trailer found for this title.</p>`;
      }
    })
    .catch(error => {
      console.log(error);
      const trailerContainer = document.getElementById('trailerContainer');
      trailerContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

  // Function to fetch recommendations
function getRecommendations(title) {
  fetch(`https://www.omdbapi.com/?apikey=f26b11a3&s=${encodeURIComponent(title)}`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "True" && data.Search) {
        const recommendationsContainer = document.getElementById('recommendations');
        recommendationsContainer.innerHTML = '';

        data.Search.forEach(result => {
          const recommendation = document.createElement('div');
          recommendation.classList.add('recommendation');

          const poster = document.createElement('img');
          poster.src = result.Poster;
          poster.alt = result.Title;

          const title = document.createElement('p');
          title.textContent = result.Title;

          recommendation.appendChild(poster);
          recommendation.appendChild(title);
          recommendationsContainer.appendChild(recommendation);
        });
      } else {
        const recommendationsContainer = document.getElementById('recommendations');
        recommendationsContainer.innerHTML = `<p>No recommendations found.</p>`;
      }
    })
    .catch(error => {
      console.log(error);
      const recommendationsContainer = document.getElementById('recommendations');
      recommendationsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}


  document.addEventListener('DOMContentLoaded', function() {
    // retrieve the movieInfo data from local storage
    const movieData = JSON.parse(localStorage.getItem('movieInfo'));
  
    // check if previous movieData exists in local storage
    if (movieData) {
      // retrieve info from the movieData
      const {
        Title,
        Year,
        Rated,
        Director,
        Actors,
        Plot,
        Ratings,
        Poster
      } = movieData;
  
      // retrieve the movieInfo element
      const movieInfo = document.getElementById('movieInfo');
      // create a string to display ratings
      let ratingsHTML = "";
      // use foreach to create a line per rating
      Ratings.forEach(rating => {
        ratingsHTML += `<p>${rating.Source}: ${rating.Value}</p>`;
      });
  
      // Create the HTML content to display the movie information
      moviePoster.innerHTML = `<img src="${Poster}" alt="${Title} Poster"> `
      const htmlContent = `
        <h2>${Title}</h2>
        <p>Year: ${Year}</p>
        <p>Rating: ${Rated}</p>
        <p>Director: ${Director}</p>
        <p>Starring: ${Actors}</p>
        <p>Plot Synopsis: ${Plot}</p>
        ${ratingsHTML}
      `;
  
      // Set the HTML content to the movieInfo element
      movieInfo.innerHTML = htmlContent;
      movieInfo.append(watchlistButton);
      movieInfo.append(watchedButton);
    }});
