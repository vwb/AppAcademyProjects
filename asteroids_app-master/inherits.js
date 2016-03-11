// (function () {
//
//   if (typeof AnimalSpace === "undefined") {
//     window.AnimalSpace = {};
//   }
//
//   var Animal = AnimalSpace.Animal;
//
//   function Cat(name) {
//     Animal.call(this, name);
//   }
//
  // function Surrogate () {};
  //
  // Surrogate.prototype = Animal.prototype;
  // Cat.prototype = new Surrogate();
  //
  // AnimalSpace.Cat = Cat;
//
//
// })();
//



Function.prototype.inherits = function (SuperClass) {
  function Surrogate () {}

  Surrogate.prototype = SuperClass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

function MovingObject () {}

function Ship () {}
Ship.inherits(MovingObject);

function Asteroid () {}
Asteroid.inherits(MovingObject);

Ship.prototype.pewPew = function () {
  console.log("die aliens!!!");
};

MovingObject.prototype.move = function () {
  console.log(this);
};
