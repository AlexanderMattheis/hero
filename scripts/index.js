const electron = require('electron');

const remote = electron.remote;
const paths = remote.require('./system/defaults/paths');
const questionsLoader = remote.require('./system/io/questions-loader');

// constants
const MIN_NUMBER_OF_TEAMS = 1;

// variables
let gameReady = false;

let numberOfTeams = 0;
let questionData = {};

document.addEventListener('keyup', function (event) {
    if (!gameReady && event.key === 'Enter') {
        gameReady = initGame();
    } else if (gameReady) {
        if (event.key === 'a') {
            selectAnswer(0);
        } else if (event.key === 'b') {
            selectAnswer(1);
        } else if (event.key === 'c') {
            selectAnswer(2);
        } else if (event.key === 'd') {
            selectAnswer(3);
        }
    }
});

function initGame() {
    numberOfTeams = retrieveNumberOfTeams();
    questionData = retrieveQuestions(paths.INPUT_FOLDER);
    showQuestions();

    return true;
}

function retrieveNumberOfTeams() {
    function getNumberOfTeams() {
        const numOfTeamsInput = document.getElementById("num-of-teams-input");
        return getNumber(numOfTeamsInput, MIN_NUMBER_OF_TEAMS);
    }

    const numOfTeamsContainer = document.getElementById("num-of-teams-container");
    const numberOfTeams = getNumberOfTeams();

    hide(numOfTeamsContainer);
    return numberOfTeams;
}

function retrieveQuestions(directoryPath) {
    const loadingTextContainer = document.getElementById('loading-text-container');

    show(loadingTextContainer);
    const questionData = questionsLoader.load(directoryPath);
    hide(loadingTextContainer);

    return questionData;
}

function showQuestions() {
    show(document.getElementById('question-container'));
}

function selectAnswer(number) {
    for (const option of options) {
        unhighlight(option);
    }

    const selectedAnswer = options[number];
    highlight(selectedAnswer);
}
