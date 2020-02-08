const request = require('request');

const forecast = (lat, long, callback)=>{
    const url = `https://api.darksky.net/forecast/6c5f1a7b503024d3216538feaf01f2a7/${long},${lat}?units=si`;
    //url:url ES6 property
    request({ url, json: true }, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather services', undefined);
        }else if(body.error){
            callback('Wrong coordinates provided', undefined);
        }else{
            callback(undefined, `Currently it's ${body.currently.temperature} degrees out and a ${body.currently.precipProbability}% chance of ${body.currently.precipType}. ${body.daily.summary}`);
        }
    });
}

module.exports = forecast;