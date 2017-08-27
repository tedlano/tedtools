var nodeHue = require("node-hue-api");
var HueApi = nodeHue.HueApi;
var lightState = nodeHue.lightState;

var host = "192.168.1.16",
    username = "bJNqcHfAZWzaj3hJflyj9zhfvp2jw0KFvnLOlFyR",
    api;

hue = new HueApi(host, username);


module.exports = {hue, lightState};
/*
// --------------------------
// Using a promise
api.lights()
    .then(displayResult)
    .done();
/*
var hostname = "192.168.1.16",
    userDescription = "Ted Tools App User";

var displayUserResult = function(result) {
    console.log("Created user: " + JSON.stringify(result));
};

var displayError = function(err) {
    console.log(err);
};

var hue = new HueApi();

// --------------------------
// Using a promise
hue.registerUser(hostname, userDescription)
    .then(displayUserResult)
    .fail(displayError)
    .done();

/*
var HueApi = require("node-hue-api").HueApi;

var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

var hostname = "192.168.1.16",
    username = "bJNqcHfAZWzaj3hJflyj9zhfvp2jw0KFvnLOlFyR",
    api;

api = new HueApi(hostname, username);

// --------------------------
// Using a promise
api.config().then(displayResult).done();
// using getConfig() alias
api.getConfig().then(displayResult).done();


/*
var hue = require("node-hue-api");

var displayBridges = function(bridge) {
    console.log("Hue Bridges Found: " + JSON.stringify(bridge));
};

// --------------------------
// Using a promise
hue.nupnpSearch().then(displayBridges).done();


/*
var HueApi = require('node-hue-api').HueApi;

var displayResults = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

var host = "192.168.1.16",
    username = "bJNqcHfAZWzaj3hJflyj9zhfvp2jw0KFvnLOlFyR",
    api = new HueApi(host, username);

api.getGroup(0)
    .then(displayResults)
    .done();

module.exports = {api};
*/
