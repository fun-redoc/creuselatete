
if(!g){
    var g = require("./general.js")
}

var randomExcept = function(except, modul) {
    var rnd
    while( except.indexOf(rnd = g.rnd(modul)) !== -1 ) {}
    return rnd
}


var makeGame = function game(/* beeds to initialize task */) {
    var gameArguments = arguments
    var color = { RED:'red',
        GREEN:'green',
        YELLOW:'yellow',
        BLUE:'blue',
        ORANGE:'orange',
        BROWN:'brown' }
    var colors = [color.RED,color.GREEN,color.YELLOW,color.BLUE,color.ORANGE,color.BROWN]
    var maxRows = 6
    var state = {
                    gameField: [],
                    evaluations: [],
                    task: [1,2,3,4].reduce(function(a,v) {
                                        return a.concat(randomExcept(a,colors.length))
                                    }, [])
                                    .map(function(a,i) { return gameArguments[i] || colors[a]})
    }

    function lastEvaluation() {
            return state.evaluations[state.evaluations.length-1]
        }

    return {
        color:color,
        maxRows: maxRows,
        state: state,

        play:function() {
            var blacks = 0
            var whites = 0
            var taskCopy = g.copy(state.task)
            for( var i = 0; i < arguments.length; i++ ) {
                var isBlack = (arguments[i] === taskCopy[i] ? 1 : 0)
                var idx = taskCopy.indexOf(arguments[i])
                blacks += isBlack
                if( !isBlack ) {
                    whites += (idx === -1 ? 0 : 1)
                }
                if( idx !== -1 ) {
                    taskCopy.splice(idx,1)
                }
            }

            state.evaluations.push({blacks: blacks, whites:whites})
            state.gameField.push(arguments)
        },

        lastEvaluation:lastEvaluation,

        isGameOver:function() {
            return state.evaluations.length >= maxRows
        },

        isWon:function() {
            return lastEvaluation().blacks === 4
        }
    }
}

if(typeof(module) !== 'undefined') {
    module.exports = makeGame
}
