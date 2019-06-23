const electron = require('electron');

const remote = electron.remote;
const paths = remote.require('./system/defaults/paths');
const questionsLoader = remote.require('./system/io/questions-loader');

// constants
const MIN_NUMBER_OF_TEAMS = 1;

// variables
let gameReady = false;
let questionData = {};

document.addEventListener('keyup', function (event) {
    if (!gameReady && event.key === 'Enter') {
        const numOfTeamsLabel= document.getElementById("num-of-teams-label");
        const numOfTeamsInput = document.getElementById("num-of-teams-input");

        let numberOfTeams = getNumber(numOfTeamsInput, MIN_NUMBER_OF_TEAMS);
        hide(numOfTeamsLabel, numOfTeamsInput);
        loadQuestions(paths.INPUT_FOLDER);
        gameReady = true;
    } else if (gameReady) {
        if (event.key === 'a') {

        } else if (event.key === 'b') {

        } else if (event.key === 'c') {
            
        } else if (event.key === 'd') {

        }
    }
});

function loadQuestions(directoryPath) {
    const loadingTextContainer = document.getElementById('loading-text-container');

    loadingTextContainer.classList.remove('d-none');
    questionData = questionsLoader.load(directoryPath);
    loadingTextContainer.classList.add('d-none');
}