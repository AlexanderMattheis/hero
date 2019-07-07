const electron = require('electron');

const remote = electron.remote;

const nextTeamButton = document.getElementById("next-team-button");

nextTeamButton.focus();

nextTeamButton.addEventListener('click', function () {
    const window = remote.getCurrentWindow();
    window.close();
});

nextTeamButton.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const window = remote.getCurrentWindow();
        window.close();
    }
});