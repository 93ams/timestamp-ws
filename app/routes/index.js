'use strict';
var express = require('express');

var path = process.cwd();

var months = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];

function prepare_response(unixtime){
	var response = {
			"unix": unixtime,
			"natural": ""
		}
	
	var time = unixtime * 1000;
	var date = new Date(time);
	
	response.natural += months[date.getMonth()];
	response.natural += " ";
	response.natural += date.getDate();
	response.natural += ", ";
	response.natural += date.getFullYear();
	
	return response;
}

module.exports = function (app) {
	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/:timestamp([0-9]+)')
		.get(function (req, res) {
			var timestamp = parseInt(req.params.timestamp);
			res.send(prepare_response(timestamp));
		});
		
	app.route('/:date')
		.get(function (req, res) {
			var date = req.params.date;
			var timestamp = Date.parse(date);
			timestamp /= 1000;
			res.send(prepare_response(timestamp));
		});
};
