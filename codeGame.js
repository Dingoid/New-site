let numOfSpikes,
	buttonID,
	spikeTemp,
	spikeName,
	spin,
	spinStart,
	gameSpinArray = [],
	spikeX,
	spikeY,
	spikeArrayTemp = [],
	spike = [],
	gameGoal,
	gamePlayer,
	gamePlayerStart,
	gameLives = 3,
	gameLevel = 1,
	gameInProgress = false,
	gameButtonsPressed = [],
	gameHasStarted = false,
	pressedButtons,
	tempChild,
	spikeCollision,
	goalCollision;

function gameStart() {
	// codeLearningGame Proj : starts the game on button press
	document.getElementById("gameStartButton").style.visibility = "hidden";
	document.getElementById("gameStartButton").style.zIndex = -10;
	document.getElementById("gameWon").style.zIndex = -50;
	document.getElementById("lifeLost").style.zIndex = -50;
	document.getElementById("gamePlayer").style.visibility = "visible";
	document.getElementById("gameGoal").style.visibility = "visible";
	gameHasStarted = true;
	spikeCollision = false;
	goalCollision = false;
	gameLives = 3;
	numOfSpikes = 100;
	for (i = 0; i < numOfSpikes; i++) {
		let spikeToRemove = document.getElementById("gameSpike" + i);
		if (spikeToRemove != undefined) {
			spikeToRemove.remove();
		}
	}
	console.log("\n");
	console.log("-----NEW GAME-----");
	gameSpawnEntities();
	testIfPossible();
	if (testIfPossible(true)) {
		gamePlaceOnGrid();
		gameSpawnedOnSpike();
	} else {
		gameStart();
	}
}

function gameSpawnEntities() {
	// codeLearningGame Proj : uses other functions to spawn all the entities (spikes, player, goal)
	gameRandomSpikeSpawn();
	gameRandomGoalSpawn();
	gameRandomPlayerSpawn();
	document.getElementById("gameHeart3").style.opacity = 1;
	document.getElementById("gameHeart2").style.opacity = 1;
	document.getElementById("gameHeart1").style.opacity = 1;
}

function gameRandomGoalSpawn() {
	// codeLearningGame Proj : moves the goal to a random spot in the bottom right of the grid
	let min = 11;
	let max = 14;
	let x = Math.floor(min + Math.random() * (max - min + 1));
	let y = Math.floor(min + Math.random() * (max - min + 1));
	gameGoal = { x: x, y: y };
}

function gameRandomPlayerSpawn() {
	// codeLearningGame Proj : moves the player to a random spot in the top left of the grid
	let min = 2;
	let max = 5;
	let minSpin = 1;
	let maxSpin = 4;
	let x = Math.floor(min + Math.random() * (max - min + 1));
	let y = Math.floor(min + Math.random() * (max - min + 1));
	spin = Math.floor(minSpin + Math.random() * (maxSpin - minSpin + 1));
	gamePlayer = { x: x, y: y };
	gamePlayerStart = { x: gamePlayer.x, y: gamePlayer.y };
	spinStart = spin;
}

function gameRandomSpikeSpawn() {
	// codeLearningGame Proj : spawns spike in random grid space, logs all the coords, then if a spike spawns on top of another spike, deletes later spike
	spike = [];
	for (i = 0; i < numOfSpikes; i++) {
		let min = 1;
		let max = 15;
		spikeX = Math.floor(min + Math.random() * (max - min + 1));
		spikeY = Math.floor(min + Math.random() * (max - min + 1));
		spikeArrayTemp.push({ id: i, x: spikeX, y: spikeY });
	}

	for (i = 0; i < spikeArrayTemp.length; i++) {
		let spikeTestX = spikeArrayTemp[i].x;
		let spikeTestY = spikeArrayTemp[i].y;
		for (j = i; j < spikeArrayTemp.length; j++) {
			if (
				spikeTestX == spikeArrayTemp[j].x &&
				spikeTestY == spikeArrayTemp[j].y &&
				i != j
			) {
				let spikeToRemove = document.getElementById(
					"gameSpike" + spikeArrayTemp[j].id
				);
				if (spikeToRemove != undefined) {
					spikeToRemove.remove();
					spikeArrayTemp.splice(j, 1);
				}
			}
		}
	}
	for (i = 0; i < spikeArrayTemp.length; i++) {
		if (spikeArrayTemp[i] != null) {
			spike.push(spikeArrayTemp[i]);
		}
	}
	spikeArrayTemp = [];
}

