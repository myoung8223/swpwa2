// stopwatch.js

let startTime;         // start time of the stopwatch in milliseconds (getting milliseconds value from performance.now())
let elapsedTime = 0;   // initialize elapsed time to 0 (in milliseconds)
let running = 0;        // running flag, 0: stopwatch not running, 1: stopwatch running
let audioEnabled = 0;   // 0: audio not enabled, 1: audio enabled
let lapNum = 0;         // lap number

// keyboard flags
var spacePressed = 0;   // initialize spacePressed flag to 0, as [Space] not pressed
var spaceReady = 1;        // initialize spaceReady flag to 1, as [Space] is ready to be pressed
var leftCtrlPressed = 0;   // initialize leftCtrlPressed flag to 0, as [Left Ctrl] not pressed
var leftCtrlReady = 1;     // initialize leftCtrlReady flag to 1, as [Left Ctrl] is ready to be pressed
var enterPressed = 0;   // initialize enterPressed flag to 0, as [Enter] not pressed
var enterReady = 1;     // initialize enterReady flag to 1, as [Enter] is ready to be pressed

const display = document.getElementById('display');             // get display element
const startStopButton = document.getElementById('startStop');   // get start/stop button element
const lapButton = document.getElementById('lap');               // get lap button element
const resetButton = document.getElementById('reset');    // get reset button element
const lapsContainer = document.getElementById('laps');   // get laps container element
const audioButton = document.getElementById('audio');    // get start/stop button element

var beep1 = new Audio('beep1.wav');   // initialize beep1
var beep2 = new Audio('beep2.wav');   // initialize beep2
var beep3 = new Audio('beep3.wav');   // initialize beep3
var beep4 = new Audio('beep4.wav');   // initialize beep4
		
window.onload = function() {         // when the window loads
    setInterval(updateDisplay, 1);   // set updateDisplay to start and run every millisecond
};

// event listener for start/stop/resume button click
startStopButton.addEventListener('click', () => {   // if start/stop/resume button clicked on
	if (running == 1) {                             // if stopwatch is running
		if (audioEnabled == 1) {   // if audio is enabled
			beep1.play();          // play beep 1
		}
		running = 0;                               // set running flag to 0, as stopwatch was just set to stop
        startStopButton.textContent = 'Resume';    // change button text to "Resume", as it was running before
    }
	else {                         // else stopwatch not running
		if (audioEnabled == 1) {   // if audio is enabled
			beep2.play();          // play beep 2
		}
        startTime = performance.now() - elapsedTime;   // set startTime to current time (in milliseconds) minus elapsedTime (last time when stopwatch was stopped, if at all)
		startStopButton.textContent = 'Stop';          // change button text to "Stop", as the stopwatch will be running
		running = 1;                            // set running flag to 1, as stopwatch was just set to run
    }
});
document.getElementById('startStop').addEventListener('keydown', function(event) {   // prevent start/stop/resume button from being engaged by [Space] or [Enter], as that leads to problems
    if (event.code === 'Space' || event.code === 'Enter') {                          // if [Space] or [Enter] pressed to engage the start/stop/resume button
        event.preventDefault();                               // prevent that default action
    }
});

// event listener for audio button click
audioButton.addEventListener('click', () => {   // if audio button clicked on
	if (audioEnabled == 0) {                    // if audio not enabled
		audioEnabled = 1;                 // enable audio
        audioButton.textContent = '🔊';   // change audio button to a 🔊 Unicode symbol
    }
	else {                  // else audio enabled
		audioEnabled = 0;                  // disable audio
        audioButton.textContent = '🔈';   // change audio button to a 🔈 Unicode symbol
    }
});
document.getElementById('audio').addEventListener('keydown', function(event) {   // prevent audio mute/unmute button from being engaged by [Space] or [Enter], as that leads to problems
    if (event.code === 'Space' || event.code === 'Enter') {                      // if [Space] or [Enter] pressed to engage the start/stop/resume button
        event.preventDefault();                               // prevent that default action
    }
});

