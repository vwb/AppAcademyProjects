var FollowToggle = require("./follow_toggle.js");
var UserSearch = require("./user_search.js");

$(function(){

  var $buttons = $("button.follow-toggle");
  $buttons.each(function(index, element){
    new FollowToggle($(this));
  });

  var $userSearchNavs = $("nav.users-search");
  $userSearchNavs.each(function(){
    new UserSearch($(this));
  });

});
