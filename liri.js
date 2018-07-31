//node packages and keys file
require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys.js");
var fs = require("fs");


// var logging = function(artist) {
//   return artist.name;
// };

var user = function(caseData, functionData) {
  
  switch (caseData){
  case "my-tweets":
  pullTweets();
  break;
  case "spotify-this-song":
  pullSong(functionData);
  break;
  case "movie-this":
  movie(functionData);
  break;
  case "do-what-it-says":
  doWhatItSays(functionData);
  break;
  default:
  console.log("I dont know");
}
};

//pull tweets from throw account
var pullTweets = function() {
  var client = new Twitter(keys.twitter);
  var params = { screen_name: '@Chris41913234', count: 20};

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log('Error: ' + error);
    return;
  } else {
    for (var i = 0;i < tweets.length; i++) {
      console.log(tweets[i].created_at);
      console.log("");
      console.log(tweets[i].text);
    }
  }
  });
};

//pull songs from spotify
var pullSong = function (songName) {
  if (songName === undefined) {
    songName = "What's my age again";
  }
spotify.search({ type: 'track', query: songName + '&limit=1&'}, function(err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  } var output = data.tracks.items; 
  for (var i = 0; i < data.tracks.items.length; i++) {
    console.log[i];
    console.log("Artist: " + output[i].artists.map(logging));
    console.log("song name: " + songs[i].name);
    console.log("preview song: " + songs[i].preview_url);
    console.log("album: " + songs[i].album.name);
    console.log("-----------------------------------");
  }
});
// console.log(JSON.stringify(data,null, 2)); 
};


var movie = function(movieName) {
  var urlMovie = "http://omdapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  request (urlMovie, function(err, res, body) {
    if (err) {
      console.log('Error: ' + err);
     
      var returnJSON = JSON.parse(body);
      var output = ("Tite: " + returnJSON.Title + ", " + "Year: " + returnJSON.Year + "," + "Rated: " + returnJSON.Rated + 
      ", " + "IMDB Rating: " + returnJSON.imdbRating + ", " + "Country: " + returnJSON.Country + "," + "Language: " + 
      returnJSON.Language + ", " + "Plot: " + returnJSON.Plot + ", " + "Actors/Actresses: " + returnJSON.Actors + ", " +
      "Tomato Rating: " + returnJSON.Ratings[1].Value);

      console.log(output);
    }
  });
};

var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);
    var dataA = data.split(", ");
    if (dataA.length === 2) {
      user(dataA[0], dataA[1]);
    } else if 
      (dataA.length === 1) {
      user(dataA[0]);
      }
  });
};

var run = function(argOne, argTwo) {
  user(argOne, argTwo);
};
run(process.argv[2], process.argv[3]);