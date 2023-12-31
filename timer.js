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

class Scramble {
	constructor() {
		this.currentScramble = ""
		this.previousScramble = ""
		
		this.moveSet = ["R","U","F","D","L","B"]
		this.moveType = ["", "'", "2"]
		this.randomMove = ""
		this.scrambleLength = 16
		this.previousMove = ""
	}
	
	getCurrentScramble() {
		return this.currentScramble
	}
	
	getPreviousScramble() {
		return this.previousScramble
	}
	
	generateScrambleLength() {
		this.scrambleLength = 16 + Math.floor(Math.random() * 8)
		return this.scrambleLength
	}
		
	generateRandomMove() {
		this.randomMove = this.moveSet[Math.floor(Math.random()*this.moveSet.length)] + this.moveType[Math.floor(Math.random()*this.moveType.length)]
		return this.randomMove
	}
		
	generateScramble() {
		this.previousScramble = this.currentScramble
		this.currentScramble = ""
		this.previousMove = ""
		this.randomMove = ""
		this.scrambleLength = this.generateScrambleLength()
		for (let i = 0; i < this.scrambleLength; i++) {
			while (this.randomMove[0] == this.previousMove[0]) {
				this.randomMove = this.generateRandomMove()
				
			}
			this.currentScramble += this.randomMove + " "
			this.previousMove = this.randomMove
		}
		
		return this.currentScramble
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
	listOfTimes.innerHTML = ""
	for (let i = timeList.length - 1; i > -1; i--) {
		if (i == timeList.length - 20) {
			break;
		}
		listOfTimes.innerHTML += "<li>" + timeList[i] + "</li>"
	}
	averageTypes = [5,12,50,100]
	averageList = document.getElementById("averages")
	averageList.innerHTML = ""
	
	totalMean = 0
	for (let i = 0; i < timeList.length; i++) {
		totalMean += timeList[i]
	}
	totalMean = totalMean / timeList.length
	averageList.innerHTML += "mean: = " + Math.round(totalMean*1000)/1000 + "\t"
	
	for (let i = 0; i < averageTypes.length; i++) {
		
		totalOfTimes = 0
		if (timeList.length >= averageTypes[i]) {
			for (let j = timeList.length - 1; j > timeList.length - (averageTypes[i] + 1); j--) {
				totalOfTimes += timeList[j]
			}
			average = totalOfTimes/averageTypes[i]
			
			averageList.innerHTML += "ao" + averageTypes[i] + " = " + Math.round(average*1000)/1000 + "\t"
		}
	}
	
}

function generateNewScramble() {
	scramble1 = new Scramble()
	scramble1.generateScramble()
	console.log(scramble1.getCurrentScramble())
	scrambleDisplay = document.getElementById("scramble")
	scrambleDisplay.innerHTML = scramble1.getCurrentScramble()
}

document.onkeyup = function(e) {
	if (e.keyCode == 32) {
		if (document.activeElement.nodeName.toLowerCase() != "input") {
			startTimer();
		}
	}
}

