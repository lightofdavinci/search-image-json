'use strict';
var Search = require('bing.search');

module.exports = function (app, History) {

	app.get('/latest',function (req, res) {
			History.find({}, null, {
				"limit": 10,
				"sort":{
				  "when": -1
				}
			},function(err, history){
				if(err){console.error("err:",err);}
				res.send(history.map(function(data){
					return {
						term: data.term,
						when: data.when
					};
				}));
			});
	});



	app.get('/:query',function (req, res){
		var query = req.params.query;
		var size = req.query.offset || 10;
		var search = new Search(process.env.API_KEY);
		var history = {
			"term": query,
			"when": new Date().toLocaleString()
		};
		
		if(query != 'favicon.ico'){
			save(history);
		}
		
		function save(object){
			var history = new History(Object);
			history.save(function(err, history){
				if(err){ throw err;}
				console.log("Saved " + history + " into db.");
			});
		}
		
		
		search.images(query,{
			top:size
		}, function(err, result){
			if(err){throw err;}
			res.send(result.map(function(img){
				return {
					"url": img.url,
					"snippet": img.title,
					"thumbnail": img.thumbnail.url,
					"context": img.sourceUrl
				};
			}));
		});
		
	});

};