function gameSpawnedOnSpike() {
	// codeLearningGame Proj : checks if player or goal spawns on top of spike, if it does, deletes it
	for (i = 0; i < spike.length; i++) {
		if (spike[i].x == gameGoal.x && spike[i].y == gameGoal.y) {
			let spikeToRemove = document.getElementById("gameSpike" + spike[i].id);
			if (spikeToRemove != undefined) {
				spikeToRemove.remove();
				spike.splice(i, 1);
			}
		}
	}
	for (i = 0; i < spike.length; i++) {
		if (spike[i].x == gamePlayer.x && spike[i].y == gamePlayer.y) {
			let spikeToRemove = document.getElementById("gameSpike" + spike[i].id);
			if (spikeToRemove != undefined) {
				spikeToRemove.remove();
				spike.splice(i, 1);
			}
		}
	}
}

function gamePlaceOnGrid() {
	document.getElementById("gamePlayer").style.gridArea =
		gamePlayer.x + "/" + gamePlayer.y;
	if (spin == 2) {
		document.getElementById("gamePlayer").style.rotate = 90 + "deg";
	} else if (spin == 3) {
		document.getElementById("gamePlayer").style.rotate = 180 + "deg";
	} else if (spin == 4) {
		document.getElementById("gamePlayer").style.rotate = 270 + "deg";
	} else {
		document.getElementById("gamePlayer").style.rotate = 0 + "deg";
	}

	document.getElementById("gameGoal").style.gridArea =
		gameGoal.x + "/" + gameGoal.y;

	for (i = 0; i < spike.length; i++) {
		spikeTemp = document.createElement("div");
		spikeTemp.classList.add("gameSpike");
		spikeTemp.setAttribute("id", "gameSpike" + i);
		spikeTemp.innerHTML = "*";
		document.getElementById("gameArea").appendChild(spikeTemp);
		document.getElementById("gameSpike" + i).style.gridArea =
			spike[i].x + "/" + spike[i].y;
	}
}

function gameMovement() {
	// codeLearningGame Proj : allows player to move using 3 buttons, before moves, checks spin of player to move accordingly
	let i = gameButtonsPressed.length;
	if (i > 0) {
		gameInProgress = true;
	}
	if (i > 0 && gameInProgress == true) {
		let movementDelay = setInterval(() => {
			i--;
			gameCollision();
			if (!gameCollision() && i >= 0) {
				let currentMove = gameButtonsPressed[0];
				gameButtonsPressed.shift();
				gameDeleteChild();

				if (spin == 1 && currentMove == "gameMoveForward") {
					document.getElementById("gamePlayer").style.gridRow =
						gamePlayer.x - 1;
					gamePlayer.x -= 1;
				} else if (spin == 2 && currentMove == "gameMoveForward") {
					document.getElementById("gamePlayer").style.gridColumn =
						gamePlayer.y + 1;
					gamePlayer.y += 1;
				} else if (spin == 3 && currentMove == "gameMoveForward") {
					document.getElementById("gamePlayer").style.gridRow =
						gamePlayer.x + 1;
					gamePlayer.x += 1;
				} else if (spin == 4 && currentMove == "gameMoveForward") {
					document.getElementById("gamePlayer").style.gridColumn =
						gamePlayer.y - 1;
					gamePlayer.y -= 1;
				}

				if (currentMove == "gameTurnRight" || currentMove == "gameTurnLeft") {
					gameTurning(currentMove);
				}
			}
			if (gameCollision() && (i > 0 || i <= 0)) {
				gameDeleteChild(spikeCollision, goalCollision);
				clearInterval(movementDelay);
				gameButtonsPressed = [];
				i = 0;
				setTimeout(() => {
					gameInProgress = false;
				}, 2400);
			} else if (!gameCollision() && i <= 0) {
				clearInterval(movementDelay);
				gameButtonsPressed = [];
				i = 0;
				gameLostLife();
				gameDeathFade();
				setTimeout(() => {
					gameInProgress = false;
					if (gameLives == 0) {
						document.getElementById("gamePlayer").style.opacity = 0;
						gameResetBoard();
						gameHasStarted = false;
					}
					if (gameLives >= 1) {
						document.getElementById("gamePlayer").style.gridArea =
							gamePlayerStart.x + " / " + gamePlayerStart.y;
						gamePlayer.x = gamePlayerStart.x;
						gamePlayer.y = gamePlayerStart.y;
						spin = spinStart;
						gameTurning();
					}
				}, 2400);
			}
		}, 500);
	}
}

