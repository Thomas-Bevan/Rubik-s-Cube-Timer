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
		this.interval = setInterval(() => {
            const elapsedTime = (Date.now() - this.startTime) / 1000;
            this.changeDisplay(elapsedTime.toFixed(3));
        }, 10);
		return this.startTime;
	}
	
	endTimer() {
		this.endTime = Date.now();
		clearInterval(this.interval);
		
		return this.endTime;
	}
	
	calculateTime() {
		this.finalTime = (this.endTime - this.startTime)/1000;
		this.changeDisplay(this.finalTime.toFixed(3));
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
		timeList.push([finalTime, finalTime]);
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
    listOfTimes = document.getElementById("listOfTimes");
    listOfTimes.innerHTML = ""; 

    for (let i = timeList.length - 1; i >= 0; i--) {
        solve = document.createElement("li")
		
        solveTime = document.createElement("span")
        solveTime.innerText = timeList[i][0] + " "
		
		if (timeList[i][0] == Infinity) {
			solveTime.innerText = "DNF "
		}
		
        deleteButton = document.createElement("button")
        deleteButton.innerText = "X"
        deleteButton.onclick = function() {deleteSolve(i)}
		
		penaltyButton = document.createElement("button")
		penaltyButton.innerText = "+2"
		penaltyButton.onclick = function() {penaltySolve(i)}
		
		DNFButton = document.createElement("button")
		DNFButton.innerText = "DNF"
		DNFButton.onclick = function() {DNFSolve(i)}
		
		OKButton = document.createElement("button")
		OKButton.innerText = "OK"
		OKButton.onclick = function() {OKSolve(i)}

        solve.appendChild(solveTime)
        solve.appendChild(deleteButton)
		solve.appendChild(penaltyButton)
		solve.appendChild(DNFButton)
		solve.appendChild(OKButton)

        listOfTimes.appendChild(solve)
    }
	
	averageTypes = [5,12,50,100]
	averageList = document.getElementById("averages")
	averageList.innerHTML = ""
	
	totalMean = 0
	for (let i = 0; i < timeList.length; i++) {
		if (timeList[i][0] != Infinity) {
		totalMean += timeList[i][0]
		}
	}
	totalMean = totalMean / timeList.length
	averageList.innerHTML += "mean: = " + Math.round(totalMean*1000)/1000 + "\t"
	
	for (let i = 0; i < averageTypes.length; i++) {
		
		totalOfTimes = 0
		if (timeList.length >= averageTypes[i]) {
			for (let j = timeList.length - 1; j > timeList.length - (averageTypes[i] + 1); j--) {
				totalOfTimes += timeList[j][0]
			}
			
			average = Math.round((totalOfTimes/averageTypes[i])*1000)/1000
			if (average == Infinity) {
				average = "DNF"
			}
			
			averageList.innerHTML += "ao" + averageTypes[i] + " = " + average + "\t"
		}
	}
}

function deleteSolve(index) {
    timeList.splice(index, 1)
    updateTimeList()
}

function penaltySolve(index) {
	newValue = Math.round((timeList[index][1] + 2)*1000)/1000
	timeList[index].splice(0, 1, newValue)
	updateTimeList()
}

function DNFSolve(index) {
	timeList[index].splice(0, 1, Infinity)
	updateTimeList()
}

function OKSolve(index) {
	timeList[index].splice(0, 1, timeList[index][1])
	updateTimeList()
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