// event listener for key presses
window.addEventListener('keydown', () => {   // if a key was pressed
    if (event.code === 'Space') {            // if [Space] pressed
        spacePressed = 1;           // set [Space] pressed flag to 1
    }
    if (event.code === 'ControlLeft') {   // if [Left Ctrl] pressed
        leftCtrlPressed = 1;              // set [Left Ctrl] pressed flag to 1
    }
    if (event.code === 'Enter') {   // if [Enter] pressed
        enterPressed = 1;           // set [Enter] pressed flag to 1
    }
});

// event listener for key releases
window.addEventListener('keyup', () => {   // if a key was released
    if (event.code === 'Space') {          // if [Space] released
        spacePressed = 0;           // set [Space] pressed flag to 0
		spaceReady = 1;     // set [Space] ready to be pressed flag to 1
    }
    if (event.code === 'ControlLeft') {   // if [Left Ctrl] released
        leftCtrlPressed = 0;              // set [Left Ctrl] pressed flag to 0
		leftCtrlReady = 1;     // set [Left Ctrl] ready to be pressed flag to 1
    }
    if (event.code === 'Enter') {   // if [Enter] released
        enterPressed = 0;           // set [Enter] pressed flag to 0
		enterReady = 1;     // set [Enter] ready to be pressed flag to 1
    }
});

// event listener for lap button click
lapButton.addEventListener('click', () => {   // if lap button clicked
	if (audioEnabled == 1) {                  // if audio enabled
		beep3.play();          // then play beep 3
	}
	const lapTime = formatTime(elapsedTime);   // get the formatted lap time in lapTime
	lapNum++;                                           // increment lap count
	var outerElement = document.createElement('div');   // create outer div to encapsulate lap number and lap time
	outerElement.className = 'box1';                     // set outer element box1 in style
	var innerElement1 = document.createElement('div');   // create inner div element 1 to encapsulate lap number
	var innerElement2 = document.createElement('div');   // create inner div element 2 to encapsulate lap time
	innerElement1.className = 'lapnum1';                 // set inner div element 1 to lapnum1 in style
	let combinedText = "Lap " + lapNum;                                 // combine text of "Lap " and lap number
	innerElement1.appendChild(document.createTextNode(combinedText));   // append text node to inner div element 1
	innerElement2.className = 'lapnum2';                                // set inner div element 2 to lapnum2 in style
	innerElement2.appendChild(document.createTextNode(lapTime));   // append text node with lap time to inner div element 2
	outerElement.appendChild(innerElement1);                       // append inner div element 1 to outer div
	outerElement.appendChild(innerElement2);   // append inner div element 2 to outer div
	laps.appendChild(outerElement);            // append outer div to laps
});
document.getElementById('lap').addEventListener('keydown', function(event) {   // prevent lap button from being engaged by [Space] or [Enter] as that leads to issues
    if (event.code === 'Space' || event.code === 'Enter') {                    // if [Space] or [Enter] pressed to engage the lap button
        event.preventDefault();                               // prevent that default action
    }
});

// event listener for reset button click
resetButton.addEventListener('click', () => {   // if reset button clicked
	if (audioEnabled == 1) {                    // if audio enabled
		beep4.play();          // play beep 4
	}
    elapsedTime = 0;                     // reset elapsed time to 0
    display.textContent = '00:00.000';       // set stopwatch display text to "00:00.000"
    startStopButton.textContent = 'Start';   // set start/stop/resume button to say "Start"
    lapsContainer.innerHTML = '';            // clear laps divs
	running = 0;                    // set running flag to 0, as stopwatch was just reset
	lapNum = 0;    // reset lap count to 0
});
document.getElementById('reset').addEventListener('keydown', function(event) {   // prevent reset button from being engaged by [Space] or [Enter] as that leads to issues
    if (event.code === 'Space' || event.code === 'Enter') {                      // if [Space] or [Enter] pressed to engage the reset button
        event.preventDefault();                               // prevent that default action
    }
});