function gameCollision() {
	if (gameSpikeCollision()) {
		spikeCollision = true;
		gameButtonsPressed = [];
		i = 0;
		gameLostLife();
		gameDeathFade();
		if (gameLives == 0) {
			setTimeout(() => {
				document.getElementById("gamePlayer").style.opacity = 0;
				gameResetBoard();
				gameHasStarted = false;
			}, 2400);
		} else if (gameLives >= 1) {
			setTimeout(() => {
				document.getElementById("gamePlayer").style.gridArea =
					gamePlayerStart.x + " / " + gamePlayerStart.y;
				gamePlayer.x = gamePlayerStart.x;
				gamePlayer.y = gamePlayerStart.y;
				spin = spinStart;
				gameTurning();
				document.getElementById("gamePlayer").style.opacity = 0;
			}, 2400);
		}
		return true;
	} else if (gameGoalCollision()) {
		goalCollision = true;
		gameWonFade();
		setTimeout(() => {
			gameWon();
			gameStart();
		}, 2400);
		return true;
	} else {
		return false;
	}
}

function gameDeleteChild(spikeCollision, goalCollision) {
	if (spikeCollision == true || goalCollision == true) {
		console.log("spike or goal collision");
		pressedButtons = document.getElementById("pressedRightPanel");
		if (pressedButtons.hasChildNodes()) {
			while (pressedButtons.firstChild) {
				pressedButtons.removeChild(pressedButtons.lastChild);
			}
		}
		pressedButtons = document.getElementById("pressedLeftPanel");
		if (pressedButtons.hasChildNodes()) {
			while (pressedButtons.firstChild) {
				pressedButtons.removeChild(pressedButtons.lastChild);
			}
		}
	} else {
		pressedButtons = document.getElementById("pressedLeftPanel");
		pressedButtons.removeChild(pressedButtons.firstChild);
		if (gameButtonsPressed.length >= 33 && gameButtonsPressed.length < 66) {
			pressedButtons = document.getElementById("pressedRightPanel");
			tempChild = pressedButtons.firstChild;
			pressedButtons.removeChild(pressedButtons.firstChild);
			pressedButtons = document.getElementById("pressedLeftPanel");
			pressedButtons.appendChild(tempChild);
		}
	}
}

