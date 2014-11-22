
if(!g){
    var g = require("./general.js")
}

var randomExcept = function(except, modul) {
    var rnd
    while( except.indexOf(rnd = g.rnd(modul)) !== -1 ) {}
    return rnd
}


var game = function game(/* beeds to initialize task */) {
    var gameArguments = arguments
    var color = { RED:'red',
        GREEN:'green',
        YELLOW:'yellow',
        BLUE:'blue',
        ORANGE:'orange',
        BROWN:'brown' }
    var colors = [color.RED,color.GREEN,color.YELLOW,color.BLUE,color.ORANGE,color.BROWN]
    var maxRows = 6

    return {
        color:color,
        maxRows: maxRows,
        state: {
                    gameField: [],
                    evaluations: [],
                    task: [1,2,3,4].reduce(function(a,v) {
                                        return a.concat(randomExcept(a,colors.length))
                                    }, [])
                                    .map(function(a,i) { return gameArguments[i] || colors[a]})
                },

        play:function() {
            var blacks = 0
            var whites = 0
            for( var i = 0; i < arguments.length; i++ ) {
                var isBlack = (arguments[i] === this.state.task[i] ? 1 : 0)
                blacks += isBlack
                if( !isBlack ) {
                    whites += (this.state.task.indexOf(arguments[i]) === -1 ? 0 : 1)
                }
            }

            this.state.evaluations.push({blacks: blacks, whites:whites})
            this.state.gameField.push(arguments)
            return this
        },

        lastEvaluation:function() {
            return this.state.evaluations[this.state.evaluations.length-1]
        },

        isGameOver:function() {
            return this.state.evaluations.length >= maxRows
        },

        isWon:function() {
            return this.lastEvaluation().blacks === 4
        }
    }
}

if(typeof(module) !== 'undefined') {
    module.exports = game
}
