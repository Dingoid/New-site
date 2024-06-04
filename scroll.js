let cF,
	aT,
	jG,
	cA,
	colorFlipper,
	aimTrainer,
	jsGame,
	crudApp,
	projTop,
	prevScroll = 0,
	colorBall,
	aimBall,
	gameBall,
	crudBall;

function scrollBoundingClient() {
	cF = document.getElementById("colorFlipperH1");
	aT = document.getElementById("aimTrainerH1");
	jG = document.getElementById("javaScriptGameH1");
	cA = document.getElementById("crudAppH1");
	colorFlipper = cF.getBoundingClientRect();
	aimTrainer = aT.getBoundingClientRect();
	jsGame = jG.getBoundingClientRect();
	crudApp = cA.getBoundingClientRect();
}

window.addEventListener("scroll", scrollLocation);

function scrollLocation() {
	scrollBoundingClient();

	projTop = "N/A";
	projBottom = "N/A";

	if (colorFlipper.top < 0 && 0 < colorFlipper.bottom) {
		projTop = "cF";
	} else if (aimTrainer.top < 0 && 0 < aimTrainer.bottom) {
		projTop = "aT";
	} else if (jsGame.top < 0 && 0 < jsGame.bottom) {
		projTop = "jG";
	}

	if (
		aimTrainer.top < window.innerHeight &&
		window.innerHeight < aimTrainer.bottom
	) {
		projBottom = "aT";
	} else if (
		jsGame.top < window.innerHeight &&
		window.innerHeight < jsGame.bottom
	) {
		projBottom = "jG";
	} else if (
		crudApp.top < window.innerHeight &&
		window.innerHeight < crudApp.bottom
	) {
		projBottom = "cA";
	}
	scrollBallScale(projTop, projBottom);
}

function scrollBallScale(projTop, projBottom) {
	if (colorFlipper.top >= 0 && colorFlipper.bottom <= window.innerHeight) {
		document.getElementById("scrollBall1").style.scale = 1.5;
		document.getElementById("scrollBall2").style.scale = 1;
		document.getElementById("scrollBall3").style.scale = 1;
		document.getElementById("scrollBall4").style.scale = 1;
	} else if (aimTrainer.top >= 0 && aimTrainer.bottom <= window.innerHeight) {
		document.getElementById("scrollBall1").style.scale = 1;
		document.getElementById("scrollBall2").style.scale = 1.5;
		document.getElementById("scrollBall3").style.scale = 1;
		document.getElementById("scrollBall4").style.scale = 1;
	} else if (jsGame.top >= 0 && jsGame.bottom <= window.innerHeight) {
		document.getElementById("scrollBall1").style.scale = 1;
		document.getElementById("scrollBall2").style.scale = 1;
		document.getElementById("scrollBall3").style.scale = 1.5;
		document.getElementById("scrollBall4").style.scale = 1;
	} else if (
		crudApp.top >= 0 &&
		Math.round(crudApp.bottom) <= window.innerHeight
	) {
		document.getElementById("scrollBall1").style.scale = 1;
		document.getElementById("scrollBall2").style.scale = 1;
		document.getElementById("scrollBall3").style.scale = 1;
		document.getElementById("scrollBall4").style.scale = 1.5;
	}

	let scrollAmount = Math.round(
		Math.abs((colorFlipper.top - aimTrainer.top) / 100)
	);
	let scaleBy = 0.5 / scrollAmount;

	colorBall = Number(document.getElementById("scrollBall1").style.scale);
	aimBall = Number(document.getElementById("scrollBall2").style.scale);
	gameBall = Number(document.getElementById("scrollBall3").style.scale);
	crudBall = Number(document.getElementById("scrollBall4").style.scale);

	if (colorBall < 1 || aimBall < 1 || gameBall < 1 || crudBall < 1) {
		if (projTop == "cF" && projBottom == "aT") {
			colorBall = 1.5;
			aimBall = 1;
		}
		if (projTop == "aT" && projBottom == "jG") {
			aimBall = 1.5;
			gameBall = 1;
		}
		if (projTop == "jG" && projBottom == "cA") {
			gameBall = 1.5;
			crudBall = 1;
		}
		if (colorFlipper.top >= 0) {
			colorBall = 1.5;
		}
	}

	if (projTop == "cF" && projBottom == "aT" && prevScroll < window.scrollY) {
		document.getElementById("scrollBall1").style.scale = colorBall - scaleBy;
		document.getElementById("scrollBall2").style.scale = aimBall + scaleBy;
	} else if (
		projTop == "cF" &&
		projBottom == "aT" &&
		prevScroll > window.scrollY
	) {
		document.getElementById("scrollBall1").style.scale = colorBall + scaleBy;
		document.getElementById("scrollBall2").style.scale = aimBall - scaleBy;
	}
	if (projTop == "aT" && projBottom == "jG" && prevScroll < window.scrollY) {
		document.getElementById("scrollBall2").style.scale = aimBall - scaleBy;
		document.getElementById("scrollBall3").style.scale = gameBall + scaleBy;
	} else if (
		projTop == "aT" &&
		projBottom == "jG" &&
		prevScroll > window.scrollY
	) {
		document.getElementById("scrollBall2").style.scale = aimBall + scaleBy;
		document.getElementById("scrollBall3").style.scale = gameBall - scaleBy;
	}
	if (projTop == "jG" && projBottom == "cA" && prevScroll < window.scrollY) {
		document.getElementById("scrollBall3").style.scale = gameBall - scaleBy;
		document.getElementById("scrollBall4").style.scale = crudBall + scaleBy;
	} else if (
		projTop == "jG" &&
		projBottom == "cA" &&
		prevScroll > window.scrollY
	) {
		document.getElementById("scrollBall3").style.scale = gameBall + scaleBy;
		document.getElementById("scrollBall4").style.scale = crudBall - scaleBy;
	}
	prevScroll = window.scrollY;
}

function scrollToPage(clicked_id) {
	if (clicked_id == "scrollBall1") {
		cF.scrollIntoView();
	}
	if (clicked_id == "scrollBall2") {
		aT.scrollIntoView();
	}
	if (clicked_id == "scrollBall3") {
		jG.scrollIntoView();
	}
	if (clicked_id == "scrollBall4") {
		cA.scrollIntoView();
	}
	scrollBallScale();
	prevScroll = window.scrollY;
}
