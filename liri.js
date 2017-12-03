
require('dotenv').config();
var keys = require("./keys");

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");



// Writes data to the log.txt file
var writeToLog = function (data) {
  fs.appendFile("log.txt", JSON.stringify(data) + "\n", function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("log.txt was updated!");
  });
};



// SPOTIFY
var spotify = new Spotify(keys.spotify);

var getArtistNames = function (artist) {
  return artist.name;
};

var getSpotify = function (songName) {
  if (!songName) {
    songName = "What's my age again";
  }

  spotify.search({ type: "track", query: songName }, function (err, data) {
    if (err) {
      console.log("Error occurred: " + err);
      return;
    }

    var songs = data.tracks.items;
    var data = [];

    for (var i = 0; i < songs.length; i++) {
      data.push({
        "artist(s)": songs[i].artists.map(getArtistNames),
        "song name: ": songs[i].name,
        "preview song: ": songs[i].preview_url,
        "album: ": songs[i].album.name
      });

      console.log(`
        \nSong ${i + 1}.
        \n- Artist(s): ${songs[i].artists.map(getArtistNames)}
        \n- Album: ${songs[i].album.name}
        \n- Song Name: ${songs[i].name}
        \n- Preview Song Here: ${songs[i].preview_url}
      `)
    }

    writeToLog(data);
  });
};



// TWITTER
var getTweets = function (screenName) {
  var client = new Twitter(keys.twitter);

  if (!screenName) {
    screenName = "realDonaldTrump";
  }

  var params = { screen_name: screenName };

  client.get("statuses/user_timeline", params, function (error, tweets, response) {
    if (!error) {
      var data = [];
      // console.log(JSON.stringify(tweets[0].created_at, null, 2));

      console.log(`\n===== Tweets for @${screenName} =====`)

      for (var i = 0; i < 20; i++) {
        data.push({
          created_at: tweets[i].created_at,
          text: tweets[i].text
        });

        console.log(`
        \nTweet ${i + 1}.
        \n- Created_at: ${tweets[i].created_at}
        \n- Text: ${tweets[i].text}
      `);
      }

      writeToLog(data);
    }
  });
};


// OMDB
var getMovie = function (movieName) {
  if (!movieName) {
    movieName = "Mr Nobody";
  }

  var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

  request(urlHit, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var jsonData = JSON.parse(body);

      var data = {
        "Title:": jsonData.Title,
        "Year:": jsonData.Year,
        "Rated:": jsonData.Rated,
        "IMDB Rating:": jsonData.imdbRating,
        "Country:": jsonData.Country,
        "Language:": jsonData.Language,
        "Plot:": jsonData.Plot,
        "Actors:": jsonData.Actors,
        "Rotten Tomatoes Rating:": jsonData.Ratings[1].Value
      };

      console.log(data);
      writeToLog(data);
    }
  });
};


// DO WHAT IT SAYS (random.txt)
var doIt = function () {

}


// USERINPUT
var userInput = process.argv;

// SWITCHER
switch (userInput[2]) {
  case "my-tweets":
    getTweets(userInput[3]);
    break;
  case "movie-this":
    getMovie(userInput[3]);
    break;
  case "spotify-this-song":
    getSpotify(userInput[3]);
    break;
  case "do-what-it-says":
    doIt();
    break;
  default:
    console.log(`
      \n========== Please Enter Valid Input ==========
      \n  $ node liri.js my-tweets "YOUR_SCREEN_NAME"
      \n  $ node liri.js movie-this "YOUR_MOVIE_TITLE"
      \n  $ node liri.js spotify-this-song "YOUR_SONG_NAME"
      \n  $ node liri.js do-what-it-says
      \n==============================================
    `)
}
