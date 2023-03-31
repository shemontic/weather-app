const request = require('request');

const GetGeocode = (address, callback) => {
    const mapUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoic2NoYW5kcmExIiwiYSI6ImNsZnI0aDBiMjA0eWUzdnAxd25hcnRxcmIifQ.fsZ5En9mlNmrUDqgm4_iWQ&limit=1"
    setTimeout(() => {
        request({url:mapUrl, json: true}, (error, response) => {
            if(error){
                console.log('connection error');
                callback(undefined,'connection error');
            }else if(!response.body.features.length){
                console.log('invalid request')
                callback(undefined, 'invalid request');
            }else{
            const {body: {features : [{center : [logitude,latitude]}]}} = response;
            console.log(`the latitude and logitude is ${latitude} ${logitude}`);
            const weatherObj = {
                logitude , latitude
            }
            callback(weatherObj,null);
            }
            })
    }, 5000)
    
 }

 module.exports = {GetGeocode} 
