const electron = require('electron');

const remote = electron.remote;
const paths = remote.require('./system/defaults/paths');
const questionsLoader = remote.require('./system/io/questions-loader');
const quiz = remote.require('./logic/business/quiz');

// constants
const MIN_NUMBER_OF_TEAMS = 1;

// enums
const answer = {
    A: 0,
    B: 1,
    C: 2,
    D: 3
};

document.addEventListener('keyup', function (event) {
    if (!quiz.ready && event.key === 'Enter') {
        quiz.ready = initGame();
    } else if (quiz.ready) {
        if (event.key === 'a') {
            selectAnswer(answer.A);
        } else if (event.key === 'b') {
            selectAnswer(answer.B);
        } else if (event.key === 'c') {
            selectAnswer(answer.C);
        } else if (event.key === 'd') {
            selectAnswer(answer.D);
        } else if (event.key === 'Enter' && quiz.currentlySelectedAnswers.length > 0) {
            quiz.processAnswers();
        }
    }
});

function initGame() {
    createTeams();
    createQuestionData();
    showQuestions();
    updateOptionsHeights();

    return true;
}

function createTeams() {
    quiz.numberOfTeams = retrieveNumberOfTeams();

    for (let i = 0; i < quiz.numberOfTeams; i++) {
        quiz.pointsOfTeams.push(0);
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

function showQuestions() {
    show(document.getElementById('question-container'));
    let questionData = quiz.getNextQuestionData();

    if (questionData === '') {
        // dialog: game ends here
    } else {
        const question = questionData.question;
        setElementsText(question);
        quiz.currentlyCorrectAnswers = getCorrectAnswers(question);
    }
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

function selectAnswer(number) {
    quiz.selectAnswer(number);
    const selectedAnswer = options[number];
    changeHighlight(selectedAnswer);
}
