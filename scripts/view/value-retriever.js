function getNumber(input, minNumber) {
    const numberString = input.value;

    if (isNaN(numberString)) {
        return minNumber;
    }

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