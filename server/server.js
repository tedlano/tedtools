const path = require('path');
const http = require('http');
const express = require('express');
const hbs = require('hbs');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var {hue, lightState} = require('./hue');
//var {pg, client} = require('./db/pg');

//Phillips Hue
var lights,
    groups;

var viewsPath = path.join(__dirname, '../views');
hbs.registerPartials(viewsPath + '/partials');
hbs.registerHelper('lightStatus', function(bool){
    if(bool) return hbs.SafeString("On");
    return hbs.SafeString("Off");
});

app.set('view engine', 'hbs');

//Serve up static files
app.use(express.static(publicPath));

//Pages
app.get('/', (req, res) => {
    res.render(viewsPath + '/home.hbs', {
        pageTitle: 'Ted Tools'
    });
});

app.get('/caption-maker', (req, res) => {
    res.render(viewsPath + '/caption-maker.hbs', {
        pageTitle: 'Captioned Videos | Ted Tools'
    });
});

app.get('/numbers-quiz', (req, res) => {
    res.render(viewsPath + '/numbers-quiz.hbs', {
        pageTitle: 'Numbers Quiz | Ted Tools'
    });
});

app.get('/blockchain-game', (req, res) => {
    res.render(viewsPath + '/blockchain-game.hbs', {
        pageTitle: 'Blockchain | Ted Tools'
    });
});

app.get('/smart-home', (req, res) => {

    hue.lights().then(function(data){
        lights = data.lights;
    }).done();

    hue.groups().then(function(data){
        groups = data;
    });

    res.render(viewsPath + '/smart-home.hbs', {
        pageTitle: 'Smart Home | Ted Tools',
        lights: lights
    });
});

app.get('/smart-home/lights', (req, res) => {
    hue.lights()
        .then(function(res){
            //console.log("RES", res.lights);
            lights = res.lights;
            return lights;
        })
        .done();
})

app.get('/smart-home/group/:id/toggle', (req, res) => {
    var id = req.params.id;
    var group = groups[id-1];
    var state = lightState.create();

    if(group.action.on){
        hue.setLightState(id, state.off())
            .then()
            .done();

        group.action.on = false;
    } else {
        hue.setLightState(id, state.on())
            .then()
            .done();

        group.action.on = true;
    }

    groups[id-1] = group;

    res.end();
});

app.get('/smart-home/bulb/:id/toggle', (req, res) => {
    var id = req.params.id;
    var light = lights[id-1];
    var state = lightState.create();

    if(light.state.on){
        hue.setLightState(req.params.id, state.off())
            .then(function (result){
                console.log("RESULT", result);
            }).done();

        light.state.on = false;
    } else {
        hue.setLightState(req.params.id, state.on())
            .then(function (result){
                console.log("RESULT", result);
            }).done();

        light.state.on = true;
    }

    lights[id-1] = light;
    res.end();
});

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Blockchain Game'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new team has joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));

        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

/*
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});
*/

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
