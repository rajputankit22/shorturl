var express = require('express');
var shortid = require('shortid');
var router = express.Router();
var Shorturl = require('../models/shorturl');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('url', { title: 'Short URL' });
});
/* GET new URL. */
router.get('/:shortur', function(req, res, next) {
      var some = req.params.shortur;
      Shorturl.findOne({new:some}).exec(function(err, q) {
          if(err) return res.json({error : true , reason : err});
          var cmpurl = 'http://'+q.old;
          res.redirect(cmpurl);
        });

});
/* POST to save URL. */
router.post('/', function(req, res, next) {          //recieving data from url.ejs
  //var urlR = /(http(s)?:|//)?([\w-]+\.)+[\w-]+(/[\w- ;,./?%&=]*)?/;
  var urlR = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  var data = req.body.url;
  console.log(data);
  if(data.match(urlR)) {
  var id = shortid.generate();
  // console.log(id);
   var idDetail = {
     old : data,
     new : id
   }
   var shorturl = new Shorturl(idDetail);
  shorturl.save(function(err, result){
    if(err) return res.json({error : true , reason : err});
    return res.json({error : false, urlnew : result.new, urlold : result.old});
  });
 }
});

module.exports = router;
