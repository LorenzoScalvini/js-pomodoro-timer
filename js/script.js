let workMinutes = 25;   
let shortBreak = 5;      
let longBreak = 15;      
let sessionCount = 0;    
let timeLeft = workMinutes * 60; 
let timer;              
let isBreak = false;    

const startSound = document.getElementById("start-sound");
const endSound = document.getElementById("end-sound");
const resetSound = document.getElementById("reset-sound"); 

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

// Funzione per avviare il timer
function startTimer() {
    clearInterval(timer); 

    startSound.play();

    timer = setInterval(() => {
        // Calcola il tempo rimanente
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById("timer").innerText = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer);

            endSound.play();

            sessionCount++;

            if (!isBreak) {
                if (sessionCount % 4 === 0) {
                    timeLeft = longBreak * 60;  
                    document.getElementById("title").innerText = "Long Break";
                } else {
                    timeLeft = shortBreak * 60; 
                    document.getElementById("title").innerText = "Short Break";
                }
                isBreak = true;
            } else {
                timeLeft = workMinutes * 60;
                isBreak = false;
                document.getElementById("title").innerText = "Pomodoro Timer";
            }

            startTimer(); 
        }
    }, 1000);
}


function stopTimer() {
    clearInterval(timer); 
    timeLeft = 0;
    document.getElementById("timer").innerText = "00:00";

    endSound.play();
}

// Funzione per resettare il timer
function resetTimer() {
    clearInterval(timer);  
    timeLeft = workMinutes * 60;  
    sessionCount = 0;  
    isBreak = false;  
    document.getElementById("timer").innerText = "25:00"; 
    document.getElementById("title").innerText = "Pomodoro Timer";
    resetSound.play();
}