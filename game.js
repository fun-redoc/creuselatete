(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require, exports, module);
  } else {
    root.g = factory();
  }
}(this, function(require, exports, module) {
'use strict';


var game = { };

game.RED = 'red'
game.GREEN = 'green'
game.YELLOW = 'yellow'
game.BLUE = 'blue'
game.ORANGE = 'orange'
game.BROWN = 'brown'

var colors = [game.RED,game.GREEN,game.YELLOW,game.BLUE,game.ORANGE,game.BROWN]
var maxRows

var template = {
    gameField: [],
    evaluations: [],
    task: null
}

var randomExcept = function(except, modul) {
    var rnd
    while( excep.indexOf(rnd = g.rnd(modul)) != -1 )
    return rnd
}

game.prototype.new = function() {
    var newGame = Object.create(template)
    newGame.task = [1,2,3,4].reduce(function(a,v) {
                                        return a.concat(randomExcept(a,colors.length))
                                    }, [])
    return newGame.map(function(a) { return colors[a]});
}

game.prototype.play = function() {
    var blacks = arguments.reduce( function(a,c,i) {
                                        return a + (c === this.task[i] ? 1 : 0)
                                    }, 0)
    var whites = (-blacks + (arguments.filter( function(c) { return (this.task.indexOf(c) !== -1) })))
    this.evaluations.push({balcks: blacks, whites:whites})
    this.gameField.push(arguments)
    return this
}


game.prototype.isGameOver = function() {
    return this.evaluations.length >= maxRows
}

game.prototype.isWon = function() {
    return this.evaluations[ths.evaluations.length] === 4
}

// RETURN public object
return game;
}));
