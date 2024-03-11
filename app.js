let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let resultContainer = document.querySelector(".result");
let msg = document.querySelector("#msg");

let turn = 0;  //0 means "0" and 1 means "X"

let boxesClicked = 0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("A box is clicked!");
        boxesClicked++;
        if(turn===0) {
            box.innerText = "X";
            box.style.color = "violet";
            turn = 1;
        }
        else {
            box.innerText = "O";
            box.style.color = "#7469B6";
            turn = 0;
        }
        box.disabled = true;
        checkWinner();
    });
});

const showWinner = (winner) => {
    msg.innerHTML = `Wow bro! The winner is <span style="text-decoration:underline;color:purple;"><b>${winner}</b></span>\n (Click on RESET button to play new game!)`;
    msg.style.backgroundColor = "violet";
};

const drawMatch = () => {
    msg.innerHTML = `Both are good! It's a draw game!\n (Click on RESET button to play new game!)`;
    msg.style.backgroundColor = "violet";
}

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
    }
}

const checkWinner = () => {
    if(boxesClicked===9) {
        boxesClicked = 0;
        drawMatch();
        return;
    }
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if(pos1Val !="" && pos2Val !="" && pos3Val !="") {
            if(pos1Val===pos2Val && pos2Val===pos3Val) {
                disableBoxes();
                showWinner(pos1Val);
            }
        }
    }
};

resetBtn.addEventListener("click",() => {
    turn = 0;
    boxesClicked = 0;
    for(let i=0;i<boxes.length;i++)
    {
        boxes[i].innerText = "";
    }
    enableBoxes();
    msg.innerText = "";
});
