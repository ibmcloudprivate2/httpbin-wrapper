const express = require('express');
const app = express();
const HOST = '0.0.0.0';

const {
    CONTAINER_PORT,
    TARGET_URI,
    TARGET_URL
} = require('./config');

console.log(`Your port is: ` + CONTAINER_PORT); // 1323

const URI_Status200 = "/status/200";
const URI_Status503 = "/status/503";
const URI_Delay1 = "/delay/1";
const URI_Delay5 = "/delay/5";

const request = require('request');

function getURL(host, uri) {
    let url = host + uri;

    console.log("getURL: " + url);

    return url;
}

// create health probe
app.get('/liveness', function(req, res, next) {
    request(getURL(TARGET_URL, URI_Status200), { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }

        console.log("context /liveness: " + response.statusCode);

        res.status(response.statusCode);
        res.send("alive");
    });
});

// creaet a readiness probe
app.get('/readiness', function(req, res, next) {
    request(getURL(TARGET_URL, URI_Status200), { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }

        console.log("context /readiness: " + response.statusCode);

        res.status(response.statusCode);
        res.send("ready");
    });
});

// root context will use the TARGET URL and URI provided in environment
app.get('/', (req, res) => {
    request(getURL(TARGET_URL, TARGET_URI), { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }

        console.log("context /: " + response.statusCode);

        res.status(response.statusCode);
        res.send(body);
    });
})

app.get('/status503', (req, res) => {
    request(getURL(TARGET_URL, URI_Status503), { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }

        console.log("context /status503: " + response.statusCode);

        res.status(response.statusCode);
        res.send(response.body);
    });
})

app.get('/status200', (req, res) => {
    request(getURL(TARGET_URL, URI_Status200), { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }

        console.log("context /status200: " + response.statusCode);

        res.status(response.statusCode);
        res.send(response.body);
    });
})

app.get('/delay1', (req, res) => {
    request(getURL(TARGET_URL, URI_Delay1), { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }

        console.log("context /delay1: " + response.statusCode);

        res.status(response.statusCode);
        res.send(response.body);
    });
})

app.get('/delay5', (req, res) => {
    request(getURL(TARGET_URL, URI_Delay5), { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }

        console.log("context /delay5: " + response.statusCode);

        res.status(response.statusCode);
        res.send(response.body);
    });
})

const server = app.listen(CONTAINER_PORT, HOST);

console.log("Running on http:/" + HOST + ":" + CONTAINER_PORT + " locally. \nIf your application port is not 3000, \nPlease run 'docker ps' in your terminal to find out the application port you can open in browser.");

// handle process killed
process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    server.close(() => {
        console.log('Http server closed.');
        // clean up db connection if any ...

        process.exit(0);
    });
});


module.exports = app;