function gameButtonActions(clicked_id) {
	// controls buttons pressed to add actions to game
	let buttonTemp;
	if (
		gameButtonsPressed.length <= 32 &&
		gameInProgress == false &&
		gameHasStarted == true
	) {
		if (clicked_id == "gameTurnLeft") {
			buttonTemp = document.createElement("div");
			buttonTemp.classList.add("gameButtonsInPanel");
			buttonTemp.innerHTML = "turn left";
			document.getElementById("pressedLeftPanel").appendChild(buttonTemp);
			gameButtonsPressed.push(clicked_id);
		}
		if (clicked_id == "gameMoveForward") {
			buttonTemp = document.createElement("div");
			buttonTemp.classList.add("gameButtonsInPanel");
			buttonTemp.innerHTML = "forward";
			document.getElementById("pressedLeftPanel").appendChild(buttonTemp);
			gameButtonsPressed.push(clicked_id);
		}
		if (clicked_id == "gameTurnRight") {
			buttonTemp = document.createElement("div");
			buttonTemp.classList.add("gameButtonsInPanel");
			buttonTemp.innerHTML = "turn right";
			document.getElementById("pressedLeftPanel").appendChild(buttonTemp);
			gameButtonsPressed.push(clicked_id);
		}
	} else if (
		gameButtonsPressed.length >= 33 &&
		gameButtonsPressed.length < 66 &&
		gameInProgress == false &&
		gameHasStarted == true
	) {
		if (clicked_id == "gameTurnLeft") {
			buttonTemp = document.createElement("div");
			buttonTemp.classList.add("gameButtonsInPanel");
			buttonTemp.innerHTML = "turn left";
			document.getElementById("pressedRightPanel").appendChild(buttonTemp);
			gameButtonsPressed.push(clicked_id);
		}
		if (clicked_id == "gameMoveForward") {
			buttonTemp = document.createElement("div");
			buttonTemp.classList.add("gameButtonsInPanel");
			buttonTemp.innerHTML = "forward";
			document.getElementById("pressedRightPanel").appendChild(buttonTemp);
			gameButtonsPressed.push(clicked_id);
		}
		if (clicked_id == "gameTurnRight") {
			buttonTemp = document.createElement("div");
			buttonTemp.classList.add("gameButtonsInPanel");
			buttonTemp.innerHTML = "turn right";
			document.getElementById("pressedRightPanel").appendChild(buttonTemp);
			gameButtonsPressed.push(clicked_id);
		}
	}
}

