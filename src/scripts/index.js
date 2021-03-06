const electron = require('electron');

const ipcRenderer = electron.ipcRenderer;  // to send messages to the main-process and receive replies from it
const remote = electron.remote;

const paths = remote.require('./system/defaults/paths');
const questionsLoader = remote.require('./system/io/questions-loader');
const quiz = remote.require('./logic/business/quiz');

// elements
const currentWindow = electron.remote.getCurrentWindow();
let fullscreen = false;

window.addEventListener('keyup', function(event) {
    if (event.key === 'F11') {
        fullscreen = !fullscreen;
        currentWindow.setFullScreen(fullscreen);
    }
});

const numOfTeamsInput = document.getElementById("num-of-teams-input");
const overlay = document.getElementById("main-window-overlay");

numOfTeamsInput.onkeydown = function(event) {
    // avoids writing in the number input, but allows using arrow keys
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
        event.preventDefault();
    }
};

numOfTeamsInput.addEventListener("mousewheel", function (event) {
    // avoids parallel zooming and increasement of the number of team-members
    event.preventDefault();
});

document.addEventListener('keyup', function (event) {
    if (!quiz.ready && event.key === 'Enter') {
        quiz.ready = initGame();
    } else if (quiz.ready) {
        if (event.key === 'a' && !quiz.paused) {
            selectAnswer(quiz.answerTypes.A);
        } else if (event.key === 'b' && !quiz.paused) {
            selectAnswer(quiz.answerTypes.B);
        } else if (event.key === 'c' && !quiz.paused) {
            selectAnswer(quiz.answerTypes.C);
        } else if (event.key === 'd' && !quiz.paused) {
            selectAnswer(quiz.answerTypes.D);
        } else if (event.key === 'Enter' && quiz.currentlySelectedAnswers.length > 0 && !quiz.paused) {
            quiz.processAnswers();
            showCurrentTeamData();
            nextRound();
        }
    }
});

function initGame() {
    createTeamData();
    createQuestionData();
    quiz.lastRound = quiz.getLastRound(quiz.numberOfTeams, quiz.questionsData.length); // to ensure each team gets the same amount of questions

    showNextQuestions();
    updateOptionsHeights();

    return true;
}

function createTeamData() {
    quiz.numberOfTeams = retrieveNumberOfTeams();

    for (let i = 0; i < quiz.numberOfTeams; i++) {
        quiz.setPoints(i, 0);
    }
}

function retrieveNumberOfTeams() {
    function getNumberOfTeams() {
        const numOfTeamsInput = document.getElementById("num-of-teams-input");
        return getNumber(numOfTeamsInput);
    }

    const numOfTeamsContainer = document.getElementById("num-of-teams-container");
    const numberOfTeams = getNumberOfTeams();

    hide(numOfTeamsContainer);
    return numberOfTeams;
}

function createQuestionData() {
    let metaDataAndQuestions = retrieveQuestions(paths.INPUT_FOLDER);
    quiz.questionsData = quiz.createProbsEqualizedQuestionData(metaDataAndQuestions);
}

function retrieveQuestions(directoryPath) {
    const loadingTextContainer = document.getElementById('loading-text-container');

    show(loadingTextContainer);
    const data = questionsLoader.load(directoryPath);
    hide(loadingTextContainer);

    return data;
}

function showNextQuestions() {
    const questionContainer = document.getElementById('question-container');
    const questionData = quiz.getNextQuestionData();

    show(questionContainer);
    // in a certain round the quiz should end to ensure that each team gets the same amount of questions
    if (questionData === '' || quiz.currentRound > quiz.lastRound) {
        show(overlay);
        showWinnerWindow();
        quiz.paused = true;
    } else {
        const question = questionData.question;
        setElementsText(question);
        quiz.currentlyCorrectAnswers = getCorrectAnswers(question);
    }

    if (!quiz.paused) {
        showCurrentTeamData();
    }
}

function showWinnerWindow() {
    const winnersTeamData = quiz.selectWinnerTeamData();
    ipcRenderer.send('show-winner-window', winnersTeamData);
}

function setElementsText(question) {
    const questionText = document.getElementById('question-text');
    const optionA = document.querySelector('#option-a .option-text');
    const optionB = document.querySelector('#option-b .option-text');
    const optionC = document.querySelector('#option-c .option-text');
    const optionD = document.querySelector('#option-d .option-text');

    questionText.innerText = question.text;
    optionA.innerText = question.optionA[0];
    optionB.innerText = question.optionB[0];
    optionC.innerText = question.optionC[0];
    optionD.innerText = question.optionD[0];
}

function getCorrectAnswers(question) {
    const correctAnswers = question.correct[0];
    return correctAnswers.split(',').map((item => parseInt(item)));
}

function showCurrentTeamData() {
    show(document.getElementById("teams-container"));
    show(document.getElementById("points-container"));
    const currentTeam = document.getElementById("current-team");
    const pointsOfCurrentTeam = document.getElementById("current-team-points");
    currentTeam.innerText = quiz.currentTeam + 1;
    pointsOfCurrentTeam.innerText = quiz.pointsOfTeams[quiz.currentTeam];
}

function selectAnswer(number) {
    quiz.addAnswer(number);
    const selectedAnswer = options[number - 1];  // -1, since started counting with 1 and not 0 as JavaScript does
    changeHighlight(selectedAnswer);
}

function deselectAnswers() {
    quiz.clearAnswers();
    removeHighlights(options);
}

async function nextRound() {
    if (quiz.numberOfTeams > 1 || quiz.givenWrongAnswer) {
        // pausing is only necessary in a multiplayer game to show the status or in case of a wrong answer
        quiz.paused = true;

        show(overlay);
        showStatusWindow();
    }

    // a function to check the quiz state
    await until(() => quiz.paused === false);

    quiz.currentRound++;
    quiz.nextTeam();
    deselectAnswers();
    showNextQuestions();
}

function showStatusWindow() {
    ipcRenderer.send('show-status-window', quiz);
    ipcRenderer.on('continue-quiz', () => {
        quiz.paused = false;
        hide(overlay);
    });
}

function until(conditionFunction) {
    const poll = resolve => {
        if (conditionFunction()) {
            resolve();
        } else {  // if state haven't changed, the function is checked after 400ms again
            setTimeout(() => poll(resolve), 400);
        }
    };

    return new Promise(poll);
}