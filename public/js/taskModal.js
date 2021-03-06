// this needs to be changed in new environments
const usableURL = 'http://localhost:8080';

// Create outer div
const outerDiv = document.createElement('div');
outerDiv.setAttribute('id', 'taskModal');
outerDiv.style.cssText = 'width: 500px; height: auto; border: 1px solid #ccc; box-sizing: border-box; border-radius: 10px; position: fixed; bottom: 40px; transition: .3s linear; z-index: 99; background: #fff; box-shadow: 1px 1px 2px #ccc';

// Create header
const usableLogoDiv = document.createElement('div');
const usableLogo = document.createElement('img');
usableLogo.setAttribute('src', 'https://agitated-fermi-28bdc8.netlify.com/img/usable_logo.f82721b1.svg');
usableLogo.setAttribute('alt', 'Usable Logo');
usableLogoDiv.appendChild(usableLogo);
usableLogoDiv.style.cssText = 'display: flex; justify-content: center; width: 100%;  border-radius: 10px 10px 0 0; background: #000; padding: 10px 0; border: 1px solid #ccc;';

outerDiv.appendChild(usableLogoDiv);

// Create Min-Max Div
const minMax = document.createElement('div');
minMax.style.cssText = 'position: relative; float: right; width: 40px; height: 40px; right: -50px';

// Create Min-Max Button
const minMaxButton = document.createElement('div');
minMaxButton.setAttribute('id', 'minMaxButton');
minMaxButton.style.cssText = 'background: cyan; height: 100%; width: 100%; border-radius: 50px; display: flex; justify-content: center; align-items: center;';

minMax.appendChild(minMaxButton);

// Create Min-Max Span
const minMaxSpan = document.createElement('span');
minMaxSpan.textContent = '-'
minMaxSpan.style.cssText = 'color: #fff; font-size: 2rem; display: inline-block;'

minMaxButton.appendChild(minMaxSpan);


outerDiv.appendChild(minMax);

// Create H1
const heading1 = document.createElement('h1');
heading1.style.cssText = 'font-family: sans-serif; font-size: 21px; text-transform: uppercase; font-weight: 600; color: #333; margin-bottom: 15px; text-decoration: underline; padding-top: 16px; text-align: center; position: relative; right: -20px';
outerDiv.appendChild(heading1);

// Create Task Paragraph
const taskParagraph = document.createElement('p');
taskParagraph.setAttribute('id', 'taskItem');
taskParagraph.style.cssText = 'line-height: 21px; padding: 15px; font-family: sans-serif;'
outerDiv.appendChild(taskParagraph);

// Input Box
const feedback = document.createElement('textarea');
feedback.style.cssText = 'padding: 15px; width: 75%; display: block; margin: 25px auto; border-radius: 3px;'
feedback.setAttribute('placeholder', 'Give us some feedback about this task!');
feedback.id = "usableUserResponseTextArea"
outerDiv.appendChild(feedback);

// Create Bottom Section
const bottomSection = document.createElement('div');
bottomSection.style.cssText = 'display: flex; border-top: 1px solid #aaa';

// Create Back Button
const backButton = document.createElement('div');
backButton.textContent = 'BACK';
backButton.style.cssText = 'flex-grow: 1; padding: 10px; text-decoration: none; font-family: sans-serif; text-align: center; background: #aaa; color: #fff; border-radius: 0 0 0 10px;';

bottomSection.appendChild(backButton);

// Create Task Div
const taskDiv = document.createElement('div');
taskDiv.style.cssText = 'flex-grow: 1; padding: 10px; text-decoration: none; font-family: sans-serif; text-align: center;';

bottomSection.appendChild(taskDiv);

// Create Next Button
const nextButton = document.createElement('div');
nextButton.textContent = 'NEXT';
nextButton.style.cssText = 'flex-grow: 1; padding: 10px; text-decoration: none; font-family: sans-serif; text-align: center; background: cyan; color: #fff; border-radius: 0 0 10px 0;';

bottomSection.appendChild(nextButton);

outerDiv.appendChild(bottomSection);

// Append Entire Modal to Body
document.querySelector('body').appendChild(outerDiv);

/* =======================================*/


function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return false;
}


// Array of Tasks
let taskList;
if (getCookie('userTestingArray')) {
	let string = getCookie('userTestingArray');
	taskList = JSON.parse(string);
} else {
	taskList = document.getElementById('ourTestArray').innerHTML.split(',');
	const stringTaskList = JSON.stringify(taskList);
	document.cookie = `userTestingArray=${stringTaskList}; path=/`;
}


let feedbackArray = [];

