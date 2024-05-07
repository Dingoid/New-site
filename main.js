let currentIndex = -1,
  buttonClick = 0,
  startTime = 0,
  endTime = 0,
  ballNumber = 5,
  difficulty = 50,
  settingsOpen = true,
  gameType,
  highScore5_35 = 100,
  highScore5_50 = 100,
  highScore5_75 = 100,
  highScore10_35 = 100,
  highScore10_50 = 100,
  highScore10_75 = 100,
  highScore15_35 = 100,
  highScore15_50 = 100,
  highScore15_75 = 100,
  numOfSpikes,
  buttonID,
  gamePlayerX,
  gamePlayerY,
  gameGoalX,
  gameGoalY,
  spikeArrayX = [],
  spikeArrayY = [],
  spike,
  spikeName,
  spin,
  gameSpinArray = [],
  spikeX,
  spikeY,
  spikeArrayXTemp = [],
  spikeArrayYTemp = [];
const aimBallButtons = ["aimOne", "aimTwo", "aimThree"],
  aimDifficultyButtons = ["aimEasy", "aimMedium", "aimHard"],
  colorNames = ["Blue", "Red", "Yellow", "Green", "Pink", "Purple"],
  gameButtons = ["button5", "button10", "button15"],
  colorHexes = [
    "#0000FF",
    "#FF0000",
    "#FFFF00",
    "#008000",
    "#FFC0CB",
    "#800080",
  ];

function colorChange() {
  // colorChange Proj : all of the ColorChange Proj in 1 function
  let randIndex = Math.floor(Math.random() * colorNames.length);
  if (currentIndex != randIndex) {
    let colorName = colorNames[randIndex];
    let colorHex = colorHexes[randIndex];
    document.getElementById("colorFlipper").style.backgroundColor =
      colorHexes[randIndex];
    document.getElementById("colorTextColor").style.color = colorHex;
    document.getElementById("colorTextColor").innerHTML = colorName;
    document.getElementById("colorHexText").innerHTML = "Hex: " + colorHex;
    currentIndex = randIndex;
  } else {
    let randIndex = Math.floor(Math.random() * colorNames.length);
    if (currentIndex == randIndex) {
      randIndex = Math.floor(Math.random() * colorNames.length);
    }
    let colorName = colorNames[randIndex];
    let colorHex = colorHexes[randIndex];
    document.getElementById("colorFlipper").style.backgroundColor =
      colorHexes[randIndex];
    document.getElementById("colorTextColor").style.color = colorHex;
    document.getElementById("colorTextColor").innerHTML = colorName;
    document.getElementById("colorHexText").innerHTML = "Hex: " + colorHex;
    currentIndex = randIndex;
  }
}

function settingsChange(clicked_id) {
  // aimGame Proj : all of the setting changing (i.e. changing color of button selection, changing target size, and changing amount of balls you have to click)
  let currentDifficultyId = "aimMedium";
  let currentBallCountId = "aimOne";
  if (
    aimBallButtons.includes(clicked_id) == true &&
    aimDifficultyButtons.includes(clicked_id) == false &&
    document.getElementById(clicked_id).style.color != "red"
  ) {
    for (i = 0; i < aimBallButtons.length; i++) {
      document.getElementById(aimBallButtons[i]).style.color = "white";
    }
    document.getElementById(clicked_id).style.color = "red";
    currentBallCountId = clicked_id;
    if (currentBallCountId == "aimTwo") {
      ballNumber = 10;
    } else if (currentBallCountId == "aimThree") {
      ballNumber = 15;
    } else {
      ballNumber = 5;
    }
    aimGameType(ballNumber, difficulty);
    aimHighScoreTime();
  } else if (
    aimBallButtons.includes(clicked_id) == false &&
    aimDifficultyButtons.includes(clicked_id) == true &&
    document.getElementById(clicked_id).style.color != "red"
  ) {
    for (i = 0; i < aimDifficultyButtons.length; i++) {
      document.getElementById(aimDifficultyButtons[i]).style.color = "white";
    }
    document.getElementById(clicked_id).style.color = "red";
    currentDifficultyId = clicked_id;
    if (currentDifficultyId == "aimEasy") {
      difficulty = 75;
    } else if (currentDifficultyId == "aimHard") {
      difficulty = 35;
    } else {
      difficulty = 50;
    }
    aimGameType(ballNumber, difficulty);
    aimHighScoreTime();
  }
}

