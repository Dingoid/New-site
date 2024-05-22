const aimBallButtons = ["aimOne", "aimTwo", "aimThree"],
	aimDifficultyButtons = ["aimEasy", "aimMedium", "aimHard"];

let buttonClick = 0,
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
	highScore15_75 = 100;

function settingsChange(clicked_id) {
	//all of the setting changing (i.e. changing color of button selection, changing target size, and changing amount of balls you have to click)
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
	//when you press the settings button, opens all setting or closes all settings
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
	//when you press the start button runs all of the functions that make the game work and keeps other buttons hidden while game is going, also formats the timer time using other functions
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
	//turns the settings buttons chosen into a string for other functions to use
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
	//formats high score times (could possible combine with aimHighScoreTime() but ill come back to it)
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
	//uses gameType to determine if the new time is faster than previous time of same gameType
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
	//sets start time to right after the game is started (its called right at the beginning of game start)
	startTime = Date.now();
}

function aimEndTimer() {
	//sets end time to when the game ends (its called right at the end of game start)
	endTime = Date.now();
}

function aimButtonOrBall() {
	//when the start button is pressed turns the button into a ball until game is over, then it turns it back and makes the timer, settings, and high score visible again
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
	//moves the ball to a random x/y coordinate inside the game area
	let min = 5;
	let max = 90;
	let x = Math.floor(min + Math.random() * (max - min + 1));
	let y = Math.floor(min + Math.random() * (max - min + 1));
	document.getElementById("aimButton").style.left = x + "%";
	document.getElementById("aimButton").style.top = y + "%";
}
