const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var {pg, client} = require('./db/pg');

const port = process.env.PORT || 3000;
var app = express();


// Define root directory
var rootDir = __dirname.substring(0, __dirname.lastIndexOf('/'));

hbs.registerPartials(rootDir + '/views/partials');
app.set('view engine', 'hbs');

//Serve up static files
app.use(express.static(rootDir + '/public'));

//Pages
app.get('/', (req, res) => {
    res.render(rootDir +'/views/home.hbs', {
        pageTitle: 'Ted Tools'
    });
});

app.get('/caption-maker', (req, res) => {
    res.render(rootDir +'/views/caption-maker.hbs', {
        pageTitle: 'Captioned Videos | Ted Tools'
    });
});

app.get('/numbers-quiz', (req, res) => {

    res.render(rootDir +'/views/numbers-quiz.hbs', {
        pageTitle: 'Numbers Quiz | Ted Tools'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});