function aimSettingsOpenClosed() {
  // aimGame Proj : when you press the settings button, opens all setting or closes all settings
  if (settingsOpen != true) {
    for (i = 0; i < aimBallButtons.length; i++) {
      document.getElementById(aimBallButtons[i]).style.visibility = "visible";
      document.getElementById(aimDifficultyButtons[i]).style.visibility =
        "visible";
    }
    settingsOpen = true;
  } else if (settingsOpen != false) {
    for (i = 0; i < aimBallButtons.length; i++) {
      document.getElementById(aimBallButtons[i]).style.visibility = "hidden";
      document.getElementById(aimDifficultyButtons[i]).style.visibility =
        "hidden";
    }
    settingsOpen = false;
  }
}

function aimStart() {
  // aimGame Proj : when you press the start button runs all of the functions that make the game work and keeps other buttons hidden while game is going, also formats the timer time using other functions
  if (startTime == 0) {
    aimStartTimer();
  }
  aimButtonOrBall();
  for (i = 0; i < aimBallButtons.length; i++) {
    document.getElementById(aimDifficultyButtons[i]).style.visibility =
      "hidden";
    document.getElementById(aimBallButtons[i]).style.visibility = "hidden";
  }
  document.getElementById("aimSettings").style.visibility = "hidden";
  settingsOpen = false;
  document.getElementById("aimTimer").style.visibility = "hidden";
  document.getElementById("aimHighScore").style.visibility = "hidden";
  aimRandomPoint();
  buttonClick++;
  if (buttonClick >= ballNumber + 1) {
    aimButtonOrBall();
    buttonClick = 0;
    if (endTime == 0) {
      aimEndTimer();
    }
    let finalTime = (endTime - startTime) / 1000;
    aimGameType(ballNumber, difficulty);
    aimHighScoreTimeCalc(finalTime);
    document.getElementById("aimTimerTime").innerHTML =
      finalTime.toFixed(3) + " seconds";
    aimHighScoreTime();
    startTime = 0;
    endTime = 0;
  }
}

function aimGameType(ballNumber, difficulty) {
  // aimGame Proj : turns the settings buttons chosen into a string for other functions to use
  if (ballNumber == 5) {
    if (difficulty == 35) {
      gameType = "5 35";
    } else if (difficulty == 50) {
      gameType = "5 50";
    } else if (difficulty == 75) {
      gameType = "5 75";
    }
  } else if (ballNumber == 10) {
    if (difficulty == 35) {
      gameType = "10 35";
    } else if (difficulty == 50) {
      gameType = "10 50";
    } else if (difficulty == 75) {
      gameType = "10 75";
    }
  } else if (ballNumber == 15) {
    if (difficulty == 35) {
      gameType = "15 35";
    } else if (difficulty == 50) {
      gameType = "15 50";
    } else if (difficulty == 75) {
      gameType = "15 75";
    }
  }
}

function aimHighScoreTimeCalc(finalTime) {
  // aimGame Proj : formats high score times (could possible combine with aimHighScoreTime() but ill come back to it)
  if (gameType === "5 75" && highScore5_75 > finalTime) {
    highScore5_75 = finalTime.toFixed(3);
  } else if (gameType === "5 50" && highScore5_50 > finalTime) {
    highScore5_50 = finalTime.toFixed(3);
  } else if (gameType === "5 35" && highScore5_35 > finalTime) {
    highScore5_35 = finalTime.toFixed(3);
  } else if (gameType === "10 75" && highScore10_75 > finalTime) {
    highScore10_75 = finalTime.toFixed(3);
  } else if (gameType === "10 50" && highScore10_50 > finalTime) {
    highScore10_50 = finalTime.toFixed(3);
  } else if (gameType === "10 35" && highScore10_35 > finalTime) {
    highScore10_35 = finalTime.toFixed(3);
  } else if (gameType === "15 75" && highScore15_75 > finalTime) {
    highScore15_75 = finalTime.toFixed(3);
  } else if (gameType === "15 50" && highScore15_50 > finalTime) {
    highScore15_50 = finalTime.toFixed(3);
  } else if (gameType === "15 35" && highScore15_35 > finalTime) {
    highScore15_35 = finalTime.toFixed(3);
  }
}

