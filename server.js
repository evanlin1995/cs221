var express = require('express');
var reload = require('reload');
var app = express();

app.use(express.static(__dirname + '/public'));

var connect = require('connect');
var path = require('path');

var http = require('http');
var url = require('url');
var fs = require('fs');

const PORT = 8080; 

app.get('/', function(req, res) {
	// res.sendFile(path.join(__dirname + '/public/index.html'));
	res.sendFile('public/index.html');
});

app.get('/getphotos', function(req, res) {

	// shuffle images here
	var payload = [
		"http://i464.photobucket.com/albums/rr8/malinajiang/Chicago%20Face%20Database/CFD-LM-243-075-N_zpsbaqgef6u.jpg",
		"http://i464.photobucket.com/albums/rr8/malinajiang/Chicago%20Face%20Database/CFD-LM-242-002-N_zpsylk0gkbe.jpg",
		"http://i464.photobucket.com/albums/rr8/malinajiang/Chicago%20Face%20Database/CFD-AF-255-209-N_zpsdyhqqunh.jpg"
	];

	console.log(payload);

	// // res.setHeader('Content-Type', 'application/json');
	var hi = { key: 'value' };
    res.json(payload);
});


var server = app.listen(PORT, function() {
	var host = server.address().address;
	var port = server.address.port;
	console.log('Server listening at port ' + PORT);
});