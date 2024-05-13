const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle'
const cellElements = document.querySelectorAll('.cell');
const board = document.querySelector('.board');
const winningMessageElement = document.querySelector('.win-message');
const winMessageText = document.querySelector('.message-text')
const WINNING_COMBINATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const restart = document.querySelector('.restart');
let circleTurn

startGame()

restart.addEventListener('click', startGame)
//each cell can only be clicked once
function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    //placemark

    //check for win
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    }else if(isDraw()) {
        endGame(true)
    } else {
        swarpTurns()
    setBoardHoverClass()
    }
    //check for draw
    //switch turns
   
    
}

function endGame(draw) {
    if (draw) {
        winMessageText.innerText = 'Draw!'
    } else {
        winMessageText.innerText = `${circleTurn ? "O's" : "X's"} wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swarpTurns() {
    circleTurn = !circleTurn 
}
function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    }else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATION.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}