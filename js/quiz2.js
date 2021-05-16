"use strict";

// JQuery post json code
jQuery["postJSON"] = function( data, callback ) {
  // shift arguments if data argument was omitted
  if ( jQuery.isFunction( data ) ) {
      callback = data;
      data = undefined;
  }

  return jQuery.ajax({
      url: "../api/quiz",
      type: "POST",
      contentType:"application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(data),
      success: callback
  });
};
// example of how to post a json

/* $.postJSON({"answerChoice":1}, function (data) {
  console.log(data);
});
 */

// MDN web docs (2020). Working with objects.
// Link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
// Nature of help received: primarily syntax
// Date: Thursday, October 29, 2020

// the link above was useful for object syntax

// question data
const gameState = {
  "question1": {
      "questionTitle": "What is the largest number?",
      "questionA": 10,
      "questionB": 11,
      "questionC": 17,
      "questionD": 23
  },
  "question2": {
      "questionTitle": "What is 10 ÷ 5 ?",
      "questionA": 2,
      "questionB": 2.5,
      "questionC": 3,
      "questionD": 4
  },
  "options": {
      "roundNumber": 1,
      "score": 0,
      "lives": 2,
      "gameRunning": true
  }
}

// Game functions
// function that updates the html
function updateHTML(data) {

  var roundNumber = gameState.options.roundNumber;
  var lives = gameState.options.lives;
  var score = gameState.options.score;

  // update only if the game is not over
  if (data.options.gameRunning == true) {

    const question1Title = data.question1.questionTitle;
    const answer1A = data.question1.questionA;
    const answer1B = data.question1.questionB;
    const answer1C = data.question1.questionC;
    const answer1D = data.question1.questionD;
    const question2Title = data.question2.questionTitle;
    const answer2A = data.question2.questionA;
    const answer2B = data.question2.questionB;
    const answer2C = data.question2.questionC;
    const answer2D = data.question2.questionD;

    // w3schools (2020). HTML DOM getElementById() Method.
    // Link: https://www.w3schools.com/jsref/met_document_getelementbyid.asp
    // Nature of help received: primarily syntax
    // Date: Thursday, October 29, 2020

    // the reference above was useful for dom manipulation

    if (roundNumber == 1) {
        document.getElementById("question-title").innerHTML = question1Title;
        document.getElementById("questionA").innerHTML = answer1A;
        document.getElementById("questionB").innerHTML = answer1B;
        document.getElementById("questionC").innerHTML = answer1C;
        document.getElementById("questionD").innerHTML = answer1D;
    }
    if (roundNumber == 2) {
        document.getElementById("question-title").innerHTML = question2Title;
        document.getElementById("questionA").innerHTML = answer2A;
        document.getElementById("questionB").innerHTML = answer2B;
        document.getElementById("questionC").innerHTML = answer2C;
        document.getElementById("questionD").innerHTML = answer2D;
    }
  }
  document.getElementById("roundNumber").innerHTML = roundNumber;
  document.getElementById("lives").innerHTML = lives;
  document.getElementById("score").innerHTML = score;
}

// START OF MAIN GAME LOGIC //

// function to handle click events
function handleClick(button) {
  // playerChoice will be A, B, C, or D
  const playerChoice = button.innerHTML;

  // roundNumber declaring variable
  var roundNumber = gameState.options.roundNumber;

  // if player got the correct answer and the roundNumber was number 1
  if (roundNumber == 1) {
    $.postJSON({"roundNumber":roundNumber,"playerChoice":playerChoice}, function (data) {
      if (data.answer == true) {
        incrementScore();
        nextRound();
        updateHTML(gameState);
    }
    // otherwise if player got the wrong answer
    else {
        decrementScore();
        decrementLives();
        checkLives();
        updateHTML(gameState);
    }
    });
  }
  // if player got the correct answer and the roundNumber was number 2
  if (roundNumber == 2) {
    $.postJSON({"roundNumber":roundNumber,"playerChoice":playerChoice}, function (data) {
      if (data.answer == true) {
        incrementScore();
        nextRound();
        updateHTML(gameState);
    }
    // otherwise if player got the wrong answer
    else {
        decrementScore();
        decrementLives();
        checkLives();
        updateHTML(gameState);
    }
    });
  }
}
// END OF MAIN GAME LOGIC //

// reusable game functions
function nextRound() {
  gameState.options.roundNumber += 1;
}

function incrementScore() {
  gameState.options.score += 1;
}

function decrementScore() {
  if (gameState.options.score != 0) {
      gameState.options.score -= 1;
  }
}

function decrementLives() {
  if (gameState.options.lives > 0) {
      gameState.options.lives -= 1;
  }
}

function displayEndingMessage() {
  gameState.options.roundNumber = "You win!!!";
}

function endGame() {
  gameState.options.gameRunning = false;
}

function checkLives() {
  if (gameState.options.lives == 0) {
      gameState.options.roundNumber = "You ran out of lives";
      updateHTML(gameState);
      endGame();
  }
}

// initialize html
updateHTML(gameState);
