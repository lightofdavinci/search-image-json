/* snippet from rafaese */ 
'use strict';

var Search = require('bing.search');
module.exports = function(app, History) {

  app.get('/latest',function(req, res) {
    // Check to see if the site is already there
    History.find({}, null, {
      "limit": 10,
      "sort": {
      "when": -1
      }
    }, function(err, history) {
      if (err) return console.error(err);
      res.send(history.map(function(arg) {
        // Displays only the field we need to show.
        return {
          term: arg.term,
          when: arg.when
        };
      }));
    });
  });

  app.get('/:query', function(req, res) {
    // Get images and save query and date.
    var query = req.params.query;
    var search = new Search(process.env.API_KEY);
    var history = {
      "term": query,
      "when": new Date().toLocaleString()
    };
    // Save query and time to the database
    if (query !== 'favicon.ico') {
      save(history);
    }
    
    function save(obj) {
    var history = new History(obj);
    history.save(function(err, history) {
      if (err){throw err;}
      console.log('saved ' + history + ' into db');
    });
  }

    // Query the image and populate results
    search.images(query, {
        top: 10,
        skip: req.query.offset * 10
              },
      function(err, results) {
        if (err){throw err;}
        res.send(results.map(function(img) {
    // Construct object from the json result
    return {
      "url": img.url,
      "snippet": img.title,
      "thumbnail": img.thumbnail.url,
      "context": img.sourceUrl
    };
                                      }));
                  });//closing search
    
  });//closing get query


};//closing module
