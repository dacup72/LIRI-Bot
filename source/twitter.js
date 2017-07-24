//needs exports

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
