const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express Config
const publicDirPath = path.join( __dirname,'../public' );
const viewsPath = path.join( __dirname,'../templates/views' );
const partialsPath = path.join( __dirname,'../templates/partials' );

// Set up handlebars and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Guryash Singh',
        body:'No weather detected !'
    });
});

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About Me',
        name:'Guryash Singh'
    });
});

app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Guryash Singh',
        body:'Please help us !'
    });
});

app.get('/weather',(req, res)=>{
    let response;
    const address = req.query.address;
    if( !address ){
        response = {
            error:'Address query is required!'
        }
        return res.send(response);
    }
    geocode(address, (error, { latitude, longitude, location}={})=>{
        if(error){
            response = {error};
            return res.send(response);
        }
        forecast(longitude, latitude, (error, forecastData)=>{
            if(error){
                response = {error};
                return res.send(response);
            }
            res.send({
                forecast:forecastData,
                location,
                address
            })
        });
    });
    
});

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404 Error page',
        name:'Guryash Singh',
        errorMessage  : 'No help article found!'
    });
});

app.get('*',(req, res)=>{
    res.render('404',{
        title:'404 Error Page',
        name:'Guryash Singh',
        errorMessage  : 'OOps: Page not found!'
    });
});

app.listen(3000,()=>{
    console.log('Server started at 3000');
});