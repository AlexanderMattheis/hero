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