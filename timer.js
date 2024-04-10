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
		
		timerDisplay = document.getElementById("timer")
		timerDisplay.innerHTML = ""
		
		buttonText = document.getElementById("SwitchButton")
		buttonText.innerHTML = "Enter times with timer"
		
		typingDisplay = document.getElementById("typingInput")
		typingDisplay.innerHTML = '<form id="timeInputForm"><label for="inputtedTime">Enter time:</label><br><input type="text" id="inputtedTime" name="inputtedTime"></form><div class="wrapper"><button onclick="enterTypingTime()">Submit</button></div>'
	} else {
		timerInput = "timer";
		
		timerDisplay = document.getElementById("timer")
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
	console.log("----------------")
	console.log(timeList)
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
	drawScramble(scramble1.getCurrentScramble())
	scrambleDisplay = document.getElementById("scramble")
	scrambleDisplay.innerHTML = scramble1.getCurrentScramble()

}

function exportSolves() {
	jsonData = JSON.stringify(timeList, null, 2)
	download("solves.json", jsonData)
}

function importSolves() {
    fileInput = document.getElementById('fileInput')
    files = fileInput.files


    if (files.length <= 0) {
        alert("Please select a file to import.")
        return;
    }

    file = files[0]
    reader = new FileReader()

    reader.onload = function(e) {
        contents = e.target.result

        try {
            importedSolves = JSON.parse(contents)
            if (Array.isArray(importedSolves)) {
                timeList = importedSolves.map(item => Array.isArray(item) ? item : [item, item])
				
				for (let i = 0; i < timeList.length; i++) {
					if (timeList[i][0] == null) {
						timeList[i][0] = Infinity
					}
				}
				
                updateTimeList()
                alert("Solves imported successfully.")
            } else {
                alert("The file does not contain solves in the expected format.")
            }
        } catch (error) {
            alert("There was an error processing your file.")
            console.error("Error parsing JSON:", error)
        }
    }

    reader.onerror = function(e) {
        alert("Failed to read the file.")
        console.error("Error reading file:", e.target.error)
    }


    reader.readAsText(file)

    fileInput.value = ''
}




function download(filename, text) {
  element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', filename)


  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}


function drawScramble(scramble) {
	rubiks_cube = get_solved_cube()
	repeat_move_count = 1
	
	for (let i = 0; i < scramble.length; i++) {
		
		if (scramble[i] == " ") {
			continue
		}
		
		if (scramble[i+1] == "2") {
			repeat_move_count = 2
			skip = true
		}
		if (scramble[i+1] == "'") {
			repeat_move_count = 3
			skip = true
		}
		
		if (scramble[i] == "R") {
			for (let j = 0; j < repeat_move_count; j++) {
				rubiks_cube = R_move(rubiks_cube)
			}
		}
		if (scramble[i] == "L") {
			for (let j = 0; j < repeat_move_count; j++) {
				rubiks_cube = L_move(rubiks_cube)
			}
		}
		if (scramble[i] == "U") {
			for (let j = 0; j < repeat_move_count; j++) {
				rubiks_cube = U_move(rubiks_cube)
			}
		}
		if (scramble[i] == "D") {
			for (let j = 0; j < repeat_move_count; j++) {
				rubiks_cube = D_move(rubiks_cube)
			}
		}
		if (scramble[i] == "F") {
			for (let j = 0; j < repeat_move_count; j++) {
				rubiks_cube = F_move(rubiks_cube)
			}
		}
		if (scramble[i] == "B") {
			for (let j = 0; j < repeat_move_count; j++) {
				rubiks_cube = B_move(rubiks_cube)
			}
		}

		repeat_move_count = 1
			
		}
	

	
	updateCube(rubiks_cube)
}

function get_solved_cube() {
	whiteFace = [
	["W","W","W"],
	["W","W","W"],
	["W","W","W"]
	]
	
	yellowFace = [
    ["Y", "Y", "Y"],
    ["Y", "Y", "Y"],
    ["Y", "Y", "Y"]
	]

	redFace = [
    ["R", "R", "R"],
    ["R", "R", "R"],
    ["R", "R", "R"]
	]
	
	orangeFace = [
    ["O", "O", "O"],
    ["O", "O", "O"],
    ["O", "O", "O"]
	]

	blueFace = [
    ["B", "B", "B"],
    ["B", "B", "B"],
    ["B", "B", "Y"]
	]

	greenFace = [
    ["G", "G", "G"],
    ["G", "G", "G"],
    ["R", "G", "G"]
	]
	
	rubiks_cube = [whiteFace, greenFace, redFace, blueFace, orangeFace, yellowFace]
	return rubiks_cube
}

