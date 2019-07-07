const electron = require('electron');
const path = require('path');

const remote = electron.remote;
const BrowserWindow = remote.BrowserWindow;

const paths = remote.require('./system/defaults/paths');
const questionsLoader = remote.require('./system/io/questions-loader');
const quiz = remote.require('./logic/business/quiz');

// enums
const answer = {
    A: 1,
    B: 2,
    C: 3,
    D: 4
};

const numOfTeamsInput = document.getElementById("num-of-teams-input");
const overlay = document.getElementById("main-window-overlay");

numOfTeamsInput.onkeydown = function (event) {
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
            selectAnswer(answer.A);
        } else if (event.key === 'b' && !quiz.paused) {
            selectAnswer(answer.B);
        } else if (event.key === 'c' && !quiz.paused) {
            selectAnswer(answer.C);
        } else if (event.key === 'd' && !quiz.paused) {
            selectAnswer(answer.D);
        } else if (event.key === 'Enter' && quiz.currentlySelectedAnswers.length > 0 && !quiz.paused) {
            quiz.paused = true;
            quiz.processAnswers();
            showCurrentTeamData();
            deselectAnswers();
            nextRound();
        }
    }
});

function initGame() {
    createTeams();
    createQuestionData();
    showQuestionsScreen();
    updateOptionsHeights();

    return true;
}

function createTeams() {
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

function showQuestionsScreen() {
    const questionContainer = document.getElementById('question-container');
    const questionData = quiz.getNextQuestionData();

    show(questionContainer);
    if (questionData === '') {
        hide(questionContainer);
        // dialog: game ends here
    } else {
        const question = questionData.question;
        setElementsText(question);
        quiz.currentlyCorrectAnswers = getCorrectAnswers(question);
    }

    showCurrentTeamData();
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
    show(document.getElementsByClassName("left-corner-teams")[0]);
    show(document.getElementsByClassName("left-corner-points")[0]);
    const cuurrentTeam = document.getElementById("current-team");
    const pointsOfCurrentTeam = document.getElementById("current-team-points");
    cuurrentTeam.innerText = quiz.currentTeam + 1;
    pointsOfCurrentTeam.innerText = quiz.pointsOfTeams[quiz.currentTeam];
}

function selectAnswer(number) {
    quiz.addAnswer(number);
    const selectedAnswer = options[number - 1];  // -1 since, we start counting with 1 and not 0 as JavaScript does
    changeHighlight(selectedAnswer);
}

function deselectAnswers() {
    quiz.clearAnswers();
    removeHighlights(options);
}

async function nextRound() {
    quiz.nextTeam();

    if (quiz.numberOfTeams > 1) {
        show(overlay);
        showStatusWindow();
    }

    await until(() => quiz.paused === false);
    showQuestionsScreen();
}

function showStatusWindow() {
    const modalPath = path.join('file://', __dirname, 'status.html');
    let win = new BrowserWindow({
        alwaysOnTop: true,
        frame: false,
        height: 200,
        modal: true,
        parent: remote.getCurrentWindow(),
        resizable: true,
        transparent: true,
        width: 400,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.on('closed', () => {
        hide(overlay);
        quiz.paused = false;
        win = null;
    });

    win.loadURL(modalPath);
    win.show();
}

function until(conditionFunction) {
    const poll = resolve => {
        if (conditionFunction()) {
            resolve();
        } else {
            setTimeout(() => poll(resolve), 400);
        }
    };

    return new Promise(poll);
}