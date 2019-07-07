const randomizer = require('../maths/randomizer');

exports.ready = false;
exports.paused = false;

exports.currentTeam = 0;
exports.numberOfTeams = 0;
exports.questionsData = [];
exports.currentlySelectedAnswers = [];
exports.currentlyCorrectAnswers = [];
exports.pointsOfTeams = [];

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

exports.clearAnswers = function() {
    this.currentlySelectedAnswers.length = 0;
    this.currentlyCorrectAnswers.length = 0;
};

exports.processAnswers = function () {
    const numberOfCorrectAnswers = this.currentlyCorrectAnswers.length;
    let pointsForQuestion = 0;

    for (const answer of this.currentlySelectedAnswers) {
        if (this.currentlyCorrectAnswers.includes(answer)) {
            pointsForQuestion += 1 / numberOfCorrectAnswers;
        } else {
            pointsForQuestion -= 1 / numberOfCorrectAnswers;
        }
    }

    if (pointsForQuestion > 0) {
        this.pointsOfTeams[this.currentTeam] += pointsForQuestion;
    }
};

exports.setPoints = function (team, points) {
    this.pointsOfTeams[team] = points;
};

exports.nextTeam = function () {
    this.currentTeam = (this.currentTeam + 1) % this.numberOfTeams;
};

