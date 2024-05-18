const colorNames = ["Blue", "Red", "Yellow", "Green", "Pink", "Purple"],
	colorHexes = [
		"#0000FF",
		"#FF0000",
		"#FFFF00",
		"#008000",
		"#FFC0CB",
		"#800080",
	];

let currentIndex;

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
