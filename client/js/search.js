/* global Backbone Mustache */

var SearchView = Backbone.View.extend({
    initialize: function() {
        this.template = $('#tpl-searchview').html();
    },
    render: function() {
        this.$el.html(Mustache.to_html(this.template, { tag: this.tag }));
        return this; // chaining
    },
    events: {
        'change .search': 'inputchange'
    },
    inputchange: function(ev){
        // we want to trigger the event
        console.log('searchchange triggered');
        this.trigger('searchchange', $(ev.currentTarget).val());
    },
    setTag: function(t){
        this.tag = t;
        this.render();
    },
    setFocus: function(){
        this.$el.children('.search').focus();
    }
});

// NB* OK i know this view should really have a Model attached to it so you 
// don't have all the coupling methods like setTag(...) but really that method 
// is there incase the back button is pushed.
// If it gets to big then you'll need to refactor this into having a related
// SearchItem model etc...

