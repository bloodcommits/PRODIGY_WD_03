let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let music = new Audio("music.mp3");
let audioturn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    music.pause();
    music.currentTime = 0; // Reset music to start
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") { // Ensure box is empty before allowing a move
            audioturn.play();
            if (turnO) {
                box.innerText = "O";
                turnO = false;
            } else {
                box.innerText = "X";
                turnO = true;
            }
            box.disabled = true;

            checkWinner();
        }
    });
});

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
}

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    music.play(); 
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width="200px";
}

const checkDraw = () => {
    return [...boxes].every(box => box.innerText !== "");
}

const showDraw = () => {
    msg.innerText = "It's a Draw!!!";
    msgContainer.classList.remove("hide");
    music.play(); // Play draw music
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let posVal1 = boxes[pattern[0]].innerText;
        let posVal2 = boxes[pattern[1]].innerText;
        let posVal3 = boxes[pattern[2]].innerText;

        if (posVal1 !== "" && posVal2 !== "" && posVal3 !== "") {
            if (posVal1 === posVal2 && posVal2 === posVal3) {
                console.log("Winner", posVal1);
                showWinner(posVal1);
                return;
            }
        }
    }

    if (checkDraw()) {
        showDraw();
    }
};

newGamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
