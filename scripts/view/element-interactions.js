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