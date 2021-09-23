"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var csv = require('csv-parser');
var fs = require('fs');
var path = require('path');
var results = [];
var dataName = 'data.csv';
var csvReader = /** @class */ (function () {
    function csvReader() {
    }
    csvReader.prototype.Tabelieren = function (csvFile) {
        if (csvFile) {
            fs.createReadStream(path.join(__dirname, csvFile))
                .pipe(csv())
                .on('data', function (data) { return results.push(data); })
                .on('end', function () {
                // console.log(results);
            });
        }
        var string1 = "+--------+-------+-----------+";
        var string2 = "|Name    |Alter  |Ort        |";
        var string3 = "|Paul    |17     |Stuttgart  |";
        var string4 = "|        |       |           |";
        return csvFile ? string1 + '\n' + string2 + '\n' + string1 + '\n' + string3 + '\n' + string1 : string1 + '\n' + string4 + '\n' + string1;
    };
    return csvReader;
}());
exports.default = csvReader;
var reader = new csvReader();
console.log("----- CSV file exists ----");
console.log(reader.Tabelieren(dataName));
console.log("\n");
console.log("----- CSV file does not exist ----");
console.log(reader.Tabelieren(""));
//# sourceMappingURL=csvReader.js.map