let cF, aT, jG, cA, colorFlipper, aimTrainer, jsGame, crudApp;

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

window.addEventListener("scroll", scrollEvent);

function scrollEvent() {
	scrollBoundingClient();
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
}
