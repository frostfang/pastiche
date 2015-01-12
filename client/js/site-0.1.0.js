/* global _ Backbone ImageFeed ImageItem ImageFeedView SearchView AppRouter */

// collections and models
var feed = new ImageFeed();

// views
var feedview = new ImageFeedView({
    collection: feed,
    el: '#imagefeed'
});

var searchview = new SearchView({
    el: '#tagsearch'
});

// the router
var router = new AppRouter();




// hookup the events -- essentially everything needs to depend on the search 
// input i.e. input forces a change to the router, inturn router triggers 
// the change in the collection. This way when a tag is manually entered or 
// the back button is clicked things should flow nicely.
console.log('events init');
router.listenTo(searchview, 'searchchange', router.setTag);
feedview.listenTo(router, 'routechange', feedview.setTag);
feedview.listenTo(router, 'routechange', feedview.fadeOut); 
searchview.listenTo(router, 'routechange', searchview.setTag);
searchview.listenTo(feedview, 'begin', searchview.setFocus);

// run app -- ultimately this will run last because of JQ2, the way the js is 
// inluded in index.html and the way chrome runs. Meaning you probably won't need
// the set timeout stuff
searchview.render();
Backbone.history.start();


// the timer
// TODO: You might want to improve this with an event machine that can
// be listened to and the interval is cleared and reset, at the moment this 
// is quick and dirty. It should work with the way the events are hooked up above
var feedtimer = setInterval(function(){
    console.log('timer');
    if(searchview.tag !== '' && searchview.tag != undefined)
        feedview.refresh();
}, 20000);

// TODO: Get git working