function rotate_face_clockwise(face) {
	rotated_face = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
	]
	

	//corners
	rotated_face[0][0] = face[2][0]
	rotated_face[0][2] = face[0][0]
	rotated_face[2][0] = face[2][2]
	rotated_face[2][2] = face[0][2]
	
	//edges
	rotated_face[0][1] = face[1][0]
	rotated_face[1][0] = face[2][1]
	rotated_face[1][2] = face[0][1]
	rotated_face[2][1] = face[1][2]
	
	// centre
	rotated_face[1][1] = face[1][1]
	return rotated_face
}

function R_move(rubiks_cube) {

	rubiks_cube[2] = rotate_face_clockwise(rubiks_cube[2])
	
	temp_piece_1 = rubiks_cube[3][0][0]
	temp_piece_2 = rubiks_cube[3][1][0]
	temp_piece_3 = rubiks_cube[3][2][0]
	
	// white to blue
	rubiks_cube[3][2][0] = rubiks_cube[0][0][2]
	rubiks_cube[3][1][0] = rubiks_cube[0][1][2]
	rubiks_cube[3][0][0] = rubiks_cube[0][2][2]
	
	// green to white
	rubiks_cube[0][0][2] = rubiks_cube[1][0][2]
	rubiks_cube[0][1][2] = rubiks_cube[1][1][2]
	rubiks_cube[0][2][2] = rubiks_cube[1][2][2]
	
	// yellow to green
	rubiks_cube[1][0][2] = rubiks_cube[5][0][2]
	rubiks_cube[1][1][2] = rubiks_cube[5][1][2]
	rubiks_cube[1][2][2] = rubiks_cube[5][2][2]
	
	// blue to yellow
	rubiks_cube[5][2][2] = temp_piece_1
	rubiks_cube[5][1][2] = temp_piece_2
	rubiks_cube[5][0][2] = temp_piece_3
	
	return rubiks_cube
}

function U_move(rubiks_cube) {

	rubiks_cube[0] = rotate_face_clockwise(rubiks_cube[0])
	
	temp_piece_1 = rubiks_cube[2][0][0]
	temp_piece_2 = rubiks_cube[2][0][1]
	temp_piece_3 = rubiks_cube[2][0][2]
	
	// blue to red
	rubiks_cube[2][0][0] = rubiks_cube[3][0][0]
	rubiks_cube[2][0][1] = rubiks_cube[3][0][1]
	rubiks_cube[2][0][2] = rubiks_cube[3][0][2]
	
	// orange to blue
	rubiks_cube[3][0][0] = rubiks_cube[4][0][0]
	rubiks_cube[3][0][1] = rubiks_cube[4][0][1]
	rubiks_cube[3][0][2] = rubiks_cube[4][0][2]
	
	// green to orange
	rubiks_cube[4][0][0] = rubiks_cube[1][0][0]
	rubiks_cube[4][0][1] = rubiks_cube[1][0][1]
	rubiks_cube[4][0][2] = rubiks_cube[1][0][2]
	
	// red to green
	rubiks_cube[1][0][0] = temp_piece_1
	rubiks_cube[1][0][1] = temp_piece_2
	rubiks_cube[1][0][2] = temp_piece_3	
	
	return rubiks_cube
}

function L_move(rubiks_cube) {

	rubiks_cube[4] = rotate_face_clockwise(rubiks_cube[4])
	
	temp_piece_1 = rubiks_cube[3][0][2]
	temp_piece_2 = rubiks_cube[3][1][2]
	temp_piece_3 = rubiks_cube[3][2][2]
	
	// yellow to blue
	rubiks_cube[3][2][2] = rubiks_cube[5][0][0]
	rubiks_cube[3][1][2] = rubiks_cube[5][1][0]
	rubiks_cube[3][0][2] = rubiks_cube[5][2][0]
	
	// green to yellow
	rubiks_cube[5][0][0] = rubiks_cube[1][0][0]
	rubiks_cube[5][1][0] = rubiks_cube[1][1][0]
	rubiks_cube[5][2][0] = rubiks_cube[1][2][0]
	
	// white to green
	rubiks_cube[1][0][0] = rubiks_cube[0][0][0]
	rubiks_cube[1][1][0] = rubiks_cube[0][1][0]
	rubiks_cube[1][2][0] = rubiks_cube[0][2][0]
		
	// blue to white
	rubiks_cube[0][2][0] = temp_piece_1
	rubiks_cube[0][1][0] = temp_piece_2
	rubiks_cube[0][0][0] = temp_piece_3	
	
	return rubiks_cube
}

