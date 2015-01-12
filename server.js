var http = require("http");
var path = require('path');
var express = require("express");
var bodyparser = require("body-parser");
var us = require("underscore");
var ig = require('instagram-node').instagram();

// Every call to `ig.use()` overrides the `client_id/client_secret` or `access_token` previously entered if they exist.
//ig.use({ client_id: process.env.IG_CLIENT_ID, client_secret: process.env.IG_CLIENT_SECRET });
ig.use({ access_token: process.env.IG_TOKEN });
// NB: i decided to use the token method and obtained it this way: http://jelled.com/instagram/access-token
// you could have also used curl or implemented the methods in the instagram-node module readme.
// Not everyone will have an instagram account and this wont be used often.
// also funny enough tokens don't expire...
//TODO: Implement the oauth2 endpoint in this app, it shouldn't be hard.

var router = express();
var server = http.createServer(router);

router.use(bodyparser.json());  // this is the json parser for the post body

router.use(express.static(path.resolve(__dirname, 'client'))); // routes to the client app

// endpoint for static based calls
router.get('/tag/:name', function(req, res) {
    
    ig.tag_media_recent(req.params.name, function(err, result, remaining, limit) {
        res.send(result);
    });

});

// endpoint for stream based calls
router.get('/stream/tag/:name', function(req, res) {
    // check if the subscription exists
    
    // TODO: Might want to not do this as is may not be as useful and the rate
    // limiting on instagram for a given app/token is quite generous.
    
    // ig.add_tag_subscription(
    //     req.params.name,
    //     process.env.IG_ENDPOINT_URI,
    //     { 
    //         verify_token: IG_ENDPOINT_VERIFY_TKN,
    //         client_id: process.env.IG_CLIENT_ID, 
    //         client_secret: process.env.IG_CLIENT_SECRET
    //     },
    //     function(err, result, remaining, limit){
    //         console.log(arguments);
    //         res.send(result);
    //     }
    // );
    
    // ig.del_subscription({ all: true }, function(err, result, remaining, limit){
    //     console.log(arguments);
    //     res.send(result);
    // });

   

    // Was getting a 400 error here: 
    //  Error: OAuthClientException: Missing client_secret URL parameter.]
    //  code: 400,
    //  error_type: 'OAuthClientException',
    //  error_message: 'Missing client_secret URL parameter.',
    // -----
    // OK the issue is that i'm making the request with the ig.use(token)
    // when i should be using ig.use(client_id, client_secret). Need to sort
    // out what you are going to do with the flow of auth and calling the api.
    // Perhaps change to .use(id,secret), make the call, then go call .use(token)
    // to go back to the token auth.
});

// for the ig subscription challenge and handling the post
router.route('/sub/ig')
.get(function(req, res) {
    console.log('ig get');
    res.send(req.query['hub.challenge']); 
})
.post(function(req,res){
    console.log('ig post');
    
});






server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("tag server listening at", addr.address + ":" + addr.port);
});