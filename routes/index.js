require('node-jsx').install({extension: '.jsx'});
var React = require('react');
var _ = require('lodash');
var request = require('superagent');
var Q = require('q');

//fixtures
var world = require('./world.json');

var App = require('../react/App.jsx');
var App = React.createFactory(App);

function paramsFromReq(req) {
	var params = _.clone(req.params);
	params.body = req.body;
	params.user = req.user;
	params.errors = req.flash('error');
	return params;
}

function getGameData(callback) {
	request
		.get('http://10.0.1.51:8080/worlds/test')
		.end(function(err, res){
			if (res.ok) {
				return callback(res.body);
			} else {
				return callback(world);
			}
		});
}

exports.index = function(req, res) {
	var url = req.originalUrl;
	var params = paramsFromReq(req);
	getGameData(function(gameData) {
		params.gameData = gameData;
		var markup = React.renderToString(App({
			title: 'Cristallum',
			params: params
		}));
		res.send('<!DOCTYPE html>' + markup);
	});
};
