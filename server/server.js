var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var doMath = require('./modules/math.js');
app.use(bodyParser.urlencoded({extended: true}));

var calcResult = 0;



app.post("/math", function(req, res){
  var package = req.body;
  console.log(package.type);
  calcResult = doMath.doMath(package);
  //calcResult = parseInt(package.x) + parseInt(package.y);

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

//send this function to module
// function doMath(package){
//   if(package.type == "add"){
//     console.log('package type is add');
//     calcResult = parseInt(package.x) + parseInt(package.y);
//   } else if(package.type == "subtract"){
//     console.log('package type is subtract');
//     calcResult = parseInt(package.x) - parseInt(package.y);
//   } else if(package.type == "multiply"){
//     console.log('package type is multiply');
//     calcResult = parseInt(package.x) * parseInt(package.y);
//   } else if(package.type == "divide"){
//     console.log('package type is divide');
//     calcResult = parseInt(package.x) / parseInt(package.y);
//   }
//
//
// }
