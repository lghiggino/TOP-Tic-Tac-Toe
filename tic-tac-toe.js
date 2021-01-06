const winningArray = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ]
    
let ticTacToe = {
    allSquares: document.querySelectorAll(".square"),
    makeMark : (e) => {
        console.log(e.target.id, e.target.innerText, e.target.dataset.value)
            if (!e.target.innerText) {
                if(player.humanTurn){
                    e.target.innerText = player.humanMarker;
                    e.target.dataset.value = player.humanMarker;

                    victory.checkForVictory();
                    player.toggle();
                    
                } else{
                    e.target.innerText = player.computerMarker;
                    e.target.dataset.value = player.computerMarker;
                    
                    victory.checkForVictory();
                    player.toggle();
                    
                }  
            } else{
                return
            }    
        },





}

let player = {
    humanMarker : "x",
    computerMarker : "o",
    humanTurn : true,
    computerTurn : false,
    toggle : () => {
        if (player.humanTurn){
            player.humanTurn = false;
            player.computerTurn = true;
        } else {
            player.computerTurn = false;
            player.humanTurn = true;
        }
    },
    //setMark não funciona pq não identifica o valor do event target. Repensar
    setMark : (e, playerTurn) => {
        if (playerTurn === player.humanTurn){
            e.target.innerText = player.humanMarker;
            e.target.dataset.value = player.humanMarker;
        }else{
            e.target.innerText = player.computerMarker;
            e.target.dataset.value = player.computerMarker;
        }  
    },
}

let victory = {
    checkForVictory: () => {
        console.log("is there a victory in this situation?")
        // ticTacToe.allSquares.forEach(square => {
        //     // square.dataset.value
        //     console.log(square.id.slice(1,2), square.dataset.value)
        // })
        let inputs = []
        ticTacToe.allSquares.forEach(square => {
            inputs.push(square.innerText)
        })
        console.log(inputs)
        
        for (i = 0; i< winningArray.length; i++){
            if  (inputs[winningArray[i][0]] === "x" && inputs[winningArray[i][1]] ==="x" && inputs[winningArray[i][2]] === "x"){
                console.log("X wins")
                return
            } if (inputs[winningArray[i][0]] === "o" && inputs[winningArray[i][1]] ==="o" && inputs[winningArray[i][2]] === "o"){
                console.log("O wins")
                return
            } 
        }
    },

}



ticTacToe.allSquares.forEach(square => {
    square.addEventListener("click", ticTacToe.makeMark)
})
    