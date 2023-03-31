const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./Util/Geocode');
const forecast = require('./Util/forecast');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

console.log(path.join(__dirname, '../public'));

app.use(express.static(path.join(__dirname, '../public')));

app.get('',(req,res)=> {
    res.render('index',{
        name: 'Shemonti',
        title: 'chandra'
    })
})

// app.get('/shemonti', (req,res) => {
//     res.sendFile(path.join(__dirname, '../public/welcome.html'));
// })


app.get('/shemonti', (req,res) => {
    console.log(`Under request ${req.url}`);
    console.log(`Response id ${res}`);
    res.render('welcome',{
        name: 'Shemonti Welcome',
        title:'chandra Welcome',
        description: "your description"
    });
})

app.get('/weather', (req,res) => {
   if(!req.query.address){
    return res.send({
        error: 'you must provide a valid address'
    })
   }
   
   geocode.GetGeocode(req.query.address, ({latitude,logitude,location}={},error) => {
    if(error){
       return res.send({
        err: `Got some error from api ${error} for the loaction ${location}`
       })
    } 
    const locationObj= {latitude,logitude}
    forecast.GetForecast(locationObj, (data,error)=>{
       if(error){
        return res.send({
            err: `Got some error from forecast api ${error} for the loaction ${location}`
           })
       } 
       const {weather_descriptions:[description], wind_speed} = data
       res.send({
        description: description,
        windspeed: wind_speed
       })
    })
        
     
})
    
})




app.get('/shemonti/*', (req,res) => {
    res.send('No article found')
  })




const server = app.listen(3000, () => {
   console.log(`SERVER IS UP AND RUNNING ON ${server.address().port}`);
})