require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys");
var fs = require("fs");

var source = process.argv[2];
var input = "";

userInput(source, input);

function userInput(source, input) {
  switch (source) {
    case "my-tweets":
    pullTweets();
    break;

    case "spotify-this-song":
    var title = input;
      if (title === "") {
        findSong();
      } else {
        pullSong(title)
      }
      break;

    case "movie-this":
    var movie = input;
      if (title === "") {
        findMovie("The Rock");
      } else {
        pullMovie(movie)
      }
      break;

    case "do-what-it-says":
    doWhatItSays();
    break;
  }
}

function pullTweets() {
  var client = new Twitter(keys.Twitter);

var params = {screen_name: '@Chris41913234', count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }

  
});
}

function pullSong() {
  var spotify = new Spotify(keys.Spotify);
 
spotify.search({ type: 'track', query: 'Hit me baby one more time' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(JSON.stringify(data,null, 2)); 
});
}