function hide(...elements) {
    elements.forEach((element) => {
        element.classList.add('d-none');
    });
}

function show(...elements) {
    elements.forEach((element) => {
        element.classList.remove('d-none');
    });
}

function changeHighlight(option) {
    if (option.classList.contains('option-highlight')) {
        option.classList.remove('option-highlight');
    } else {
        option.classList.add('option-highlight');
    }
}

function removeHighlights(options) {
    for (let i = 0; i < options.length; i++) {
        const selectedAnswer = options[i];
        removeHighlight(selectedAnswer);
    }
}

function removeHighlight(option) {
    option.classList.remove('option-highlight')
}