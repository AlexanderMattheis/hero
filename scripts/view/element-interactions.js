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

function unhighlight(option) {
    option.classList.remove('option-highlight');
}

function highlight(option) {
    option.classList.add('option-highlight');
}