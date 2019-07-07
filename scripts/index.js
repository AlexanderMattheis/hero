const electron = require('electron');

const remote = electron.remote;
const paths = remote.require('./system/defaults/paths');
const questionsLoader = remote.require('./system/io/questions-loader');
const quiz = remote.require('./logic/business/quiz');

// constants
const MIN_NUMBER_OF_TEAMS = 1;

// variables
let disabledKeys = false;

// enums
const answer = {
    A: 1,
    B: 2,
    C: 3,
    D: 4
};

document.addEventListener('keyup', function (event) {
    if (!quiz.ready && event.key === 'Enter') {
        quiz.ready = initGame();
    } else if (quiz.ready) {
        if (event.key === 'a' && !disabledKeys) {
            selectAnswer(answer.A);
        } else if (event.key === 'b' && !disabledKeys) {
            selectAnswer(answer.B);
        } else if (event.key === 'c' && !disabledKeys) {
            selectAnswer(answer.C);
        } else if (event.key === 'd' && !disabledKeys) {
            selectAnswer(answer.D);
        } else if (event.key === 'Enter' && quiz.currentlySelectedAnswers.length > 0 && !disabledKeys) {
            disabledKeys = true;
            quiz.processAnswers();
            showCurrentTeamPoints();
            deselectAnswers();
            nextRound();
            disabledKeys = false;
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
        return getNumber(numOfTeamsInput, MIN_NUMBER_OF_TEAMS);
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
    showCurrentTeamPoints();
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

function showCurrentTeamPoints() {
    show(document.getElementsByClassName("left-corner-points")[0]);
    const pointsOfTheCurrentTeam = document.getElementById("current-team-points");
    pointsOfTheCurrentTeam.innerText = quiz.pointsOfTeams[quiz.currentTeam];
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

function nextRound() {
    quiz.nextTeam();
    showQuestionsScreen();
}

