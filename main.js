var g = require("./general.js")
var game = require("./game.js")

var initialGameState = game.new()

var nextGameState = initialGameState.play(game.RED, game.BLLUE, game.YELLOW, game.GREEN)
nextGameState = initialGameState.play(game.RED, game.BLLUE, game.YELLOW, game.GREEN)
nextGameState = initialGameState.play(game.RED, game.BLLUE, game.YELLOW, game.GREEN)

var gameOver = nextGameState.isGameOver()

var gameLost = !nextGameState.gameWon()