function aimHighScoreTime() {
  // aimGame Proj : uses gameType to determine if the new time is faster than previous time of same gameType
  if (gameType === "5 75" && highScore5_75 < 99) {
    document.getElementById("aimHighScoreTime").innerHTML =
      highScore5_75 + " seconds";
  } else if (gameType === "5 50" && highScore5_50 < 99) {
    document.getElementById("aimHighScoreTime").innerHTML =
      highScore5_50 + " seconds";
  } else if (gameType === "5 35" && highScore5_35 < 99) {
    document.getElementById("aimHighScoreTime").innerHTML =
      highScore5_35 + " seconds";
  } else if (gameType === "10 75" && highScore10_75 < 99) {
    document.getElementById("aimHighScoreTime").innerHTML =
      highScore10_75 + " seconds";
  } else if (gameType === "10 50" && highScore10_50 < 99) {
    document.getElementById("aimHighScoreTime").innerHTML =
      highScore10_50 + " seconds";
  } else if (gameType === "10 35" && highScore10_35 < 99) {
    document.getElementById("aimHighScoreTime").innerHTML =
      highScore10_35 + " seconds";
  } else if (gameType === "15 75" && highScore15_75 < 99) {
    document.getElementById("aimHighScoreTime").innerHTML =
      highScore15_75 + " seconds";
  } else if (gameType === "15 50" && highScore15_50 < 99) {
    document.getElementById("aimHighScoreTime").innerHTML =
      highScore15_50 + " seconds";
  } else if (gameType === "15 35" && highScore15_35 < 99) {
    document.getElementById("aimHighScoreTime").innerHTML =
      highScore15_35 + " seconds";
  } else {
    document.getElementById("aimHighScoreTime").innerHTML = "N/A";
  }
}

function aimStartTimer() {
  // aimGame Proj : sets start time to right after the game is started (its called right at the beginning of game start)
  startTime = Date.now();
}

function aimEndTimer() {
  // aimGame Proj : sets end time to when the game ends (its called right at the end of game start)
  endTime = Date.now();
}

function aimButtonOrBall() {
  // aimGame Proj : when the start button is pressed turns the button into a ball until game is over, then it turns it back and makes the timer, settings, and high score visible again
  if (buttonClick >= ballNumber + 1) {
    document.getElementById("aimButton").innerHTML = "Try again?";
    document.getElementById("aimButton").style.visibility = "visible";
    document.getElementById("aimButton").style.width = 15 + "%";
    document.getElementById("aimButton").style.height = "fit-content";
    document.getElementById("aimButton").style.borderRadius = 1 + "vw";
    document.getElementById("aimButton").style.backgroundColor = "black";
    document.getElementById("aimButton").style.left = 37.5 + "%";
    document.getElementById("aimButton").style.top = 75 + "%";
    document.getElementById("aimTimer").style.visibility = "visible";
    document.getElementById("aimHighScore").style.visibility = "visible";
    document.getElementById("aimSettings").style.visibility = "visible";
  } else if (buttonClick != ballNumber + 1) {
    document.getElementById("aimButton").innerHTML = "";
    document.getElementById("aimButton").style.width = difficulty + "px";
    document.getElementById("aimButton").style.height = difficulty + "px";
    document.getElementById("aimButton").style.borderRadius = 50 + "%";
    document.getElementById("aimButton").style.backgroundColor = "green";
  }
}

function aimRandomPoint() {
  // aimGame Proj : moves the ball to a random x/y coordinate inside the game area
  let min = 5;
  let max = 90;
  let x = Math.floor(min + Math.random() * (max - min + 1));
  let y = Math.floor(min + Math.random() * (max - min + 1));
  document.getElementById("aimButton").style.left = x + "%";
  document.getElementById("aimButton").style.top = y + "%";
}

