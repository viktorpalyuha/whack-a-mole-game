let holes = document.getElementsByClassName("hole");
let moles = document.getElementsByClassName("mole");
let scoreBoard = document.querySelector(".game-start > p");
let button = document.querySelector(".game-start > button");
let gameTime = true;
let lastMole;
let score = 0;

function randomTime(min, max) {
    return Math.round(Math.random() * (max-min) + min)
}

function getRandomMole(moles) {
    let randomMole =  Math.floor(Math.random() * moles.length);
    let mole = moles[randomMole];
    
    if(mole === lastMole) {
        return getRandomMole(moles);
    }

    lastMole = mole;

    return mole;
}

function peep() {
    let mole = getRandomMole(moles);
    let time = randomTime(500, 2000);

    mole.classList.add("up");

    setTimeout(() => {
        mole.classList.remove("up");
        if(gameTime) {
            peep();
        }
    }, time)
}

function startGame() {
    score = 0;
    scoreBoard.innerHTML = score;
    gameTime = true;
    peep();
    setTimeout(()=> gameTime = false, 10000)
}

function whack(e) {
    if(!e.isTrusted) return;
    score++;
    this.classList.remove("up");
    scoreBoard.innerHTML = score;
}

[...moles].map(mole => mole.addEventListener("click", whack));

button.addEventListener("click", startGame);