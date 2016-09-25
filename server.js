var express = require('express');
var app = express();

app.use(express.static('html'));
app.use(express.static('images'));
app.use(express.static('public'));
var bodyParser = require('body-parser');

var http = require("http");

var mysql  = require('mysql');


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'autobots'
});

connection.connect();


//HTTP to subscribe
app.post('/api/user/subscribe', function (req, res) {

    console.log("body is "+req.body);
    var body = req.body;
    
    var phone = body.phone;
    phone.replace(/\(|\)/g,'');
    phone.replace(/\-|/g,'');
    phone.replace(/\+|/g,'');
    console.log("Phone number is "+phone);

    var user = {
    
    phone: phone,
    email : body.email,
    zipcode : body.zipcode,
    
}


   connection.query('INSERT INTO user_info SET ?', user, function(err,res){
   if(err) throw err;

   console.log('Inserted :');
   });
   res.writeHeader(200, {"Content-Type": "application/json"});
   res.send();
  
});

app.get('/api/user/subscribe', function(req, res){

  var result =[];
  var queryStr = "select * from user_info";
  console.log("Query is "+queryStr);
  connection.query(queryStr, function(err, rows, fields) {
      if (!err){
        console.log('The solution is: ', rows);
		for(var i = 0; i<rows.length; i++){

			result.push(rows[i]);
		}
		  	res.send(result);
	}

      else{
        console.log('Error while performing Query.'+err);
      }
      });
});



app.delete('/api/user/subscribe/:phone/:zipcode', function (req, res){

    console.log(req.params.phone);
    var queryStr = 'DELETE FROM user_info WHERE phone like '+req.params.phone +" and zipcode like "+req.params.zipcode;
    var body = req.body;
    //Delete a record.
    connection.query(queryStr, function(err, res){
        if(err) throw err;
        else {
            console.log('An customer is removed.');
        }
    });
    res.send();

});

//HTTP to FAMILY INSERT
app.post('/api/houses/family', function (req, res) {

    console.log(req.body.name);
    var body = req.body;
    var user = {
    
    developer : body.developer,
    address: body.address,
    website : body.website,
    company : body.company,
    phone : body.phone,
    zipcode : body.zipcode
    
}


   connection.query('INSERT INTO family_house SET ?', user, function(err,res){
   if(err) throw err;

   console.log('Last inserted ID:',body.name);
   });
   res.writeHeader(200, {"Content-Type": "application/json"});
   res.end();
  
});

app.get('/api/houses/family', function(req, res){

  var result =[];
  var queryStr = "select * from family_house";
  console.log("Query is "+queryStr);
  connection.query(queryStr, function(err, rows, fields) {
      if (!err){
        console.log('The solution is: ', rows);
		for(var i = 0; i<rows.length; i++){

			result.push(rows[i]);
		}
		  	res.send(result);
	}

      else{
        console.log('Error while performing Query.'+err);
      }
      });
});

app.delete('/api/houses/family', function (req, res){

    var cust_id = req.body.cust_id;

    var queryStr = 'DELETE FROM family_house';
    var body = req.body; 
    //Delete a record.
    connection.query(queryStr, function(err, res){
        if(err) throw err;
        else {
            console.log('An house is removed.');
        }
    });
  res.send();
});


//HTTP to FAMILY 
app.post('/api/houses/senior', function (req, res) {

    console.log(req.body.name);
    var body = req.body;
    var user = {
    
    developer : body.developer,
    address: body.address,
    website : body.website,
    company : body.company,
    phone : body.phone,
    zipcode : body.zipcode
    
}


   connection.query('INSERT INTO senior_house SET ?', user, function(err,res){
   if(err) throw err;

   console.log('Last inserted ID:',body.name);
   });
   res.writeHeader(200, {"Content-Type": "application/json"});
   res.end();
  
});

app.get('/api/houses/senior', function(req, res){

  var result =[];
  var queryStr = "select * from senior_house";
  console.log("Query is "+queryStr);
  connection.query(queryStr, function(err, rows, fields) {
      if (!err){
        console.log('The solution is: ', rows);
		for(var i = 0; i<rows.length; i++){

			result.push(rows[i]);
		}
		  	res.send(result);
	}

      else{
        console.log('Error while performing Query.'+err);
      }
      });
});

app.delete('/api/houses/senior', function (req, res){

    var cust_id = req.body.cust_id;

    var queryStr = 'DELETE FROM family_house';
    var body = req.body; 
    //Delete a record.
    connection.query(queryStr, function(err, res){
        if(err) throw err;
        else {
            console.log('An house is removed.');
        }
    });
  res.send();
});



//HTTP to FAMILY 
app.post('/api/houses/special', function (req, res) {

    console.log(req.body.name);
    var body = req.body;
    var user = {
    
    developer : body.developer,
    address: body.address,
    website : body.website,
    company : body.company,
    phone : body.phone,
    zipcode : body.zipcode
    
}


   connection.query('INSERT INTO special_house SET ?', user, function(err,res){
   if(err) throw err;

   console.log('Last inserted ID:',body.name);
   });
   res.writeHeader(200, {"Content-Type": "application/json"});
   res.end();
  
});

app.get('/api/houses/special', function(req, res){

  var result =[];
  var queryStr = "select * from special_house";
  console.log("Query is "+queryStr);
  connection.query(queryStr, function(err, rows, fields) {
      if (!err){
        console.log('The solution is: ', rows);
		for(var i = 0; i<rows.length; i++){

			result.push(rows[i]);
		}
		  	res.send(result);
	}

      else{
        console.log('Error while performing Query.'+err);
      }
      });
});

app.delete('/api/houses/special', function (req, res){

    var cust_id = req.body.cust_id;

    var queryStr = 'DELETE FROM special_house';
    var body = req.body; 
    //Delete a record.
    connection.query(queryStr, function(err, res){
        if(err) throw err;
        else {
            console.log('An house is removed.');
        }
    });
  res.send();
});

console.log("Listening on port"+process.env.PORT);
app.listen(process.env.PORT);

