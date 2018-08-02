//node packages and keys file
require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys.js");
var fs = require("fs");

//log artist globally
var artiststs = function(artist) {
  return artist.name;
};



//pull tweets from throw account
var pullTweets = function() {
  var client = new Twitter(keys.twitter);
  var params = { screen_name: '@Chris41913234', count: 20};

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
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
  var spotify = new Spotify(keys.spotify);
  spotify.search({ type: 'track', query: songName + '&limit=1&'}, function(err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  } var output = data.tracks.items; 
  for (var i = 0; i < data.tracks.items.length; i++) {
    console.log[i];
    console.log("Artist: " + output[i].artists.map(artiststs));
    console.log("song name: " + output[i].name);
    console.log("preview song: " + output[i].artists.website);
    console.log("album: " + output[i].album.name);
  }
});

// console.log(JSON.stringify(data,null, 2)); 
//Couldn't get stringify to work
};


var movie = function(movieName) {
  if (movieName === undefined) {
    movieName = "The Rock";
  }
  var urlMovie = "http://www.omdapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=73851bf7";
  request (urlMovie, function(err, res, body) {
    if (!err && res.statusCode === 200) {     
      var returnJSON = JSON.parse(body);
      console.log("Title: " + returnJSON.Title);
      console.log("Year: " + returnJSON.Year);
      console.log("Rated: " + returnJSON.Rated);
      console.log("IMDB Rating: " + returnJSON.imdbRating);
      console.log("Country: " + returnJSON.Country);
      console.log("Language: " + returnJSON.Language);
      console.log("Plot: " + returnJSON.Plot);
      console.log("Actors: " + returnJSON.Actors);
      console.log("Rotten Tomatoes Rating: " + returnJSON.Ratings[1].Value);
    }    
  });
};

var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);
    var dataA = data.split(",");
    if (dataA.length === 2) {
      user(dataA[0], dataA[1]);
    } else if 
      (dataA.length === 1) {
      user(dataA[0]);
      }
  });
};
//user chooses case(mispelled switch and made everything fail. Only took a week to figure out mispelling)
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
  doWhatItSays();
  break;
  default:
  console.log("I dont know");
}
};

var run = function(x, y) {
  user(x, y);
};
run(process.argv[2], process.argv[3]);