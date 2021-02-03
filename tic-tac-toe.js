const board = (()=>{
    const winningArray = [
                            [0,1,2],
                            [3,4,5],
                            [6,7,8],
                            [0,3,6],
                            [1,4,7],
                            [2,5,8],
                            [0,4,8],
                            [2,4,6],
                        ]
    const grid = () => Array.from(document.querySelectorAll(".square"));

    const restart = () => {
        //replayMessage.classList.remove("show");
        grid().forEach(el => el.innerText ="")
        grid().forEach(el => el.classList.remove("winner"))
        grid().forEach(el => el.classList.remove("unavailable"))
        replay.classList.remove("show")
        enableListeners();
    }

    const enableListeners = () => grid().forEach(square => square.addEventListener("click", playerClick));
    const disableListeners = () => grid().forEach(square => square.removeEventListener("click", playerClick));
    const replayButton = document.querySelector("#replayBtn").addEventListener("click", restart)
    let replay = document.querySelector("#replay")

    const playerClick = (e) => {
        takeTurn(clearId(e.target), "x");
        unavailable()
        if(checkForVictory() === false){
            opponentTurn()
            }
        else {endGame()}
    }

    const opponentTurn = () =>{
        disableListeners();
        setTimeout(() => {
            takeTurn(computerChoice(), "o");
            if (!checkForVictory()){
                enableListeners();
                unavailable()
            }
        },Math.random() * 1000) 
    }

    const unavailable = () => { grid().forEach(square => {
        if (square.innerText === "x" || square.innerText === "o"){
            square.classList.add("unavailable")
            square.removeEventListener("click", playerClick)
        }
    })}

    const computerChoice = () => clearId(findEmptys()[Math.floor(Math.random() * findEmptys().length)]);

    const checkForVictory = () => {
        let victory = false;
        
        winningArray.forEach(combo => {
            const _grid = grid();
            const sequence = [_grid[combo[0]], _grid[combo[1]], _grid[combo[2]]];
            if (allSame(sequence)){
                victory = true;
                endGame(sequence);
            }
        })
        return victory;
    }

    const endGame = (winningSequence) => {
        if (winningSequence !== undefined){
            disableListeners();
            winningSequence.forEach(el => el.classList.add("winner"));
            replay.classList.add("show")
        }else {
            replay.classList.add("show")
        }
    }

    const clearId = (el) => Number.parseInt(el.id.replace("q", ""));
    const findEmptys = () => grid().filter(square => square.innerText === "");
    const allSame = (arr) => arr.every(el => el.innerText === arr[0].innerText && el.innerText !== "");

    const takeTurn = (index, letter) => {
        grid()[index].innerText = letter;
    };

    const playerName = ""

    return {enableListeners}
})();

board.enableListeners()