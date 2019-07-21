function getNumber(input) {
    const numberString = input.value;
    return parseInt(numberString);
}

function getMaxHeight(options) {
    let maxHeight = 0;

    for (const option of options) {
        const height = option.offsetHeight;

        if (height > maxHeight) {
            maxHeight = height;
        }
    }

    return maxHeight;
}