/*jshint esversion: 6 */

const express = require("express");
const https = require("https");
var bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");


});

app.post("/", function(req, res){
    

    const query = req.body.cityName;
    const apiKey = "96407f06792d24bfa6185311e81a93fb";
    const unit = "metric";

    url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const weatherGroup = weatherData.cod;
            const imageURL = "https://openweathermap.org/img/wn/" + icon +"@2x.png";
            res.write("<p>The Weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The Temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
            
            res.write("<img src="+ imageURL + ">");
            res.send();
        })

    })
})



app.listen(3000, function(){
    console.log("Server is running on port 3000");
})