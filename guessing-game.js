class Game {
  constructor() {
    this.playersGuess = null;
    this.winningNumber = generateWinningNumber();
    this.pastGuesses = [];
  }

  difference() {
    return Math.abs(this.winningNumber - this.playersGuess);
  }

  isLower() {
    return this.playersGuess < this.winningNumber;
  }

  updatePastGuesses() {
    // alert("update past Guess worked");
    for (let i = 0; i < this.pastGuesses.length; i++) {
      let element = document.getElementById(`guess-${i + 1}`);
      element.innerHTML = this.pastGuesses[i];
    }
  }

  updateMessage(msg) {
    let element = document.getElementById("message");
    element.innerHTML = msg;
    // element.innerHTML = element.innerHTML + msg;
  }

  addEventListeners() {

    let submitElement = document.getElementById("submit");
    submitElement.onclick = (event) => {
        const numberInput = document.getElementById("number-input").value;
        if(numberInput > 0 && numberInput < 100)
        {
          const element = document.querySelector("input");
          const guess = Number(element.value);
          const message = this.checkGuess(guess);
          
            // alert("update");
            //if (message !== "You Lose.")
          this.updatePastGuesses();
          
          this.updateMessage(message);
          element.value = "";

        } else {
          this.updateMessage("Not Valid");
        }
    };
  }

  checkGuess(guess) {
    this.playersGuess = guess;


    if (this.playersGuess === this.winningNumber) 
        return "You Guessed it! You beat the Machine!";
    if (this.pastGuesses.includes(this.playersGuess)) 
        return "You have already guessed that number.";

    this.pastGuesses.push(guess);

    if (this.pastGuesses.length === 5)
        return "You Lose.";
    if (this.difference() < 10) 
        return "You're burning up!";
    if (this.difference() < 25) 
        return "You're lukewarm.";
    if (this.difference() < 50) 
        return "You're a bit chilly.";
    if (this.difference() < 100) 
        return "You're ice cold!";
  }

  // provideHint() {
  //   const hints = [
  //     this.winningNumber,
  //     generateWinningNumber(),
  //     generateWinningNumber(),
  //   ];
  //   return shuffle(hints);
  // }
}

function generateWinningNumber() {
  let rando = Math.floor(Math.random() * 100) + 1;
  alert(rando);
  return rando;
}

// function shuffle(array) {
//   var shuffle = array.length,
//     t,
//     i;
//   while (shuffle) {
//     i = Math.floor(Math.random() * shuffle--);

//     t = array[shuffle];
//     array[shuffle] = array[i];
//     array[i] = t;
//   }
//   return array;
// }

const playAgainButton = document.querySelector("#play-again");
playAgainButton.addEventListener("click", () => {
  location.reload();
});

function newGame() {
  const newGame = new Game();
  return newGame;
}

function playGame() {
  const game = newGame();
  document.addEventListener("DOMContentLoaded", (event) => {
    game.addEventListeners();
  });
}
playGame();
