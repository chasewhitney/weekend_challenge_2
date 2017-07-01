var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

var calcResult = 0;



app.post("/add", function(req, res){
  var package = req.body;

  calcResult = parseInt(package.x) + parseInt(package.y);

  res.sendStatus(200);

});

app.get("/result", function(req, res){
  console.log('received request for result');
  res.send(calcResult.toString());
});


app.get("/*", function(req, res){
  console.log('got a request for a file: ', req.params[0]);

  var file = req.params[0] || "/views/index.html";
  res.sendFile(path.join(__dirname, "/public", file));
});

app.listen(5000, function(){
  console.log('Listening on port 5000.');
});
