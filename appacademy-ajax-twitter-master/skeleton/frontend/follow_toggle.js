
function FollowToggle(el){
  this.userId = el.data('user-id');
  this.followState = el.data('initial-follow-state');
  this.$el = el;
  this.$el.on('click', this.handleClick.bind(this));
  this.render();
  //add event listerner
}
//TODO clicking allooooot of times breaks it!
FollowToggle.prototype.render = function () {
  if (this.followState === "unfollowed"){
    this.$el.prop("disabled", false);
    this.$el.html("Follow!");

  } else if(this.followState === "following" ||
    this.followState === "unfollowing"){
      this.$el.html("just a minute!");
      this.$el.prop("disabled", true);

  } else {
    this.$el.prop("disabled", false);
    this.$el.html("Unfollow!");
  }
};

FollowToggle.prototype.handleClick = function (e) {
  e.preventDefault();
  var type;

  if (this.followState === "unfollowed") {
    type = "POST";
    this.followState = "following";
  } else {
    type = "DELETE";
    this.followState = "unfollowing";
  }
  this.render();

  $.ajax({
      url: "/users/"+this.userId+"/follow",
      type: type,
      dataType: "json",
      success: function(resp){
        if (this.followState === "unfollowing") {
            this.followState = "unfollowed";
          } else {
            this.followState = "followed";
          }

      this.render();
      }.bind(this)
    });
};

module.exports = FollowToggle;
