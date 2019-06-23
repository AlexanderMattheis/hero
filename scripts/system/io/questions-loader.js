const filesystem = require('fs');
const xml2js = require('xml2js');

const parser = new xml2js.Parser();

exports.load = function (directoryPath) {
    const fileNames = filesystem.readdirSync(directoryPath);

    const questionTypes = [];
    const questionFiles = [];

    fileNames.forEach(fileName => {
        let questionType = getQuestionType(fileName);
        questionTypes.push(questionType);

        let questionFile = loadAndParseFile(parser, directoryPath, fileName);
        questionFiles.push(questionFile);
    });

    return {types: questionTypes, files: questionFiles};
};

function getQuestionType(fileName) {
    return fileName.split('.')[0];
}


function loadAndParseFile(parser, directoryPath, fileName) {
    let questionData = {};

    const filePath = directoryPath + '/' + fileName;
    const fileData = filesystem.readFileSync(filePath, 'utf8');

    parser.parseString(fileData, (parsingError, jsonData) => {
        if (parsingError) {
            throw parsingError;
        }

        questionData = jsonData;
    });

    return questionData;
}