function gameStart() {
  // codeLearningGame Proj : starts the game on button press
  for (i = 0; i < numOfSpikes; i++) {
    let spikeToRemove = document.getElementById("gameSpike" + i);
    if (spikeToRemove != null) {
      spikeToRemove.remove();
    }
  }
  console.log("\n");
  console.log("-----NEW GAME-----");
  gameSpawnEntities();
  gameRandomSpikeSpawn();
  gameIfTrapped();
}

function gameSpawnEntities() {
  // codeLearningGame Proj : uses other functions to spawn all the entities (spikes, player, goal)
  gameRandomGoalSpawn();
  gameRandomPlayerSpawn();
  areTheyTouchingSpikes();
}

function gameRandomGoalSpawn() {
  // codeLearningGame Proj : moves the goal to a random spot in the bottom right of the grid
  let min = 11;
  let max = 14;
  let x = Math.floor(min + Math.random() * (max - min + 1));
  let y = Math.floor(min + Math.random() * (max - min + 1));
  document.getElementById("gameGoal").style.gridColumn = y;
  document.getElementById("gameGoal").style.gridRow = x;
  gameGoalX = x;
  gameGoalY = y;
  gameSpawnOnSpike();
}

function gameRandomPlayerSpawn() {
  // codeLearningGame Proj : moves the player to a random spot in the top left of the grid
  let min = 2;
  let max = 5;
  let x = Math.floor(min + Math.random() * (max - min + 1));
  let y = Math.floor(min + Math.random() * (max - min + 1));
  let minSpin = 1;
  let maxSpin = 4;
  spin = Math.floor(minSpin + Math.random() * (maxSpin - minSpin + 1));
  if (spin == 2) {
    document.getElementById("gamePlayer").style.rotate = 90 + "deg";
  } else if (spin == 3) {
    document.getElementById("gamePlayer").style.rotate = 180 + "deg";
  } else if (spin == 4) {
    document.getElementById("gamePlayer").style.rotate = 270 + "deg";
  }
  gamePlayerX = x;
  gamePlayerY = y;
  if (gamePlayerX == gameGoalX && gamePlayerY == gameGoalY) {
    x = Math.floor(min + Math.random() * (max - min + 1));
    y = Math.floor(min + Math.random() * (max - min + 1));
    gamePlayerX = x;
    gamePlayerY = y;
    document.getElementById("gamePlayer").style.gridColumn = y;
    document.getElementById("gamePlayer").style.gridRow = x;
  } else {
    document.getElementById("gamePlayer").style.gridColumn = y;
    document.getElementById("gamePlayer").style.gridRow = x;
  }
  gameSpawnOnSpike();
  document.getElementById("gameTester").style.gridColumn = gamePlayerY;
  document.getElementById("gameTester").style.gridRow = gamePlayerX;
}

function gameSpawnOnSpike() {
  // codeLearningGame Proj : checks if player or goal spawn ontop of a spike, if they do, removes said spike
  for (i = 0; i < spikeArrayX.length; i++) {
    if (spikeArrayX[i] == gamePlayerX && spikeArrayY[i] == gamePlayerY) {
      let tempPlayerSpike = document.getElementById("gameSpike" + i);
      if (tempPlayerSpike !== null) {
        tempPlayerSpike.remove();
        spikeArrayX.splice(i, 1, null);
        spikeArrayY.splice(i, 1, null);
      }
    }
    if (spikeArrayX[i] == gameGoalX && spikeArrayY[i] == gameGoalY) {
      let tempGoalSpike = document.getElementById("gameSpike" + i);
      if (tempGoalSpike !== null) {
        tempGoalSpike.remove();
        spikeArrayX.splice(i, 1, null);
        spikeArrayY.splice(i, 1, null);
      }
    }
    tempPlayerSpike = 0;
    tempGoalSpike = 0;
  }
}

