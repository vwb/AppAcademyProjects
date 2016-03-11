var sum = function(){
  var myArgs = Array.prototype.slice.call(arguments);
  var total = 0;
  myArgs.forEach(function(ele){
    total += ele;
  });
  return total;
};

Function.prototype.myBind = function (context) {
  var fn = this;
  var bindArgs = Array.prototype.slice.call(arguments);
  bindArgs.shift();
  return function () {
    var callArgs = Array.prototype.slice.call(arguments);
    return fn.apply(context, bindArgs.concat(callArgs));
  };
};

function Cat(name) {
  this.name = name;
}

Cat.prototype.says = function (sound, person) {
  console.log(this.name + " says " + sound + " to " + person + "!");
  return true;
};

var curriedSum = function(numArgs){
  var numbers = [];
  // debugger;
  var _curriedSum = function(num) {
    if (numbers.length === numArgs) {
      numbers.push(num);
      numbers.shift();
      var total = 0;
      numbers.forEach(function(ele){
        total += ele;
      });
      return total;

    } else {

      numbers.push(num);
      return _curriedSum;

    }
  };

  return _curriedSum(arguments[0]);
};

Function.prototype.curry = function (numArgs) {
  var args = [];
  var that = this;
  // debugger;
  var _curry = function(arg){
    if (args.length === numArgs){
      args.push(arg);
      args.shift();

      return that.apply(this, args);
    } else {
      args.push(arg);
      return _curry;
    }
  };

  return _curry(arguments[0]);
};

function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

console.log(sumThree(4, 20, 6));

// you'll write `Function#curry`!
var f1 = sumThree.curry(3);
var f2 = f1(4);
var f3 = f2(20);
var result = f3(6); // = 30

// or more briefly:
console.log(sumThree.curry(3)(4)(20)(6)); // == 30
