/* max is exclusive */
exports.getInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}