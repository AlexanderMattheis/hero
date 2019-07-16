const randomizer = require('../maths/randomizer');

exports.answerTypes = {
    A: 1,
    B: 2,
    C: 3,
    D: 4
};

exports.ready = false;
exports.paused = false;

exports.currentlyCorrectAnswers = [];
exports.currentlySelectedAnswers = [];
exports.currentTeam = 0;
exports.earnedPointsNumber = 0;
exports.numberOfTeams = 0;
exports.pointsOfTeams = [];
exports.questionsData = [];
exports.currentRound = 1;
exports.lastRound = -1;
exports.givenWrongAnswer = false;

exports.createProbsEqualizedQuestionData = function (metaDataAndQuestions) {
    const files = metaDataAndQuestions.files;
    const types = metaDataAndQuestions.types;

    const data = [];

    for (let i = 0; i < files.length; i++) {
        const quiz = files[i].quiz;
        const type = types[i];

        for (let j = 0; j < quiz.questions.length; j++) {
            const question = quiz.questions[j];
            const questionData = {type: type, question: question};
            data.push(questionData);
        }
    }

    return data;
};

exports.getNextQuestionData = function () {
    const numberOfQuestions = this.questionsData.length;
    let selectedQuestionData = '';

    if (numberOfQuestions > 0) {
        const randomNumber = randomizer.getInteger(0, numberOfQuestions);
        selectedQuestionData = this.questionsData.splice(randomNumber, 1)[0];
    }

    return selectedQuestionData;
};

exports.addAnswer = function (number) {
    if (this.currentlySelectedAnswers.includes(number)) {
        this.currentlySelectedAnswers = this.currentlySelectedAnswers.filter((value) => {
            return value !== number;
        });
    } else {
        this.currentlySelectedAnswers.push(number);
    }
};

exports.clearAnswers = function () {
    this.currentlySelectedAnswers.length = 0;
    this.currentlyCorrectAnswers.length = 0;

    this.givenWrongAnswer = false;
    this.earnedPointsNumber = 0;
};

exports.processAnswers = function () {
    const numberOfCorrectAnswers = this.currentlyCorrectAnswers.length;
    let pointsForQuestion = 0;

    for (const answerNumber of this.currentlySelectedAnswers) {
        if (this.currentlyCorrectAnswers.includes(answerNumber)) {
            pointsForQuestion += 1 / numberOfCorrectAnswers;
        } else {
            pointsForQuestion -= 1 / numberOfCorrectAnswers;
            this.givenWrongAnswer = true;
        }
    }

    if (pointsForQuestion > 0) {
        this.pointsOfTeams[this.currentTeam] += pointsForQuestion;
        this.earnedPointsNumber = pointsForQuestion;
    }
};

exports.setPoints = function (team, points) {
    this.pointsOfTeams[team] = points;
};

exports.nextTeam = function () {
    this.currentTeam = (this.currentTeam + 1) % this.numberOfTeams;
};

exports.getLastRound = function (numberOfTeams, numberOfQuestions) {
    return parseInt(numberOfQuestions / numberOfTeams) * numberOfTeams;
};

exports.selectWinnerTeamData = function () {
    let maxPointsIndizes = [];
    let maxPoints = Number.NEGATIVE_INFINITY;

    // find maximum
    for (const pointsNumber of this.pointsOfTeams) {
        if (pointsNumber > maxPoints) {
            maxPoints = pointsNumber;
        }
    }

    // select all teams with the maximum number
    let index = 0;
    for (const pointsNumber of this.pointsOfTeams) {
        index++;
        if (pointsNumber === maxPoints) {
            maxPointsIndizes.push(index)
        }
    }

    return {teams: maxPointsIndizes, points: maxPoints};
};