function gameTurning(currentMove) {
	// codeLearningGame Proj : sets player rotation based on spin that player is currently at
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

	if (currentMove == "gameTurnLeft") {
		x = gameSpinArray.pop();
		gameSpinArray.unshift(x);
		spin = gameSpinArray[0];
	} else if (currentMove == "gameTurnRight") {
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
	// codeLearningGame Proj : checks is player is going to touch spike, if they are, wont let them move (will be changed to lose life and restart)
	// touchingSpike = false;
	for (i = 0; i < spike.length; i++) {
		if (spike[i].x == gamePlayer.x && gamePlayer.y == spike[i].y) {
			return (touchingSpike = true);
		}
	}
}

function gameGoalCollision() {
	// codeLearningGame Proj : checks if player is on top of goal
	touchingGoal = false;
	if (gameGoal.x == gamePlayer.x && gamePlayer.y == gameGoal.y) {
		return (touchingGoal = true);
	}
}

function gameLostLife() {
	if (gameLives == 3) {
		document.getElementById("gameHeart3").style.opacity = 0;
		gameLives = 2;
	} else if (gameLives == 2) {
		document.getElementById("gameHeart2").style.opacity = 0;
		gameLives = 1;
	} else if (gameLives == 1) {
		document.getElementById("gameHeart1").style.opacity = 0;
		gameLives = 0;
	}
}

function gameWon() {
	if (gameLevel == 1) {
		document.getElementById("gameLevel").innerHTML = "level : 2";
		gameLevel = 2;
	} else if (gameLevel == 2) {
		document.getElementById("gameLevel").innerHTML = "level : 3";
		gameLevel = 3;
	}
}

function gameWonFade() {
	document.getElementById("gameWon").style.zIndex = 50;
	let i = 0;
	let wonOpacity = 0;
	let wonFadeIn = setInterval(() => {
		i++;
		wonOpacity += 0.05;
		document.getElementById("gameWon").style.opacity = wonOpacity;

		if (i == 20) {
			clearInterval(wonFadeIn);
		}
	}, 50);

	let k = 0;
	setTimeout(() => {
		let wonFadeOut = setInterval(() => {
			k++;
			wonOpacity -= 0.05;
			document.getElementById("gameWon").style.opacity = wonOpacity;

			if (k == 20) {
				clearInterval(wonFadeOut);
				document.getElementById("gameWon").style.zIndex = -50;
			}
		}, 50);
	}, 1600);
}

function gameDeathFade() {
	document.getElementById("lifeLost").style.zIndex = 50;
	let i = 0;
	let lifeOpacity = 0;
	let lifeLostFadeIn = setInterval(() => {
		i++;
		lifeOpacity += 0.05;
		document.getElementById("lifeLost").style.opacity = lifeOpacity;

		if (i == 20) {
			clearInterval(lifeLostFadeIn);
		}
	}, 50);

	let j = 0;
	let gamePlayerFade = setInterval(() => {
		j++;

		if (document.getElementById("gamePlayer").style.opacity == 1) {
			document.getElementById("gamePlayer").style.opacity = 0;
		} else {
			document.getElementById("gamePlayer").style.opacity = 1;
		}
		if (j == 7) {
			clearInterval(gamePlayerFade);
			document.getElementById("lifeLost").style.zIndex = -50;
		}
	}, 350);

	let k = 0;
	setTimeout(() => {
		let lifeLostFadeOut = setInterval(() => {
			k++;
			lifeOpacity -= 0.05;
			document.getElementById("lifeLost").style.opacity = lifeOpacity;

			if (k == 20) {
				clearInterval(lifeLostFadeOut);
			}
		}, 50);
	}, 1600);
}

function gameResetBoard() {
	spikeCollision = false;
	goalCollision = false;
	document.getElementById("gameStartButton").style.visibility = "visible";
	document.getElementById("gameStartButton").style.zIndex = 110;
	gameLives = 3;
	numOfSpikes = 100;
	for (i = 0; i < numOfSpikes; i++) {
		let spikeToRemove = document.getElementById("gameSpike" + i);
		if (spikeToRemove != undefined) {
			spikeToRemove.remove();
		}
	}
	document.getElementById("gamePlayer").style.visibility = "hidden";
	document.getElementById("gameGoal").style.visibility = "hidden";
}

class cellLocation {
	constructor(x, y, d) {
		//used in testIfPossible to track x, y, and distance from start
		this.x = x;
		this.y = y;
		this.d = d;
	}
}

function testIfPossible() {
	// codeLearningGame Proj : creates a map based on player, goal, and spike spawns, then moves through each available cell to check if the game is actually possible
	let X = 15;
	let Y = 15;
	let map = Array.from(Array(X), () => Array(Y).fill(" "));
	// map is an array the length of X, that is then filled with arrays, the length of Y, that are filled with empty spaces
	// if .fill wasn't used, the Y arrays inside the X array, would have "empty" spaces, which can be filled but its easier to do when initializing
	let marked = Array.from(Array(X), () => Array(Y).fill(" "));

	for (i = 0; i < map.length; i++) {
		// generates map the size of the gameArea, fills it with player, goal, and spike locations
		let found = spike.filter(({ x }) => x == i + 1);
		for (j = 0; j < found.length; j++) {
			let y = found[j].y - 1;
			let x = found[j].x - 1;
			if (gamePlayer.x - 1 == x) {
				map[x].splice(gamePlayer.y - 1, 1, "P");
			}
			if (gameGoal.x - 1 == x) {
				map[x].splice(gameGoal.y - 1, 1, "G");
			}
			map[x].splice(y, 1, "x");
		}
	}

	let start = new cellLocation(0, 0, 0);

	for (i = 0; i < X; i++) {
		//marks spikes as true in the marked map so the function doesn't try to run into them
		for (j = 0; j < Y; j++) {
			if (map[i][j] == "x") {
				marked[i][j] = true;
			} else {
				marked[i][j] = false;
			}
			if (map[i][j] == "P") {
				//sets start location using cellLocation
				start.x = i;
				start.y = j;
			}
		}
	}

	let queue = [];
	queue.push(start); //puts start location into the queue of spots to search
	marked[start.x][start.y] = true; // marks start so it doesn't return
	while (queue.length != 0) {
		//while there is something in queue, run code again
		let current = queue[0]; // set current to first thing in queue
		queue.shift(); // removes first thing in queue

		//end
		if (map[current.x][current.y] == "G") {
			// if current matches with goal in the "map" sets minDistance to the current.d (which is current distance from start)
			return true;
		}

		//up
		if (current.x - 1 >= 0 && marked[current.x - 1][current.y] == false) {
			// if above current isn't 0 and the location hasn't been marked, add it to queue then mark it
			queue.push(new cellLocation(current.x - 1, current.y, current.d + 1));
			marked[current.x - 1][current.y] = true;
		}
		//right
		if (current.y + 1 < 15 && marked[current.x][current.y + 1] == false) {
			// if to the right current isn't 0 and the location hasn't been marked, add it to queue then mark it
			queue.push(new cellLocation(current.x, current.y + 1, current.d + 1));
			marked[current.x][current.y + 1] = true;
		}
		//down
		if (current.x + 1 < 15 && marked[current.x + 1][current.y] == false) {
			// if below current isn't 0 and the location hasnt been marked, add it to queue then mark it
			queue.push(new cellLocation(current.x + 1, current.y, current.d + 1));
			marked[current.x + 1][current.y] = true;
		}
		//left
		if (current.y - 1 >= 0 && marked[current.x][current.y - 1] == false) {
			// if to the left current isnt 0 and the location hasnt been marked, add it to queue then mark it
			queue.push(new cellLocation(current.x, current.y - 1, current.d + 1));
			marked[current.x][current.y - 1] = true;
		}
	}
	return false;
}

function gameButtonsClear(clicked_id) {
	if (clicked_id == "gameClear" && gameInProgress == false) {
		if (gameButtonsPressed.length <= 33) {
			const pressedButtons = document.getElementById("pressedLeftPanel");
			while (pressedButtons.hasChildNodes()) {
				pressedButtons.removeChild(pressedButtons.firstChild);
				gameButtonsPressed.pop();
			}
		}
		if (34 <= gameButtonsPressed.length && gameButtonsPressed.length <= 66) {
			let pressedButtons = document.getElementById("pressedRightPanel");
			while (pressedButtons.hasChildNodes()) {
				pressedButtons.removeChild(pressedButtons.firstChild);
				gameButtonsPressed.pop();
			}
			pressedButtons = document.getElementById("pressedLeftPanel");
			while (pressedButtons.hasChildNodes()) {
				pressedButtons.removeChild(pressedButtons.firstChild);
				gameButtonsPressed.pop();
			}
		}
	} else if (
		clicked_id == "gameDelete" &&
		gameButtonsPressed.length >= 1 &&
		gameInProgress == false
	) {
		if (gameButtonsPressed.length <= 33) {
			const pressedButtons = document.getElementById("pressedLeftPanel");
			pressedButtons.removeChild(pressedButtons.lastChild);
			gameButtonsPressed.pop();
		}
		if (34 <= gameButtonsPressed.length && gameButtonsPressed.length <= 66) {
			const pressedButtons = document.getElementById("pressedRightPanel");
			pressedButtons.removeChild(pressedButtons.lastChild);
			gameButtonsPressed.pop();
		}
	}
}
