$(function () {
  window.FormView = Backbone.View.extend({
    el: $("#form"),
    search_twitter: function (e) {
      e.preventDefault();
      self = this;
      $.getJSON("http://search.twitter.com/search.json?callback=?", {
        q: $("#query").val()
      },function(data) {
          $("tweets li").fadeOut();
          for (var i in data.results) {
            var tweet = new Tweet(data.results[i]);
            var tweetView = new TweetView({model:tweet});
            tweetView.render();
          }
      });
    },
    events: {
      "submit" : "search_twitter"
    }
  });
  window.TweetView = Backbone.View.extend({
    render: function () {
      var tweet = _.template( $("#template").html(), this.model.toJSON());
      $("#tweets").append(tweet);
      $("#twit" + this.model.get("id")).fadeIn();
    }
  });
});