
require('dotenv').config();


// var twitter = require("./source/twitter.js");

var input1 = process.argv[2];
var input2 = process.argv[3];

switch (input1) {
  case "my-tweets":
    twitter();
    console.log(twitter);
    break;
  case "movie-this":
    movies();
    break;
  case "spotify-this-song":
    spotify();
    break;
  case "do-what-it-says":
    doIt();
    break;
}


//==============FUNCTIONS==================


function spotify() {
  var spotify = require('spotify');

  spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    if ( err ) {
      console.log('Error occurred: ' + err);
      return;
    }
    console.log(data);
  });
}


function twitter() {
  var twitter = require('twitter');
  var keys = require('./keys.js');
  var client = new twitter(keys.twitterKeys);
  var params = {screen_name: 'Dylan Acup'};

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
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
    return(SearchResult.imdbid);
  }
  imdb.getReq({ id: 'movieId', opts: {apiKey: '40e9cece'} }).then(console.log)
}



function doIt() {

}