if (getCookie('feedbackArray')) {
	let string = getCookie('feedbackArray');
	feedbackArray = JSON.parse(string);
} else {
	feedbackArray = [];
}
window.addEventListener('unload', () => {
	const userArray = JSON.stringify(feedbackArray);
	document.cookie = `feedbackArray=${userArray}; path=/`;
});

let taskCounter = 0;
let headingTaskCounter = 1;


// Minimize and Maximize Modal
const minMaxButtonEvent = document.getElementById('minMaxButton');
minMaxButtonEvent.addEventListener('click', () => {
	if (minMaxSpan.textContent === '-') {
		outerDiv.style.cssText = 'width: 500px; height: auto; border: 1px solid #ccc; box-sizing: border-box; border-radius: 10px; position: fixed; bottom: 40px; transition: .3s linear; z-index: 99; left: -502px; background: #fff;';
		minMaxSpan.textContent = '+';
	} else {
		outerDiv.style.cssText = 'width: 500px; height: auto; border: 1px solid #ccc; box-sizing: border-box; border-radius: 10px; position: fixed; bottom: 40px; transition: .3s linear; z-index: 99; left: 0; background: #fff;';
		minMaxSpan.textContent = '-';
	}
});

minMaxButtonEvent.onmouseover = () => {
	minMaxButtonEvent.style.cssText = 'background: cyan; height: 100%; width: 100%; border-radius: 50px; display: flex; justify-content: center; align-items: center; transform: scale(1.1); transition: .2s; cursor: pointer;';
};

minMaxButtonEvent.onmouseleave = () => {
	minMaxButtonEvent.style.cssText = 'background: cyan; height: 100%; width: 100%; border-radius: 50px; display: flex; justify-content: center; align-items: center; transform: scale(1); transition: .2s;';
};

// Next Button
nextButton.addEventListener('mouseover', (e) => {
	e.target.style.cssText = 'flex-grow: 1; padding: 10px; text-decoration: none; font-family: sans-serif; text-align: center; background: cyan; color: #fff; border-radius: 0 0 10px 0; cursor: pointer;';
});

nextButton.addEventListener('click', () => {
	let feedbackGet = document.getElementById('usableUserResponseTextArea');
	feedbackArray.splice(taskCounter, 1, feedbackGet.value);
	feedbackArray[taskCounter] = feedbackGet.value;
	taskCounter++
	headingTaskCounter++;

	taskParagraph.textContent = taskList[taskCounter];
	heading1.textContent = 'Task ' + headingTaskCounter;
	taskDiv.textContent = 'Task ' + headingTaskCounter + ' of ' + taskList.length;

	if (feedbackArray[taskCounter] == undefined || feedbackArray[taskCounter] == '') {
		feedbackGet.value = '';
		feedbackGet.textContent = '';
		console.log('undef or empty');
	} else {
		console.log('NOT undef or empty');
		feedbackGet.value = feedbackArray[taskCounter];
		feedbackGet.textContent = feedbackArray[taskCounter];
	}

	if (taskCounter === taskList.length - 1) {
		nextButton.textContent = 'FINISH';
	}

	if (taskCounter === taskList.length) {
		let ourID = getCookie('usableCookieTracking');
		window.location.href = `${usableURL}/site/com?id=${ourID}`;
	}
	console.log(feedbackArray)
});

// Back Button
backButton.addEventListener('mouseover', (e) => {
	e.target.style.cssText = 'flex-grow: 1; padding: 10px; text-decoration: none; font-family: sans-serif; text-align: center; background: #aaa; color: #fff; border-radius: 0 0 0 10px; cursor: pointer;';
});

backButton.addEventListener('click', () => {
	let feedbackGet = document.getElementById('usableUserResponseTextArea');
	feedbackArray[taskCounter] = feedbackGet.value
	feedbackGet.value = feedbackArray[taskCounter - 1];
	feedbackGet.textContent = feedbackArray[taskCounter - 1];
	if (taskCounter >= 1) {
		taskCounter--;
		taskParagraph.textContent = taskList[taskCounter];
		headingTaskCounter--;
		heading1.textContent = 'Task ' + headingTaskCounter;
		taskDiv.textContent = 'Task ' + headingTaskCounter + ' of ' + taskList.length;

	}
	if (taskCounter < taskList.length - 1) {
		nextButton.textContent = 'NEXT';
	}
	console.log(feedbackArray)
});

// Initiate Test
function startTest() {
	document.getElementById('taskItem').textContent = taskList[0];
	heading1.textContent = 'Task ' + headingTaskCounter;
	taskDiv.textContent = 'Task ' + headingTaskCounter + ' of ' + taskList.length;
};
startTest();