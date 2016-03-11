var FollowToggle = require("./follow_toggle.js");

function UserSearch($el){
  this.$userInput = $(".users-search input");
  this.$userList = $(".users-search .users");
  this.$el = $el;
  this.$userInput.on('input', this.handleInput.bind(this));
}

UserSearch.prototype.handleInput = function (e) {
  var val = this.$userInput.val();
  $.ajax({
      url: "/users/search",
      type: "GET",
      dataType: "json",
      data: {query: val},
      success: this.renderResults.bind(this)
    });
};

UserSearch.prototype.renderResults = function (response) {
  this.$userList.empty();
  var that = this;
  response.forEach(function(el){
    var userLI = $("<li>");
    userLI.html("<a href=/users/" + el.id + ">" + el.username + "</a>");

    var button = $("<button>");
    button.addClass("follow-toggle");
    button.data("user-id", el.id);
    if (el.followed) {
      button.data("initial-follow-state", "followed");
    } else {
      button.data("initial-follow-state", "unfollowed");
    }
    new FollowToggle(button);
    userLI.append(button);
    that.$userList.append(userLI);

  });
};

module.exports = UserSearch;
