var express = require('express');
var router = express.Router();
var instaApi = require('instagram-node').instagram();
var cookieParser = require('cookie-parser');

var page = 0;
var photos = null;

router.use(cookieParser());

var redirect_uri = 'http://localhost:3000/instagram/handleauth';

router.get('/authorize-user', function (req, res){
  // nextPage = null;
  instaApi.use({
  client_id: process.env.instagram_client_id,
  client_secret: process.env.instagram_client_secret
});
      res.redirect(instaApi.get_authorization_url(redirect_uri));
});

router.get('/handleauth', function (req, res){
  // nextPage = null;
  instaApi.authorize_user(req.query.code, redirect_uri, function(err, result){
    if (err) {
      res.send(err.body);
    } else {
        res.cookie('instaToken',result.access_token, { httpOnly: true });
        instaApi.use({access_token:result.access_token});
        console.log(result);
        res.redirect('/#!/new-postcard');
    }
  });
});

router.get('/logout', function(req, res) {
  // nextPage = null;
  res.cookie('instaToken', null, { maxAge: 1, httpOnly: true });
  // instaApi.use({access_token: null,});
  // instaApi.use({access_token: access_token});
  res.redirect('/');
});


// Set nextPage variable to undefined to indicate we need to send medias
var nextPage = null;

router.get('/photos', function (req, res){
  var hdl = function(err, medias, pagination, remaining, limit) {
    // photos+=medias
    // console.log(photos);
    if(err) {
      res.send(err)
    } else if (!nextPage) {
      res.send(medias);
      // prepare nextPage for loading next set of images
      nextPage = pagination;
    } else {
      if (nextPage && nextPage.next) {
        // console.log('this is running',pagination.next)
        nextPage.next(hdl);
        nextPage = null;
      }
    }
  };


  instaApi.user_self_media_recent(hdl);
})




module.exports = router;
