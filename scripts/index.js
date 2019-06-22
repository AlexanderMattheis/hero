const filesystem = require('fs');

// constants
const MIN_NUMBER_OF_TEAMS = 1;

// variables
let gameReady = false;

document.addEventListener('keyup', function (event) {
    if (!gameReady && event.key === 'Enter') {
        const numOfTeamsLabel= document.getElementById("num-of-teams-label");
        const numOfTeamsInput = document.getElementById("num-of-teams-input");

        let numberOfTeams = getNumber(numOfTeamsInput, MIN_NUMBER_OF_TEAMS);
        hide(numOfTeamsLabel, numOfTeamsInput);
        readInQuestionFiles();
        gameReady = true;
    } else if (gameReady) {
        if (event.key === 'a') {

        } else if (event.key === 'b') {

        } else if (event.key === 'c') {
            
        } else if (event.key === 'd') {

        }
    }
});

function readInQuestionFiles() {
    filesystem.readdir(INPUT_FOLDER, (err, fileNames) => {
        fileNames.forEach(fileName => {
            
        });
    });
}

function readInQuestionFile() {
    
}
