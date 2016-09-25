var express = require('express');
var bodyParser = require('body-parser');
var request1 = require('sync-request');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
 
app.post("/message", function (request, response) {
  console.log(request.body); 
  var message = request.body; //JSON.parse(request.body);
  var messageArray = message.Body.split(" ");
  var from = message.From;
  console.log(messageArray);
  // console.log(!isNaN(messageArray[1]));
  // console.log(messageArray[2].toUpperCase === "FAMILY");
  if(!(messageArray.length < 3) && messageArray[0].toUpperCase() === "register".toUpperCase() && !isNaN(messageArray[1]) && (messageArray[2].toUpperCase() === "FAMILY" || messageArray[2].toUpperCase() === "SENIOR" || messageArray[2].toUpperCase() === "SPECIAL")){
    console.log(messageArray[1] + " " + from);
    response.send("<Response><Message>You are subscribed to receive alerts when new homes are available.</Message></Response>")
  
  var db = "https://autobots-nagesh-sk.c9users.io/api/user/subscribe"
    
   var post_data = {
     'phone' : message.From,
    'zipcode' : messageArray[1],
    'category': messageArray[2].toLowerCase()
  };
  
  var res = request1('POST', db, {
    json: post_data
  });
  console.log(post_data);
    
  } else {
    console.log("other")
    response.send("<Response><Message>Hello! \n Subscribe to San Jose affordable homes by replying \n register &lt;zipcode&gt; &lt;type of home&gt; \nType of home can be: family, senior, special</Message></Response>")
  }
  response.send("<Response><Message>Hello</Message></Response>")
});
 
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
 
var listener = app.listen(8082, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});