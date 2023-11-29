timerRunning = false;

class Timer {
	constructor() {
		this.startTime = 0;
		this.endTime = 0;
		this.finalTime = 0;
		this.timerDisplay = ""
	}
		
	
	startTimer() {
		this.startTime = Date.now();
		console.log(this.startTime);
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
		
		while (timerRunning == true) {
			endTime = t1.endTimer();
			finalTime = t1.calculateTime();
		t1.changeDisplay(finalTime); }
		
		
	} else {
		timerRunning = false;
		endTime = t1.endTimer();
		finalTime = t1.calculateTime();
		t1.changeDisplay(finalTime);
		
	}
}