function hide(...elements) {
    elements.forEach((element) => {
        element.setAttribute('style', 'display: none !important');
    });
}