function gameNumberOfSpike() {
  // codeLearningGame Proj : sets the number of spikes = difficulty selected (Currently not hooked up to any button)
  if (buttonID == "buttonEasy") {
    numOfSpikes = 15;
  } else if (buttonID == "buttonMedium") {
    numOfSpikes = 30;
  } else if (buttonID == "buttonHard") {
    numOfSpikes = 45;
  } else {
    numOfSpikes = 50;
  }
}

function gameRandomSpikeSpawn(clicked_id) {
  // codeLearningGame Proj : spawns spike in random grid space, logs all the coords, then if a spike spawns ontop of another spike, deletes later spike
  spikeArrayX = [];
  spikeArrayY = [];
  spikeArrayXTemp = [];
  spikeArrayYTemp = [];
  buttonID = clicked_id;
  gameNumberOfSpike();
  for (i = 0; i < numOfSpikes; i++) {
    let min = 1;
    let max = 15;
    spikeX = Math.floor(min + Math.random() * (max - min + 1));
    spikeY = Math.floor(min + Math.random() * (max - min + 1));
    spike = document.createElement("div");
    spike.classList.add("gameSpike");
    spike.setAttribute("id", "gameSpike" + i);
    spike.innerHTML = i;
    document.getElementById("gameArea").appendChild(spike);
    document.getElementById("gameSpike" + i).style.gridColumn = spikeY;
    document.getElementById("gameSpike" + i).style.gridRow = spikeX;
    spikeArrayXTemp.push(spikeX);
    spikeArrayYTemp.push(spikeY);
  }

  for (i = 0; i < spikeArrayXTemp.length; i++) {
    let spikeTestX = spikeArrayXTemp[i]; //set spikeTestX to the value of spikeArrayX at the index (first loop 0, send loop 1...)
    let spikeTestY = spikeArrayYTemp[i]; //set spikeTestY to the value of spikeArrayY at the index (first loop 0, send loop 1...)
    for (j = i; j < spikeArrayXTemp.length; j++) {
      //for loop inside for loop, set j = i (j is arbitrary, but cant be same as outter forloop or else it goes forever) (if j is set to 0, when this forloop starts, it checks from the first index to the last, if its set to i it will only check indexes after the index of i (i.e. if its the 15th loop, it wont start from 0 and check all the ones behind 15, it will start from 15 and go forward))
      if (
        // check if spikeTestX has the same value as spikeArrayX[j] (i.e. if its the 3rd loop of the outer loop, spikeTestX = spikeArrayX[2] and spikeArrayX[j] would start at index 2. it would then start the inner loop and check if spikeArrayX[2] == spikeArrayX[2] and then spikeArrayX[2] == spikeArrayX[3] and then spikeArrayX[2] == spikeArrayX[4] and .... until it reaches the end)
        spikeTestX == spikeArrayXTemp[j] &&
        spikeTestY == spikeArrayYTemp[j] &&
        i != j // this checks that as long as i DOES NOT = j (i.e. it wouldnt work if spikeTextX is set to index 2 and spikeArrayX is also set to index 2, all this does it make sure that it doesnt say that "hey index 2 matches index 2", because obviously it does, theyre the same index)
      ) {
        let spikeToRemove = document.getElementById("gameSpike" + j);
        if (spikeToRemove != undefined) {
          spikeToRemove.remove();
          spikeArrayXTemp.splice(j, 1, null);
          spikeArrayYTemp.splice(j, 1, null);
        }
      }
    }
  }

  for (i = 0; i < spikeArrayXTemp.length; i++) {
    if (spikeArrayXTemp[i] == null && spikeArrayYTemp[i] == null) {
      spikeArrayXTemp.splice(i, 1);
      spikeArrayYTemp.splice(i, 1);
    }
  }

  for (i = 0; i < spikeArrayXTemp.length; i++) {
    if (spikeArrayXTemp[i] != null && spikeArrayYTemp[i] != null) {
      spikeArrayX.push(spikeArrayXTemp[i]);
      spikeArrayY.push(spikeArrayYTemp[i]);
    }
  }
}

