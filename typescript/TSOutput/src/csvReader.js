"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var csv = require('csv-parser');
var fs = require('fs');
var path = require('path');
var results = [];
var dataName = 'data.csv';
var csvInput = [
    { Name: 'Paul', Alter: 1, Ort: 'Stuttgart', Surname: 'Musterman' },
    { Name: 'Max', Alter: 18, Ort: 'München', Surname: 'Muster' },
    { Name: 'Phillip', Alter: 19, Ort: 'Berlin', Surname: 'Test' }
];
var csvInput2 = [
    "NAME; ALTER; ORT",
    "PAUL; 17; MÜNCHEN",
    "MAX; 46; KÖLN"
];
var csvReader = /** @class */ (function () {
    function csvReader() {
    }
    // Note: 
    // Instead of providing file like > node csvReader.js file.csv
    // We could just make as requirement that file with some name
    // is in same folder as our csvReader.js app
    // If we had more time, perhaps we can consider a solution where we
    // will pass our file to csvReader.js app 
    csvReader.prototype.tabellieren = function (csvFile) {
        var _this = this;
        var convertedFile = this.convertCSVfile(csvFile);
        var tableHeader = Object.keys(csvInput[0]);
        // ['Name', 'Alter', 'Ort']
        var deviderNumbers = [];
        // [ 7, 5, 9 ]
        tableHeader.forEach(function (header) {
            var numberOfStrings = _this.stringLength(convertedFile.map(function (a) { return a[header]; }));
            if (numberOfStrings > header.length) {
                deviderNumbers.push(numberOfStrings);
            }
            else {
                deviderNumbers.push(header.length);
            }
            ;
        });
        // Create table header
        var tableHeaderString = this.createTableHeader(tableHeader, deviderNumbers);
        // Create table data
        var tableData = this.createTableData(tableHeader, convertedFile, deviderNumbers);
        var mergedData = tableHeaderString.concat(tableData);
        return mergedData;
    };
    csvReader.prototype.convertCSVfile = function (csvFile) {
        if (csvFile) {
            fs.createReadStream(path.join(__dirname, csvFile))
                .pipe(csv())
                .on('data', function (data) { return results.push(data); })
                .on('end', function () {
                // console.log("RESULTS: ",results);
            });
        }
        return csvInput;
    };
    csvReader.prototype.stringLength = function (arrayOfStrings) {
        if (arrayOfStrings.length != 0) {
            return Math.max.apply(Math, (arrayOfStrings.map(function (el) { return el.toString().length; })));
        }
        else {
            return 0;
        }
    };
    csvReader.prototype.createTableHeader = function (tableHeader, deviderNumbers) {
        var string1 = "";
        var string2 = "";
        for (var i = 0; i < tableHeader.length; i++) {
            string1 += "" + tableHeader[i] + " ".repeat(deviderNumbers[i] - tableHeader[i].length) + "|";
            string2 += "-".repeat(deviderNumbers[i]) + "+";
        }
        return [string1, string2];
    };
    csvReader.prototype.createTableData = function (tableHeader, convertedFile, deviderNumbers) {
        var arrayOfStrings = [];
        for (var i = 0; i < convertedFile.length; i++) {
            var createdString = "";
            var extractedTableRow = convertedFile[i];
            for (var j = 0; j < tableHeader.length; j++) {
                var extractedHeaderName = tableHeader[j];
                createdString += "" + extractedTableRow[extractedHeaderName] + " ".repeat(deviderNumbers[j] - extractedTableRow[extractedHeaderName].toString().length) + "|";
            }
            arrayOfStrings.push(createdString);
        }
        return arrayOfStrings;
    };
    return csvReader;
}());
exports.default = csvReader;
var reader = new csvReader();
console.log(reader.tabellieren(dataName));
//# sourceMappingURL=csvReader.js.map