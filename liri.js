
require('dotenv').config();
var keys = require("./keys");

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

// console.log(keys);


var userInput = process.argv;




//==============FUNCTIONS==================

// Writes to the log.txt file
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
  if (songName === undefined) {
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


function twitter() {
  var twitter = require('twitter');
  var keys = require('./keys.js');
  var client = new twitter(keys.twitterKeys);
  var params = { screen_name: 'Dylan Acup' };

  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length && i < 20; i++) {
        console.log(tweets[i].text);
        console.log("--------------------");
      }
    }
  });
}


function movies() {
  var imdb = require('imdb-api');

  function getId(movieId) {
    imdb.search({
      title: 'Toxic Avenger'
    }, {
        apiKey: '40e9cece'
      }).then(console.log).catch(console.log);
    return (SearchResult.imdbid);
  }
  imdb.getReq({ id: 'movieId', opts: { apiKey: '40e9cece' } }).then(console.log)
}



// DECIDER
switch (userInput[2]) {
  case "my-tweets":
    twitter();
    break;
  case "movie-this":
    movies();
    break;
  case "spotify-this-song":
    getSpotify(userInput[3]);
    break;
  case "do-what-it-says":
    doIt();
    break;
}