function gameIfTrapped() {
  let valNotNullPlayer = 0;
  let valNotNullGoal = 0;
  let spikesTouchingPlayer = [null, null, null, null];
  let spikesTouchingGoal = [null, null, null, null];
  for (i = 0; i < spikeArrayY.length; i++) {
    let spikeValueAtIndexX = spikeArrayX[i];
    let spikeValueAtIndexY = spikeArrayY[i];
    if (gamePlayerY >= 1) {
      if (
        spikeValueAtIndexX + 1 == gamePlayerX &&
        spikeArrayY[i] == gamePlayerY
      ) {
        //top
        spikesTouchingPlayer.splice(0, 1, i);
      }
      if (
        spikeValueAtIndexY - 1 == gamePlayerY &&
        spikeArrayX[i] == gamePlayerX
      ) {
        //right
        spikesTouchingPlayer.splice(1, 1, i);
      }
      if (
        spikeValueAtIndexX - 1 == gamePlayerX &&
        spikeArrayY[i] == gamePlayerY
      ) {
        //bottom
        spikesTouchingPlayer.splice(2, 1, i);
      }
      if (
        spikeValueAtIndexY + 1 == gamePlayerY &&
        spikeArrayX[i] == gamePlayerX
      ) {
        //left
        spikesTouchingPlayer.splice(3, 1, i);
      }
    }
  }

  for (i = 0; i < spikeArrayY.length; i++) {
    let spikeValueAtIndexX = spikeArrayX[i];
    let spikeValueAtIndexY = spikeArrayY[i];
    if (gameGoalY <= 15) {
      if (spikeValueAtIndexX + 1 == gameGoalX && spikeArrayY[i] == gameGoalY) {
        //top
        spikesTouchingGoal.splice(0, 1, i);
      }
      if (spikeValueAtIndexY - 1 == gameGoalY && spikeArrayX[i] == gameGoalX) {
        //right
        spikesTouchingGoal.splice(1, 1, i);
      }
      if (spikeValueAtIndexX - 1 == gameGoalX && spikeArrayY[i] == gameGoalY) {
        //bottom
        spikesTouchingGoal.splice(2, 1, i);
      }
      if (spikeValueAtIndexY + 1 == gameGoalY && spikeArrayX[i] == gameGoalX) {
        //left
        spikesTouchingGoal.splice(3, 1, i);
      }
    }
  }

  for (i = 0; i < spikesTouchingPlayer.length; i++) {
    if (spikesTouchingPlayer[i] != null) {
      valNotNullPlayer++;
    }
  }

  if (valNotNullPlayer >= 3) {
    if (spikesTouchingPlayer[1] != null) {
      spikeToRemoveId = spikesTouchingPlayer[1];
      spikeToRemove = document.getElementById("gameSpike" + spikeToRemoveId);
      spikeToRemove.remove();
      console.log("removed spike around player");
    } else if (spikesTouchingPlayer[2] != null) {
      spikeToRemoveId = spikesTouchingPlayer[2];
      spikeToRemove = document.getElementById("gameSpike" + spikeToRemoveId);
      spikeToRemove.remove();
      console.log("removed spike around player");
    }
  }

  for (i = 0; i < spikesTouchingGoal.length; i++) {
    if (spikesTouchingGoal[i] != null) {
      valNotNullGoal++;
    }
  }

  if (valNotNullGoal >= 3) {
    if (spikesTouchingGoal[3] != null) {
      spikeToRemoveId = spikesTouchingGoal[3];
      spikeToRemove = document.getElementById("gameSpike" + spikeToRemoveId);
      spikeToRemove.remove();
      console.log("removed spike around goal");
    } else if (spikesTouchingGoal[0] != null) {
      spikeToRemoveId = spikesTouchingGoal[0];
      spikeToRemove = document.getElementById("gameSpike" + spikeToRemoveId);
      spikeToRemove.remove();
      console.log("removed spike around goal");
    }
  }
}