function D_move(rubiks_cube) {

	rubiks_cube[5] = rotate_face_clockwise(rubiks_cube[5])
	
	temp_piece_1 = rubiks_cube[2][2][0]
	temp_piece_2 = rubiks_cube[2][2][1]
	temp_piece_3 = rubiks_cube[2][2][2]
	
	// green to red
	rubiks_cube[2][2][0] = rubiks_cube[1][2][0]
	rubiks_cube[2][2][1] = rubiks_cube[1][2][1]
	rubiks_cube[2][2][2] = rubiks_cube[1][2][2]
	
	// orange to green
	rubiks_cube[1][2][0] = rubiks_cube[4][2][0]
	rubiks_cube[1][2][1] = rubiks_cube[4][2][1]
	rubiks_cube[1][2][2] = rubiks_cube[4][2][2]
	
	// blue to orange
	rubiks_cube[4][2][0] = rubiks_cube[3][2][0]
	rubiks_cube[4][2][1] = rubiks_cube[3][2][1]
	rubiks_cube[4][2][2] = rubiks_cube[3][2][2]
	
	// red to blue
	rubiks_cube[3][2][0] = temp_piece_1
	rubiks_cube[3][2][1] = temp_piece_2
	rubiks_cube[3][2][2] = temp_piece_3	
	
	return rubiks_cube
}

function F_move(rubiks_cube) {

	
	rubiks_cube[1] = rotate_face_clockwise(rubiks_cube[1])
	
	temp_piece_1 = rubiks_cube[0][2][0]
	temp_piece_2 = rubiks_cube[0][2][1]
	temp_piece_3 = rubiks_cube[0][2][2]
	
	// orange to white
	rubiks_cube[0][2][0] = rubiks_cube[4][2][2]
	rubiks_cube[0][2][1] = rubiks_cube[4][1][2]
	rubiks_cube[0][2][2] = rubiks_cube[4][0][2]
	
	// yellow to ornage
	rubiks_cube[4][0][2] = rubiks_cube[5][0][0]
	rubiks_cube[4][1][2] = rubiks_cube[5][0][1]
	rubiks_cube[4][2][2] = rubiks_cube[5][0][2]
	
	// red to yellow
	rubiks_cube[5][0][0] = rubiks_cube[2][2][0]
	rubiks_cube[5][0][1] = rubiks_cube[2][1][0]
	rubiks_cube[5][0][2] = rubiks_cube[2][0][0]
	
	// white to red
	rubiks_cube[2][0][0] = temp_piece_1
	rubiks_cube[2][1][0] = temp_piece_2
	rubiks_cube[2][2][0] = temp_piece_3	
	
	return rubiks_cube
	
}

function B_move(rubiks_cube) {
	
	rubiks_cube[3] = rotate_face_clockwise(rubiks_cube[3])

	
	temp_piece_1 = rubiks_cube[0][0][0]
	temp_piece_2 = rubiks_cube[0][0][1]
	temp_piece_3 = rubiks_cube[0][0][2]
	
	// red to white
	rubiks_cube[0][0][0] = rubiks_cube[2][0][2]
	rubiks_cube[0][0][1] = rubiks_cube[2][1][2]
	rubiks_cube[0][0][2] = rubiks_cube[2][2][2]
	
	// yellow to red
	rubiks_cube[2][0][2] = rubiks_cube[5][2][2]
	rubiks_cube[2][1][2] = rubiks_cube[5][2][1]
	rubiks_cube[2][2][2] = rubiks_cube[5][2][0]
	
	// orange to yellow
	rubiks_cube[5][2][0] = rubiks_cube[4][0][0]
	rubiks_cube[5][2][1] = rubiks_cube[4][1][0]
	rubiks_cube[5][2][2] = rubiks_cube[4][2][0]
	
	// white to orange
	rubiks_cube[4][2][0] = temp_piece_1
	rubiks_cube[4][1][0] = temp_piece_2
	rubiks_cube[4][0][0] = temp_piece_3	
	
	return rubiks_cube
	
}

function updateCube(cubeState) {
	const faces = ['whiteFace', 'greenFace', 'redFace', 'blueFace', 'orangeFace', 'yellowFace'];
  

  
	for (let i = 0; i < faces.length; i++) {
		faceElement = document.getElementById(faces[i])
		faceArray = cubeState[i]
		
		stickers = faceArray.flat()
		faceStickers = faceElement.querySelectorAll('.sticker')
		
		for (let j = 0; j < faceStickers.length; j++) {
			stickerElement = faceStickers[j]
			stickerElement.style.backgroundColor = getColour(stickers[j])
		}
	}
}


function getColour(colour) {
  switch (colour) {
    case 'W':
      return 'white'
    case 'Y':
      return 'yellow'
    case 'R':
      return 'red'
    case 'O':
      return 'orange'
    case 'B':
      return 'blue'
    case 'G':
      return 'green'
    default:
      return 'black';
  }
}



document.onkeyup = function(e) {
	if (e.keyCode == 32) {
		if (document.activeElement.nodeName.toLowerCase() != "input") {
			startTimer();
		}
	}
}

generateNewScramble()