function updateDisplay() {   // updateDisplay function

	if (running == 1) {                                // if stopwatch is running
		elapsedTime = performance.now() - startTime;     // set elapsed time to current time minus startTime
		display.textContent = formatTime(elapsedTime);   // update display text with formatted time counted so far
	}
	
	if ((spacePressed == 1) && (spaceReady == 1)) {   // if [Space] pressed and ready to be pressed
		spaceReady = 0;                               // set [Space] no longer ready to be pressed (until released)
		if (running == 1) {            // if stopwatch is running
			if (audioEnabled == 1) {   // if audio is enabled
				beep1.play();          // play beep 1
			}
			running = 0;                              // set running flag to 0, as stopwatch was just set to stop
			startStopButton.textContent = 'Resume';   // change button text to "Resume"
		}
		else {                         // else stopwatch not running
			if (audioEnabled == 1) {   // if audio enabled
				beep2.play();          // play beep 2
			}
			startTime = performance.now() - elapsedTime;   // set startTime to current time (in milliseconds) minus elapsedTime (last time when stopwatch was stopped)
			startStopButton.textContent = 'Stop';          // change button text to "Stop"
			running = 1;                            // set running flag to 1, as stopwatch was just set to run
		}		
	}

	if ((leftCtrlPressed == 1) && (leftCtrlReady == 1)) {   // if [Left Ctrl] pressed and ready to be pressed
		if (audioEnabled == 1) {                            // if audio enabled
			beep3.play();          // play beep 3
		}
		leftCtrlReady = 0;                         // set [Left Ctrl] no longer ready to be pressed (until released)
		const lapTime = formatTime(elapsedTime);   // get the formatted lap time in lapTime
		lapNum++;                                           // increment lap count
		var outerElement = document.createElement('div');   // create outer div to encapsulate lap number and lap time
		outerElement.className = 'box1';                     // set outer element box1 in style
		var innerElement1 = document.createElement('div');   // create inner div element 1 to encapsulate lap number
		var innerElement2 = document.createElement('div');   // create inner div element 2 to encapsulate lap time
		innerElement1.className = 'lapnum1';                 // set inner div element 1 to lapnum1 in style
		let combinedText = "Lap " + lapNum;                                 // combine text of "Lap " and lap number
		innerElement1.appendChild(document.createTextNode(combinedText));   // append text node to inner div element 1
		innerElement2.className = 'lapnum2';                                // set inner div element 2 to lapnum2 in style
		innerElement2.appendChild(document.createTextNode(lapTime));   // append text node with lap time to inner div element 2
		outerElement.appendChild(innerElement1);                       // append inner div element 1 to outer div
		outerElement.appendChild(innerElement2);   // append inner div element 2 to outer div
		laps.appendChild(outerElement);            // append outer div to laps
	}

	if ((enterPressed == 1) && (enterReady == 1)) {   // if [Enter] pressed and ready to be pressed
		if (audioEnabled == 1) {                      // if audio enabled
			beep4.play();          // play beep 4
		}
		enterReady = 0;    // set [Enter] no longer ready to be pressed (until released)
		elapsedTime = 0;                     // reset elapsed time to 0
		display.textContent = '00:00.000';       // set stopwatch display text to "00:00.000"
		startStopButton.textContent = 'Start';   // set start/stop/resume button to say "Start"
		lapsContainer.innerHTML = '';            // clear laps divs
		running = 0;                    // set running flag to 0, as stopwatch was just reset
		lapNum = 0;    // reset lap count to 0
	}

}

// given milliseconds, return a string of that millisecond count formatted as "00:00.000"
function formatTime(timeInMilliseconds) {
    const minutes = Math.floor(timeInMilliseconds / 60000);
    const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
    const msecs = Math.floor(timeInMilliseconds % 1000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(msecs).padStart(3, '0')}`;
}