function gameMovement() {
  gameTurning();
  if (gameSpikeCollision()) {
  } else if (gameGoalCollision()) {
    if (spin == 1) {
      document.getElementById("gamePlayer").style.gridRow = gamePlayerX - 1;
    } else if (spin == 2) {
      document.getElementById("gamePlayer").style.gridColumn = gamePlayerY + 1;
    } else if (spin == 3) {
      document.getElementById("gamePlayer").style.gridRow = gamePlayerX + 1;
    } else if (spin == 4) {
      document.getElementById("gamePlayer").style.gridColumn = gamePlayerY - 1;
    }
    if (gameGoalX == gamePlayerX && gameGoalY == gamePlayerY) {
      console.log("you win");
    }
    console.log("you win");
  } else if (gamePlayerX <= 15 && gamePlayerY <= 15) {
    if (spin == 1) {
      document.getElementById("gamePlayer").style.gridRow = gamePlayerX - 1;
      gamePlayerX--;
    } else if (spin == 2) {
      document.getElementById("gamePlayer").style.gridColumn = gamePlayerY + 1;
      gamePlayerY++;
    } else if (spin == 3) {
      document.getElementById("gamePlayer").style.gridRow = gamePlayerX + 1;
      gamePlayerX++;
    } else if (spin == 4) {
      document.getElementById("gamePlayer").style.gridColumn = gamePlayerY - 1;
      gamePlayerY--;
    }
    if (gamePlayerX == 0) {
      gamePlayerX = 1;
    }
    if (gamePlayerX == 16) {
      document.getElementById("gamePlayer").style.gridRow = gamePlayerX - 1;
      gamePlayerX = 15;
    }
    if (gamePlayerY == 0) {
      gamePlayerY = 1;
    }
    if (gamePlayerY >= 16) {
      document.getElementById("gamePlayer").style.gridColumn = gamePlayerY - 1;
      gamePlayerY = 15;
    }
  }
}

function gameTurning(clicked_id) {
  let x = 0;
  if (spin == 1) {
    gameSpinArray = [1, 2, 3, 4];
  } else if (spin == 2) {
    gameSpinArray = [2, 3, 4, 1];
  } else if (spin == 3) {
    gameSpinArray = [3, 4, 1, 2];
  } else if (spin == 4) {
    gameSpinArray = [4, 1, 2, 3];
  }

  if (clicked_id == "gameTurnLeft") {
    x = gameSpinArray.pop();
    gameSpinArray.unshift(x);
    spin = gameSpinArray[0];
  } else if (clicked_id == "gameTurnRight") {
    x = gameSpinArray.shift();
    gameSpinArray.push(x);
    spin = gameSpinArray[0];
  }

  if (spin == 1) {
    document.getElementById("gamePlayer").style.rotate = 0 + "deg";
  } else if (spin == 2) {
    document.getElementById("gamePlayer").style.rotate = 90 + "deg";
  } else if (spin == 3) {
    document.getElementById("gamePlayer").style.rotate = 180 + "deg";
  } else if (spin == 4) {
    document.getElementById("gamePlayer").style.rotate = 270 + "deg";
  }
}

function gameSpikeCollision() {
  touchingSpike = false;
  for (i = 0; i < spikeArrayX.length; i++) {
    let spikeValueAtIndexX = spikeArrayX[i];
    let spikeValueAtIndexY = spikeArrayY[i];
    if (
      spikeValueAtIndexX + 1 === gamePlayerX &&
      gamePlayerY === spikeArrayY[i] &&
      spin == 1
    ) {
      return (touchingSpike = true);
    }
    if (
      spikeValueAtIndexY - 1 === gamePlayerY &&
      gamePlayerX === spikeArrayX[i] &&
      spin == 2
    ) {
      return (touchingSpike = true);
    }
    if (
      spikeValueAtIndexX - 1 === gamePlayerX &&
      gamePlayerY === spikeArrayY[i] &&
      spin == 3
    ) {
      return (touchingSpike = true);
    }
    if (
      spikeValueAtIndexY + 1 === gamePlayerY &&
      gamePlayerX === spikeArrayX[i] &&
      spin == 4
    ) {
      return (touchingSpike = true);
    }
  }
}

