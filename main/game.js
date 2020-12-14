
//-----------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------JAVASCRIPT ASSIGNMENT TERM TWO -- DIWAS LAMSAL -- 18406547 -------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------//

// Some globally declared variables

	var i = 1;
	var horseBetOn;
	var inputAmount; 
	var currentMoney = 100; //The initial money provided
	var validationSpan;
	var lapDisplay;
	var adDisplayInner;
	var mainTheme = new Audio("main-theme.mp3"); //The background music
	var winSound = new Audio("Resources/win.mp3"); //The audio to be played on win condition
	var loseSound = new Audio("Resources/lose.mp3"); //The audio to be played on lose condition
	loseSound.playbackRate = 2.0; //The loseSound is a bit slower kind of audio and so needs to be fast forwarded by 2x


// This is the audio control widget and the main theme itself 
// The different buttons have different features added to them
// Some play or pause the audio, some raise or reduce the volume while some mute or unmute the audio

	function playAudio(){
	   	mainTheme.loop = true;
	   	mainTheme.volume = 0.5;
	   	mainTheme.play();
   		
   		var minus = document.getElementById('minus');
   		var plus = document.getElementById('plus');
   		var pause = document.getElementById('playPause');
   		var level = document.getElementById('volumeLevel');

// The minus button that reduces the volume
   		minus.addEventListener('click', function(){
   			if (mainTheme.volume>=0.1) mainTheme.volume -= 0.1;

   			if(mainTheme.volume<=0.3 && mainTheme.volume>0.1) {
   				level.innerHTML='<img src = "Resources/lowvolume.svg" alt = "Volume Level">';
   			}
   			else if(mainTheme.volume>=0.4 && mainTheme.volume<0.7) {
   				level.innerHTML='<img src = "Resources/midvolume.svg" alt = "Volume Level">';
   			}
   			else if(mainTheme.volume<=0.1){
   				level.innerHTML='<img src = "Resources/mute.svg" alt = "Volume Level">';
   			}
   		});


// The pause and play buttons that perform their respective actions
   		playPause.addEventListener('click', function(){
   			if (mainTheme.volume > 0) {
   				mainTheme.volume = 0;
   				mainTheme.pause();
   				this.innerHTML = '<img src = "Resources/play.svg" alt = " - ">';
   			}

   			else if (mainTheme.volume==0){
   				mainTheme.play();
   				mainTheme.volume = 0.5;
   				this.innerHTML = '<img src = "Resources/pause.svg" alt = " - ">';
   			}

   		});

// The plus button that increases the volume
   		plus.addEventListener('click', function(){
   			if(mainTheme.volume<=0.9) mainTheme.volume += 0.1;

   			if(mainTheme.volume>=0.7) {
   				level.innerHTML='<img src = "Resources/highvolume.svg" alt = "Volume Level">';
   			}
   			else if(mainTheme.volume>=0.4 && mainTheme.volume<0.7){
   				level.innerHTML='<img src = "Resources/midvolume.svg" alt = "Volume Level">';
   			}
   			else if(mainTheme.volume>0.1 && mainTheme.volume<0.4){
   				level.innerHTML='<img src = "Resources/lowvolume.svg" alt = "Volume Level">';
   			}
   		});

   			
// The level button that mutes or unmutes the music
   		level.addEventListener('click', function(){

   			if (mainTheme.volume>0){
   				mainTheme.volume = 0;
   				this.innerHTML = '<img src = "Resources/mute.svg" alt = "Volume Level">';
   			}
   			else if(mainTheme.volume==0){
   				mainTheme.volume = 0.5;
   				this.innerHTML = '<img src = "Resources/midvolume.svg" alt = "Volume Level">';
   			}
   		});

   }
// End of audio control functions and the audio properties


