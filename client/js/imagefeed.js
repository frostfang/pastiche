/* global Backbone Mustache _ */

var ImageItem = Backbone.Model.extend({});

var ImageFeed = Backbone.Collection.extend({
    model: ImageItem,
    url: function(){
        return '/tag/' + this.tag;
    }
});

var ImageFeedView = Backbone.View.extend({
    initialize: function() {
        this.template = $('#tpl-imagefeedview').html();
        this.listenTo(this.collection, "sync", this.render);
    },
    render: function() {
        
        this.$el.html(Mustache.to_html(this.template, {
            imagefeed: this.collection.toJSON()
        })).fadeIn();
        
        return this; // chaining
    },
    events: {
        'click .thumbnail': 'itemclick',
        'click .begin': 'beginclick'
    },
    itemclick: function(ev){
        console.log(arguments);
    },
    beginclick: function(ev){
        this.trigger('begin');
    },
    setTag: function(t){
        this.collection.tag = t;
        this.collection.fetch();
    },
    refresh: function(){
        this.collection.fetch();
    },
    fadeOut: function(){
       this.$el.fadeOut(); 
    }
    
});
