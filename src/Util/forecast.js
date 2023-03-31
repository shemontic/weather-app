const request = require('request');


const GetForecast = ({latitude=22.1991660760527,logitude=0}, callback) => {
    const mapUrl = "http://api.weatherstack.com/current?access_key=87260e6904a2890ffb94f540b3d62e88&query="+ latitude + "," + logitude
    setTimeout(() => {
        request({url:mapUrl, json: true}, (error, response) => {
            if(error){
                console.log('connection error');
                callback(null, 'connection error');
            }else if(response.body.error){
                console.log('invalid request')
                callback(null, 'invalid request');
            }else{
            console.log(`current precipitation chance ${response.body.current}`);
            callback(response.body.current, null);
            }
            })
    }, 5000)
    
 }

 module.exports = {GetForecast}