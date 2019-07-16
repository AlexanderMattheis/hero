const electron = require('electron');

const ipcRenderer = electron.ipcRenderer;  // to send messages to the main-process and receive replies from it
const remote = electron.remote;

// elements
const statusContainer = document.getElementById('status-container');
const earnedPoints = document.getElementById('earned-points');

const correctAnswersLabel = document.getElementById('correct-answers-label');
const correctAnswers = document.getElementById('correct-answers');

const teamAnswersLabel = document.getElementById('team-answers-label');
const teamAnswers = document.getElementById('team-answers');

const nextTeamButton = document.getElementById('next-team-button');

ipcRenderer.on('set-team-data', (event, quiz) => {
    nextTeamButton.focus();

    earnedPoints.innerText = quiz.earnedPointsNumber === 1
        ? quiz.earnedPointsNumber + ' point'
        : quiz.earnedPointsNumber + ' points';

    const onlyOneCorrectAnswer = quiz.currentlyCorrectAnswers.length === 1;
    correctAnswersLabel.innerText = (onlyOneCorrectAnswer ? 'Correct Answer' : 'Correct Answers') + ':';

    const onlyOneTeamAnswer = quiz.currentlySelectedAnswers.length === 1;
    teamAnswersLabel.innerText = (onlyOneTeamAnswer ? 'Your Answer' : 'Your Answers') + ':';

    correctAnswers.innerText = getAnswersString(quiz.answerTypes, quiz.currentlyCorrectAnswers);
    teamAnswers.innerText = getAnswersString(quiz.answerTypes, quiz.currentlySelectedAnswers);
});

function getAnswersString(answerTypes, answers) {
    const convertedAnswers = [];

    for (const answer of answers) {
        switch (answer) {
            case answerTypes.A:
                convertedAnswers.push('A');
                break;
            case answerTypes.B:
                convertedAnswers.push('B');
                break;
            case answerTypes.C:
                convertedAnswers.push('C');
                break;
            case answerTypes.D:
                convertedAnswers.push('D');
                break;
        }
    }

    return convertedAnswers.sort().join(', ');
}

const winnersContainer = document.getElementById('winners-container');

const winnersLabel = document.getElementById('winners-label');
const winners = document.getElementById('winners');

const points = document.getElementById('points');

const restartTeamButton = document.getElementById('restart-game-button');

ipcRenderer.on('set-winners-data', (event, winnersTeamData) => {
    hide(statusContainer);
    show(winnersContainer);

    const onlyOneTeam = winnersTeamData.teams.length === 1;

    winnersLabel.innerText = (onlyOneTeam ? 'Winner-Team' : 'Winner-Teams') + ':';
    winners.innerText = winnersTeamData.teams.join(", ");

    points.innerText = winnersTeamData.points;
});

nextTeamButton.addEventListener('click', function () {
    const window = remote.getCurrentWindow();
    window.hide();
});

nextTeamButton.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        const window = remote.getCurrentWindow();
        window.hide();
    }
});

restartTeamButton.addEventListener('click', function () {
    remote.app.relaunch();
    remote.app.quit();
});

restartTeamButton.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        remote.app.relaunch();
        remote.app.quit();
    }
});