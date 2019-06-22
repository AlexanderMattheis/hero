function getNumber(input, minNumber) {
    const numberString = input.value;

    if (isNaN(numberString)) {
        return minNumber;
    }

    return parseInt(numberString);
}