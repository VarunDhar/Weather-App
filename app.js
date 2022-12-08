//const { response } = require("express");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const https = require("https");
//const { urlencoded } = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.listen(3000,function(){
    console.log("Server is running at port 3000");
});

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    // let url = "https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=2c178e5a3c0684cea8716919b91edc0d&units=metric";

    // https.get(url,function(response){
    //     response.on("data",function(data){
    //         const weatherData=JSON.parse(data);
    //         let temp = weatherData.main.temp;
    //         let city = weatherData.name;
    //         let feelslike = weatherData.weather[0].description;
    //         const imgtag = weatherData.weather[0].icon;
    //         const imgurl = "http://openweathermap.org/img/wn/"+ imgtag +"@2x.png";

    //         res.set('Content-Type', 'text/html');
    //         res.write("<h1><center>Temperature in <b>"+city+"</b> is: <b>"+temp+"</b> degrees Celsius and is <b>"+feelslike+"</b></center></h1>");
    //         res.write("<br><center><img src="+imgurl+"></center>");
    //         res.send();
    //     });
    // });
    
});

app.post("/",function(req,res){

    let cityname = req.body.city;
    let url = "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid=2c178e5a3c0684cea8716919b91edc0d&units=metric";
    console.log(cityname);
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            let temp = weatherData.main.temp;
            let city = weatherData.name;
            let feelslike = weatherData.weather[0].description;
            const imgtag = weatherData.weather[0].icon;
            const imgurl = "http://openweathermap.org/img/wn/"+ imgtag +"@2x.png";

            res.set('Content-Type', 'text/html');
            res.write("<h1><center>Temperature in <b>"+city+"</b> is: <b>"+temp+"</b> degrees Celsius and is <b>"+feelslike+"</b></center></h1>");
            res.write("<br><center><img src="+imgurl+"></center>");
            res.send();
        });
    });
});