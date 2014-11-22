var g = require("./general.js")
var game = require("./game.js")('red', 'blue', 'yellow', 'green')

var nextGameState = game.play(game.color.ORANGE, game.color.BROWN, game.color.GREEN, game.color.RED)
console.log(nextGameState.state.evaluations, nextGameState.isWon())
nextGameState = nextGameState.play(game.color.RED, game.color.BLUE, game.color.YELLOW, game.color.GREEN)
console.log(nextGameState.state.evaluations, nextGameState.isWon())
nextGameState = nextGameState.play(game.color.RED, game.color.BLUE, game.color.YELLOW, game.color.GREEN)
console.log(nextGameState.state.evaluations, nextGameState.isWon())

var gameOver = nextGameState.isGameOver()

var gameLost = !nextGameState.isWon()