/* 
* As OOP concepts have been followed, the following function creates racer objects which can take part in the race
* and have different behaviors and values
* The objects need to have five values passed as arguments these being the id, left position, top position, the number or the number in the id
* and the number of laps. The number of laps is taken from the input box and does not have to be entered manually, but is passed as a 
* variable.
*
*/

	function racer(horseId, left, top, number, laps){

		this.element = document.getElementById(horseId);//The id for respective racers: horse numbers
		this.left = left;
		this.top = top;
		this.number = number;
		this.interval = 0;
		this.positions;
		this.laps = laps;
		this.speedInterval = 0;
		horseBetOn = document.getElementById('bethorse').value;

// Different functions for the racers objects. These define the direction and speed of the horses and other features.
// The speeds of the horses are set so that they change every second.

// The runRight function which defines the running property of the horse towards the right direction. In case the end of the path is reached, the horse
// changes its direction to the upward direction.

		this.runRight = function(){
			var racers = this;
			clearInterval(racers.interval);
			racers.element.className = 'horse runRight';
			racers.speed = 10 + Math.ceil(Math.random()*5);
			racers.interval = setInterval(movingRight, racers.speed);

			clearInterval(racers.speedInterval);
			racers.speedInterval = setInterval(function(){
				clearInterval(racers.interval);
				racers.speed = 10 + Math.ceil(Math.random()*5);
				racers.interval = setInterval(movingRight, racers.speed);
			}, 1000);

			function movingRight(){
				racers.left += 0.2;
				if(racers.left >= 70 + racers.number*2.8){
					racers.runUp();
				}
				racers.element.style.left = racers.left +'vw';
			}
			
		}


// The runUp function which defines the running property of the horse towards the up direction. In case the end of the path is reached, the horse
// changes its direction to the left direction.

	
		this.runUp = function(){
			var racers = this;
			clearInterval(racers.interval);
			racers.element.className = 'horse runUp';
			racers.speed = 10 + Math.ceil(Math.random()*5);
			racers.interval = setInterval(movingUp, racers.speed);

			clearInterval(racers.speedInterval);
			racers.speedInterval = setInterval(function(){
				clearInterval(racers.interval);
				racers.speed = 10 + Math.ceil(Math.random()*5);
				racers.interval = setInterval(movingUp, racers.speed);
			}, 1000);
				function movingUp(){
					racers.top -= 0.2;
					if(racers.top <= 3 + racers.number*2.8){
						racers.runLeft();
					}
					racers.element.style.top = racers.top + 'vh';
				
				}
		}


// The runLeft function which defines the running property of the horse towards the left direction. In case the end of the path is reached, the horse
// changes its direction to the downward direction.


		this.runLeft = function(){
			var racers = this;
			clearInterval(racers.interval);
			racers.element.className = 'horse runLeft';
			racers.speed = 10 + Math.ceil(Math.random()*5);
			racers.interval = setInterval(movingLeft, racers.speed);

			clearInterval(racers.speedInterval);
			racers.speedInterval = setInterval(function(){
				clearInterval(racers.interval);
				racers.speed = 10 + Math.ceil(Math.random()*5);
				racers.interval = setInterval(movingLeft, racers.speed);
			}, 1000);		
				
			function movingLeft(){
				racers.left -= 0.2;
				if(racers.left <= 0 + racers.number*2.8){
					racers.runDown();
				}
				racers.element.style.left = racers.left +'vw';

			}
		}

/*
*
* The runDown function which defines the running property of the horse towards the downward direction. In case the end of the path is reached, the horse
* changes its direction to the right direction, but, if the number of laps is complete, the finishLine function is called which performs a separate action
* whereas when the number of laps are not completed, this function calls the runRight function. Which would be repeating these functions once again.
*
*/

		this.runDown = function() {
			var racers = this;
			clearInterval(racers.interval);
			racers.element.className = 'horse runDown';
			racers.speed = 10 + Math.ceil(Math.random()*5);
			racers.interval = setInterval(movingDown, racers.speed);

			clearInterval(racers.speedInterval);
			racers.speedInterval = setInterval(function(){
				clearInterval(racers.interval);
				racers.speed = 10 + Math.ceil(Math.random()*5);
				racers.interval = setInterval(movingDown, racers.speed);
			}, 1000);	

			function movingDown(){
				racers.top += 0.2;
				if(racers.top >= 65.5 + racers.number*2.8){
					if(racers.laps > 1){
						racers.runRight();
					}
					else{
						racers.finishLine();
					}
					racers.laps--;
					setTimeout(function(){lapDisplay.innerHTML = "Laps: " + racers.laps;}, 1500);
				}
				racers.element.style.top = racers.top + 'vh';
			}


		}


// The finishLine function which defines the stop point of the race. All the horses stop once they complete the required laps and reach the finish line.
// This also displays the results in the result box. That is, it displays the respective heads against the 1st, 2nd, 3rd and 4th positions.

		this.finishLine = function(){
			var racers = this;
			clearInterval(racers.interval);
			clearInterval(racers.speedInterval);
			racers.speed = 10 + Math.ceil(Math.random()*5);
			racers.element.className = 'horse runRight';
			racers.interval = setInterval(finishingRace, racers.speed);
			racers.positions = document.getElementsByTagName('td');


			function finishingRace(){
				racers.left += 0.2;
				if(racers.left >= 27){
					racers.element.className = 'horse standRight';
					clearInterval(racers.interval);
					racers.positions[i].className = 'horse' + racers.number;
					if (i == 1)racers.betDecision();
					i+=2;
					
				}
				racers.element.style.left = racers.left +'vw';
					
				if(i>7){
					lapDisplay.style.opacity=0;
					startButton = document.getElementById('start');
					startButton.className = "";
					
					document.getElementById('amount').readOnly = false;
					document.getElementById('lapNumber').readOnly = false;
				}

			}
			
		}
			

// The function for starting the race. When the function is called, the race begins.
		this.startRace = function(){
			this.runRight();
		}


// The betdecision function which is called after a racer crosses the finish line and shall be declared as the winner.
// This executes the betting logic.

		this.betDecision = function(){
			var racers = this;

			inputAmount = parseInt(document.getElementById('amount').value);
			adDisplayInner = document.getElementById('adDisplayInner');

			if (racers.positions[1].className == horseBetOn){
				currentMoney += inputAmount;
				winSound.play();
				adDisplayInner.innerHTML='<img src = "Resources/winner.gif" style="height: 100%; width: 100%;">';
			}

			else {
				currentMoney -= inputAmount;
				loseSound.play();
				adDisplayInner.innerHTML='<img src = "Resources/loser.gif" style="height: 100%; width: 100%;">';
			}
		
			document.getElementById('funds').innerHTML = currentMoney;

			validationSpan = document.getElementById('validationCheck');
			validationSpan.innerHTML = "";

			setTimeout(function(){
				adDisplayInner.innerHTML='<img src = "Resources/ad.gif" style="height: 100%; width: 100%;">';
			}, 6000);

		}

	}



