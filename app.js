let resetbtn = document.querySelector(".resetgame");
let boxes = document.querySelectorAll(".click");
let msgContainer = document.querySelector(".msgcontainer");
let msg = document.querySelector("#msg");
let newbtn = document.querySelector(".newgame");

let turnO = true;
let moveCount = 0;

const winpatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const resetgame = () => {
    turnO = true;
    moveCount = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    msg.innerText = ""; 
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        moveCount++; 
        checkWinner();
    });
});

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = ""; 
    }
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations!! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winpatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if (pos1 && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return; 
        }
    }

    if (moveCount === 9) {
        msg.innerText = "It's a Tie!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};

resetbtn.addEventListener("click", resetgame);
newbtn.addEventListener("click", resetgame);