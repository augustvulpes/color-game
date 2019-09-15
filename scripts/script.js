let quizColor = document.querySelector('.quizColor');
let result = document.querySelector('#result');
let menuBar = document.querySelector('.menu-bar');

//buttons
let resetButton = document.querySelector('#resetButton');
let easyButton = document.querySelector('#easyButton');
let hardButton = document.querySelector('#hardButton');

// for third line of circles
let line = document.querySelector('.circleLine');
let section = document.querySelector('.lines');
let thirdLine = line.cloneNode(true);

// function for random integer
function randomInt(min, max) {
	return min + Math.floor(Math.random() * (max + 1 - min));
}

//creating array that contains all circles
let circles = document.querySelectorAll('.circle');
//this variable will be used in startGame()
let color;

//Event on every circle
function circle(){
	if (this.style.backgroundColor == color) {
		result.classList.remove('wrong');
		result.classList.add('right');
		result.textContent = 'Right!';
	}
	else {
		result.classList.remove('right');
		result.classList.add('wrong');
		result.textContent = 'Wrong, try again!';
	}

	menuBar.style.backgroundColor = color;
	startGame();
}

for(let i = 0; i < circles.length; i++) {
	circles[i].addEventListener('click', circle);
}

//This function starts new round
function startGame() {
	//Color generation
	R = randomInt(0, 255);
	G = randomInt(0, 255);
	B = randomInt(0, 255);

	color = `rgb(${R}, ${G}, ${B})`;

	quizColor.textContent = color;

	//random circle will be colored in right color
	let rightAnswerIndex = randomInt(0, circles.length - 1);

	for(let i = 0; i < circles.length; i++) {
		if (i == rightAnswerIndex) {
			circles[i].style.background = color;
		}
		else {
			//other circles will be in random color
			circles[i].style.backgroundColor = `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
		};
	};
};

function hardGame() {
	section.appendChild(thirdLine);
	hardButton.classList.add('selected');
	easyButton.classList.remove('selected');
	//After we add a new line of circles, we need to update our array of it
	circles = document.querySelectorAll('.circle');
	//Adding events on new circles
	for(let i = 6; i < circles.length; i++) {
		circles[i].addEventListener('click', circle);
	};
	startGame();
};

function easyGame() {
	section.removeChild(thirdLine);
	hardButton.classList.remove('selected');
	easyButton.classList.add('selected');
	startGame();
};

hardButton.addEventListener('click', hardGame);
easyButton.addEventListener('click', easyGame);
resetButton.addEventListener('click', function(){
	menuBar.style.backgroundColor = color;
	startGame();
})

startGame();

//Please give me your feedback about my code, I am just learning now)