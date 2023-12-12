timerRunning = false;
timeList = []
timerInput = "timer"

class Timer {
	constructor() {
		this.startTime = 0;
		this.endTime = 0;
		this.finalTime = 0;
		this.timerDisplay = ""
	}
		
	
	startTimer() {
		this.startTime = Date.now();
		return this.startTime;
	}
	
	endTimer() {
		this.endTime = Date.now();
		console.log(this.endTime);
		
		return this.endTime;
	}
	
	calculateTime() {
		this.finalTime = (this.endTime - this.startTime)/1000;
		return this.finalTime
	}
	
		
	changeDisplay(time) {
		this.timerDisplay = document.getElementById("timer");
		this.timerDisplay.innerHTML = time;
	}
}

function startTimer() {
	if (timerRunning == false) {
		timerRunning = true;
		t1 = new Timer();
		startTime = t1.startTimer();
		
		
		
	} else {
		timerRunning = false;
		endTime = t1.endTimer();
		finalTime = t1.calculateTime();
		t1.changeDisplay(finalTime);
		timeList.push(finalTime);
		updateTimeList()
		
	}
}

function timerSwitch() {
	if (timerInput == "timer") {
		timerInput = "typing";
		
		timerDisplay = document.getElementById("timer");
		timerDisplay.innerHTML = ""
		
		buttonText = document.getElementById("SwitchButton")
		buttonText.innerHTML = "Enter times with timer"
		
		typingDisplay = document.getElementById("typingInput")
		typingDisplay.innerHTML = '<form id="timeInputForm"><label for="inputtedTime">Enter time:</label><br><input type="text" id="inputtedTime" name="inputtedTime"></form><div class="wrapper"><button onclick="enterTypingTime()">Submit</button></div>'
	} else {
		timerInput = "timer";
		
		timerDisplay = document.getElementById("timer");
		timerDisplay.innerHTML = "0.00"
		
		buttonText = document.getElementById("SwitchButton")
		buttonText.innerHTML = "Enter times with typing"
		
		typingDisplay = document.getElementById("typingInput")
		typingDisplay.innerHTML = ""
	}
}

function enterTypingTime() {
	x = document.getElementById("inputtedTime").value
	x = parseFloat(x)
	if (x != NaN) {
		timeList.push(x)
		console.log(timeList)
		document.getElementById("timeInputForm").reset()
		updateTimeList()
		
	}
}

function updateTimeList() {
	listOfTimes = document.getElementById("listOfTimes")
	for (let i = 0; i < timeList.length; i++) {
		if (i == 10) {
			break;
		}
		listOfTimes.innerHTML += "<li>" + timeList[i] + "</li>"
	}
}

document.onkeyup = function(e) {
	if (e.keyCode == 32) {
		if (document.activeElement.nodeName.toLowerCase() != "input") {
			startTimer();
		}
	}
}

