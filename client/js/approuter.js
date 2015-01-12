/* global Backbone */

var AppRouter = Backbone.Router.extend({

    currentView: null,

    routes: {
        ':hashtag': 'urlhashchange'
    },
    
    urlhashchange: function(t){
        console.log('routechange triggered');
        this.trigger('routechange',t);
    },
    
    changeView: function(view) {
        if(null != this.currentView)
            this.currentView.undelegateEvents();
        this.currentView = view;
        this.currentView.render();
    },
    
    setTag: function(t){
        this.navigate(t, true);
    }
});