function gameGoalCollision() {
  touchingGoal = false;
  if (gameGoalX + 1 === gamePlayerX && gamePlayerY === gameGoalY && spin == 1) {
    touchingGoal = true;
    return touchingGoal;
  }
  if (gameGoalY - 1 === gamePlayerY && gamePlayerX === gameGoalX && spin == 2) {
    touchingGoal = true;
    return touchingGoal;
  }
  if (gameGoalX - 1 === gamePlayerX && gamePlayerY === gameGoalY && spin == 3) {
    touchingGoal = true;
    return touchingGoal;
  }
  if (gameGoalY + 1 === gamePlayerY && gamePlayerX === gameGoalX && spin == 4) {
    touchingGoal = true;
    return touchingGoal;
  }
}

function areTheyTouchingSpikes() {
  // codeLearningGame Proj : checks if a spike is touching player or goal using graph coords
  let spikesTouchingPlayer = [],
    spikesTouchingGoal = [];
  for (i = 0; i < spikeArrayX.length; i++) {
    let spikeValueAtIndexX = spikeArrayX[i];
    let spikeValueAtIndexY = spikeArrayY[i];
    if (
      gamePlayerX === spikeValueAtIndexX + 1 &&
      gamePlayerY === spikeArrayY[i]
    ) {
      spikesTouchingPlayer.push(i);
    }
    if (
      gamePlayerX === spikeValueAtIndexX - 1 &&
      gamePlayerY === spikeArrayY[i]
    ) {
      spikesTouchingPlayer.push(i);
    }
    if (
      gamePlayerY === spikeValueAtIndexY + 1 &&
      gamePlayerX === spikeArrayX[i]
    ) {
      spikesTouchingPlayer.push(i);
    }
    if (
      gamePlayerY === spikeValueAtIndexY - 1 &&
      gamePlayerX === spikeArrayX[i]
    ) {
      spikesTouchingPlayer.push(i);
    }
    if (gameGoalX === spikeValueAtIndexX + 1 && gameGoalY === spikeArrayY[i]) {
      spikesTouchingGoal.push(i);
    }
    if (gameGoalX === spikeValueAtIndexX - 1 && gameGoalY === spikeArrayY[i]) {
      spikesTouchingGoal.push(i);
    }
    if (gameGoalY === spikeValueAtIndexY + 1 && gameGoalX === spikeArrayX[i]) {
      spikesTouchingGoal.push(i);
    }
    if (gameGoalY === spikeValueAtIndexY - 1 && gameGoalX === spikeArrayX[i]) {
      spikesTouchingGoal.push(i);
    }
  }
}

let N = 15;
let M = 15;

class GridCells {
  constructor(x, y, d) {
    this.row = x;
    this.column = y;
    this.distance = d;
  }
}

function gameMakeMap() {
  // let map = [];
  // let mapRow = new Array(15);
  // let mapY = 1;
  // for (i = 1; i <= 15; i++) {
  //   for (j = 1; j <= 15; j++) {
  //     tempValue = "'" + i + "/" + j + "'";
  //     console.log(tempValue);
  //     if (testArray.indexOf(tempValue) != -1) {
  //       console.log("yes");
  //     }
  //     console.log(testArray.indexOf(tempValue));
  //   }

  //   mapRow.fill("O");
  //   map.push(mapRow);
  // }

  // console.log(testArray);
  // console.log(map);

  let text = "1/8";
  console.log(text.indexOf("/"));
  if (text.indexOf("/") == 2 && text.length == 3) {
    let resultX = text.substring(0, 1);
    let resultY = text.substring(2, 3);
    let resultXconv = +resultX;
    console.log(resultXconv);
    let resultYconv = +resultY;
    console.log(resultYconv);
  }
}

let testArray = [];

function testIfPossible() {
  testArray = [];
  console.log(spikeArrayX);
  console.log(spikeArrayY);
  console.log("\n");
  for (i = 0; i < spikeArrayX.length; i++) {
    testArray.push(spikeArrayX[i] + "/" + spikeArrayY[i]);
  }
  console.log(testArray);
  testArray.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  console.log(testArray);
}
