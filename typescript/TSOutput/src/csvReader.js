"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var csv = require('csv-parser');
var fs = require('fs');
var path = require('path');
var results = [];
var dataName = 'data.csv';
var csvInput = [
    { Name: 'Paul', Alter: 1, Ort: 'Stuttgart' },
    { Name: 'Max', Alter: 18, Ort: 'München' },
    { Name: 'Phillip', Alter: 19, Ort: 'Berlin' }
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
        var convertedFile = this.convertCSVfile(csvFile);
        // Extract all names
        // ['Paul1', 'Paul2', 'Paul3']
        // Extract all ages
        // [17, 18, 19]
        // Extract all cities 
        // ['Stuttgart1', 'Stuttgart2', 'Stuttgart3']
        // Function that will create us string 1
        // string1(object) {...} 
        // Function that will create us string 2, string 3
        // string1(object) {...
        // Function that will create us string 1
        // string1(object) {...
        /*
            Name |Age|City    |
            -----+---+--------+
            Peter|42 |New York|
            Paul |57 |London  |
            Mary |35 |Munich  |
        */
        var string1 = "+--------+-------+-----------+";
        var string2 = "|Name    |Alter  |Ort        |";
        var string3 = "|Paul    |17     |Stuttgart  |";
        var string4 = "|        |       |           |";
        return csvFile ? string1 + '\n' + string2 + '\n' + string1 + '\n' + string3 + '\n' + string1 : string1 + '\n' + string4 + '\n' + string1;
    };
    csvReader.prototype.convertCSVfile = function (csvFile) {
        if (csvFile) {
            fs.createReadStream(path.join(__dirname, csvFile))
                .pipe(csv())
                .on('data', function (data) { return results.push(data); })
                .on('end', function () {
                return results;
                console.log("RESULTS: ", results);
            });
        }
        return csvInput;
    };
    return csvReader;
}());
exports.default = csvReader;
var reader = new csvReader();
console.log("----- CSV file exists ----");
console.log(reader.tabellieren(dataName));
console.log("\n");
console.log("----- CSV file does not exist ----");
console.log(reader.tabellieren(""));
//# sourceMappingURL=csvReader.js.map