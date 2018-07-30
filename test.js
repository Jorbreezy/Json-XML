var express = require('express')
var app = express
var bodyParser = require ('body-Parser');
app.get('/', function (req, res){
 res.send('Hello World');
})

const port = "8080"

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.post('/process_post', urlencodedParser, function (req, res) {
     
   response = {
      channel_name:req.body.channel_name,
      item_name:req.body.item_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Check to see if this works http://%s:%s", host, port);
    console.log("");
})

var js2xmlparser = require("js2xmlparser");
 
var obj = {
    "firstName": "Bob",
    "lastName": "Builder",
    "dateOfBirth": new Date(1989, 10, 5),
    "address": {
        "@": {
            "type": "home"
        },
        "streetAddress": "808 49st",
        "city": "Brooklyn",
        "state": "New York",
        "zip": 11401
    },
    "phone": [
        {
            "@": {
                "type": "home"
            },
            "#": "123-555-4567"
        },
        {
            "@": {
                "type": "cell"
            },
            "#": "347-123-4567"
        },
        {
            "@": {
                "type": "work"
            },
            "#": "718-123-6789"
        }
    ],
    "email": "michal@openfin.co"
};
 
console.log(js2xmlparser.parse("person", obj));
app.get ("")