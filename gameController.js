function gameController (maxRows, dropHandler,rowCompleteHandler,newGameHandler) {

    var activeRowIsReady = function(caseTrue, caseFalse) {
        var $acktiveRow = document.querySelectorAll(".active[data-color-class]")
        if($acktiveRow.length === 4) {
            return caseTrue()
        } else {
            return caseFalse()
        }
    }

    var getColorsFrom = function getColorsFrom($nodeList) {
        var colors = []
        for( var i = 0; i < $nodeList.length; i++ ) {
            colors.push($nodeList[i].getAttribute("data-color-class"))
        }
        return colors
    }

    var setDataAvtive = function setDataAvtive(bool, $nodeList) {
        for( var i = 0; i < $nodeList.length; i++ ) {
            $nodeList[i].setAttribute("data-active", String(bool))
            if(bool) {
                $nodeList[i].classList.remove("inactive")
                $nodeList[i].classList.add("active")
            } else {
                $nodeList[i].classList.remove("active")
                $nodeList[i].classList.add("inactive")
            }
        }
    }

    var resetColors = function resetColors(row) {
        var selector = "[data-row='"+row+"']"
        var $resultBeads = document.querySelectorAll(selector)
        for( var i = 0; i < $resultBeads.length; i++ ) {
            var color = $resultBeads[i].getAttribute("data-color-class")
            $resultBeads[i].classList.remove(color)
            $resultBeads[i].removeAttribute("data-color-class")
        }
    }

    var gameLost = function gameLost() {
        var $resultPopup = document.getElementById("loosingPopup")
        $resultPopup.classList.remove("displayNone")
    }

    var gameWon = function gameLost() {
        var $resultPopup = document.getElementById("winningPopup")
        $resultPopup.classList.remove("displayNone")
    }

    var restartGame = function(ev) {
        
        newGameHandler(function() {
            for( var i = 1; i < maxRows; i++ ) {
                    resetColors(i)
                    setDataAvtive(false, document.querySelectorAll(".active[data-row='"+i+"']"))
            }
            setDataAvtive(true, document.querySelectorAll(".inactive[data-row='0']"))
            resetColors(0)
    
            document.getElementById("commitRow").setAttribute("disabled", "true")
    
            document.getElementById("winningPopup").classList.add("displayNone")
            document.getElementById("loosingPopup").classList.add("displayNone")
            
            var $resultBeads = document.getElementsByClassName("resultBeed")
            for(var i = 0; i < $resultBeads.length; i++) {
                $resultBeads[i].classList.remove("white")
                $resultBeads[i].classList.remove("black")
            }
        })
    }

    var addEventListener = function addEventListener($dom, event, fn) {
        for(var i = 0; i < $dom.length; i++ ) {
            $dom[i].addEventListener(event, fn, false)
        }
    }

    // button handler
    // new game button
    addEventListener(document.getElementsByClassName("restartGame"), 'click', restartGame)

    // next row buttoon
    document.getElementById("commitRow").addEventListener('click', function(ev) {
        var $currentRow = document.getElementsByClassName("active")
        var currentRow = $currentRow[0].getAttribute("data-row")
        var colors = getColorsFrom($currentRow)
        rowCompleteHandler(colors, function continueGame(isGameOver, isWon, blacks, whites) {
            var selectorForResultBeads = "div[id='" + currentRow + "'] div.resultBeed"
            var $resultBeads = document.querySelectorAll(selectorForResultBeads)
            for(var i = 0; i < $resultBeads.length; i++ ) {
                if(blacks > 0 ) { $resultBeads[i].classList.add("black"); blacks -= 1; }
                else if(whites > 0 ) {$resultBeads[i].classList.add("white"); whites -= 1; }
            }

            if(isWon) {
                console.log("won game over")
                gameWon()
            } else if(isGameOver) {
                console.log("lost game over")
                gameLost()
            } else {
                setDataAvtive(false, document.querySelectorAll(".active[data-row='"+currentRow+"']"))
                setDataAvtive(true, document.querySelectorAll(".inactive[data-row='"+(Number(currentRow)+1)+"']"))
                document.getElementById("commitRow").setAttribute("disabled", "true")


            }
        })
    }, false)

    // create gamefield of template rows
    var $placeHolder = document.getElementById("gameFiled")
    var html = ""
    for( var i = maxRows - 1; i >= 0 ;i-- ) {
        var tmplRow =  g.tmpl("tmpl_row", {rowId:i, rowActive: (i===0)})
        html += tmplRow
    }
    $placeHolder.innerHTML = html

    var $dragElement = null

    // attach drp event handler
    var $dropElements = document.getElementsByClassName("plcaholder")
    for( var i = 0; i < $dropElements.length; i++) {
        $dropElements[i].addEventListener('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();

            if( e.target.getAttribute("data-active") === 'false' ) return

            this.classList.add($dragElement.getAttribute("data-color-class"))
            this.classList.remove("dragEnter")
            this.classList.remove(this.getAttribute("data-color-class"))
            this.setAttribute("data-color-class", $dragElement.getAttribute("data-color-class"))
            var currentRow = this.getAttribute("data-row")
            dropHandler($dragElement.getAttribute("data-color-class"),
                        currentRow,
                        this.getAttribute("data-col"),
                        g.noop)
            activeRowIsReady(
                function caseTrue() {
                    document.getElementById("commitRow").removeAttribute("disabled")
                },
                function caseFalse() {
document.getElementById("commitRow").setAttribute("disabled","true")
                }
            )

        },false)
        $dropElements[i].addEventListener('dragover', function(e) {
            if( !e.target.classList.contains("plcaholder") ) return true
            e.preventDefault();
            return false
        },false)
        $dropElements[i].addEventListener('dragenter', function(e) {
            if( !e.target.classList.contains("plcaholder") ) return true
            if( e.target.getAttribute("data-active") === 'false' ) return true
            e.preventDefault();
            this.classList.add("dragEnter")
            return false
        },false)
        $dropElements[i].addEventListener('dragleave', function(ev) {
            this.classList.remove("dragEnter")
        },false)
    }

    // attach drag event handler
    var $dragElements = document.getElementsByClassName("bead")
    for( var i = 0; i < $dragElements.length; i++) {
        $dragElements[i].addEventListener('dragstart', function(e) {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('elementDragged', "hallo");
            $dragElement = this
        },false)
        $dragElements[i].addEventListener('dragend', function(ev) {
            $dragElement = null
        },false)
    }
}