//----------------------------------------INSERT ALL THE CODES HERE FOR WHAT HAPPENS WHEN THE WINDOW LOADS-------------------------------------//
window.onload = function() {
	
// The button that removes the modal dispalyed on game startup
	var playButton = document.getElementById('playButton');
	playButton.onclick = function(){
		var modal = document.getElementById('modal');
		modal.style.opacity=0;
		setTimeout(function(){modal = document.getElementById('modal'); modal.style.display="none";}, 1000);
		playAudio();	
	
	}
	
// The countdown tick audio
	var countDownAudio = new Audio("Resources/Countdown.mp3");//Tick sound for countdown
	countDownAudio.volume = 1;

// The start race button
	var startButton = document.getElementById('start');
	startButton.addEventListener('click', startRace);


// The startRace function starts the race or halts it if some validation erros exist
	function startRace(){
		var laps = parseInt(document.getElementById('lapNumber').value);

		var racer1 = new racer('horse1', 30, 68, 1, laps);
		var racer2 = new racer('horse2', 30, 72, 2, laps);
		var racer3 = new racer('horse3', 30, 76, 3, laps);
		var racer4 = new racer('horse4', 30, 80, 4, laps);


		inputAmount = document.getElementById('amount');
		var convertToNum = parseInt(inputAmount.value);
		var validationSpan = document.getElementById('validationCheck');
		funds = parseInt(document.getElementById('funds').innerHTML);
		var countDown = document.getElementById('countDown');


// The validation tests
		if (convertToNum < 1 || isNaN(convertToNum)){
			validationSpan.style.color = "red";
			validationSpan.innerHTML = '<br>* Please enter a valid amount.<br>';		
		}
		else if (convertToNum > funds){
			validationSpan.style.color = "red";
			validationSpan.innerHTML = '<br>* You do not have enough funds.<br>';	
		}
		else if (laps<1 || isNaN(laps)){
			validationSpan.style.color = "red";
			validationSpan.innerHTML = "<br>Invalid number of Laps.<br>";
		}


// This part is executed only when the inputs are valid. This part starts the race. 
		else if(this.className != "start"){
			this.className = "start";

// Disable the inputs when the race begins
			document.getElementById('amount').readOnly = true;
			document.getElementById('lapNumber').readOnly = true;
			lapDisplay = document.getElementById('lapDisplay');
			lapDisplay.style.opacity=1;
			lapDisplay.innerHTML = "Laps: " + laps;

			validationSpan.style.color = "green";
			validationSpan.innerHTML = "<br>You betted £" + convertToNum + "!<br>";
			var x = 3;
			interval = setInterval(countDownTimer, 1000);

			setTimeout(function(){countDown.style.display = "none";}, 5500);

// This timeout prevents the horses from running before the countdown timer does its job
			setTimeout(begin, 4500);

			function begin(){
				racer1.startRace();
				racer2.startRace();
				racer3.startRace();
				racer4.startRace();
			}

			i = 1;

// This clears the position leaderboard for the new race
			var positions = document.getElementsByTagName('td');
			for (var j = 1; j < positions.length; j++)positions[j].className = '';
		}

// The countdown timer. Every second, the timer value is reduced by one and when it is 1, goFunction is called.
			function countDownTimer(){
				countDown.style.display = "block";	
				countDown.style.opacity = 1;	
				countDownAudio.play();
				countDown.innerHTML=x;
				if (x<1) {
					clearInterval(interval);
					goFunction();		
				}
				x--;
			}

// The race is setup to start only after the "Go!" text fades.
			function goFunction(){
				countDown.innerHTML="Go!";
				setTimeout(function(){
					countDown.style.opacity = 0;
				}, 500);
			}

	}

}