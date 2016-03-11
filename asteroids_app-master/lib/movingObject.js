function MovingObject(pos, vel, radius, color, game){
  this.pos = pos;
  this.vel = vel;
  this.radius = radius;
  this.color = color;
  this.game = game;
}

MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
   ctx.beginPath();

   ctx.arc(
     this.pos[0],
     this.pos[1],
     this.radius,
     0,
     2 * Math.PI,
     false
   );

   ctx.fill();
};

MovingObject.prototype.move = function () {
  this.pos[0] = this.pos[0]+this.vel[0];
  this.pos[1] = this.pos[1]+this.vel[1];

  this.game.wrap(this.pos);
};

MovingObject.prototype.collidedWith = function (other) {
  // console.log("IM A MOVING OBJECT");
};

MovingObject.prototype.isCollidedWith = function (other) {
  var sumRadii = this.radius + other.radius;
  var xDistance = Math.pow((this.pos[0] - other.pos[0]), 2);
  var yDistance = Math.pow((this.pos[1] - other.pos[1]), 2);
  var totalDistance = Math.sqrt((xDistance + yDistance));

  if (sumRadii > totalDistance) {
    return true;
  } else {
    return false;
  }
};

module.exports = MovingObject;
