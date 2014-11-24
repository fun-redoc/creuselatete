var g = require("./general.js")
var game = require("./game.js")('red', 'blue', 'yellow', 'green')

var gameState = game.play.apply(null, [game.color.ORANGE, game.color.BROWN, game.color.GREEN, game.color.RED])
console.log(game.isGameOver(), game.isWon(), game)

var gameState = game.play.apply(null, ['red', 'blue', 'yellow', 'green'])

console.log(game.isGameOver(), game.isWon(), game)


var gameState = game.play.apply(null, ['red', 'blue', 'yellow', ])

console.log(game.isGameOver(), game.isWon(), game)
