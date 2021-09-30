"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        return __awaiter(this, void 0, void 0, function () {
            var convertedFile_1, tableHeader, deviderNumbers_1, tableHeaderString, tableData, mergedData, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.convertCSVfile(csvFile)];
                    case 1:
                        convertedFile_1 = _a.sent();
                        tableHeader = Object.keys(convertedFile_1[0]);
                        deviderNumbers_1 = [];
                        // [ 7, 5, 9 ]
                        tableHeader.forEach(function (header) {
                            var numberOfStrings = _this.stringLength(convertedFile_1.map(function (a) { return a[header]; }));
                            if (numberOfStrings > header.length) {
                                deviderNumbers_1.push(numberOfStrings);
                            }
                            else {
                                deviderNumbers_1.push(header.length);
                            }
                            ;
                        });
                        tableHeaderString = this.createTableHeader(tableHeader, deviderNumbers_1);
                        tableData = this.createTableData(tableHeader, convertedFile_1, deviderNumbers_1);
                        mergedData = tableHeaderString.concat(tableData);
                        return [2 /*return*/, mergedData];
                    case 2:
                        error_1 = _a.sent();
                        console.error("testGetData: An error occurred: ");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    csvReader.prototype.convertCSVfile = function (csvFile) {
        if (csvFile) {
            return new Promise(function (resolve, reject) {
                fs.createReadStream(path.join(__dirname, csvFile))
                    .pipe(csv())
                    .on('data', function (data) { return results.push(data); })
                    .on('end', function () {
                    resolve(results);
                    // console.log("RESULTS: ",results);
                });
            });
        }
        //return csvInput;
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
var tabellieren = reader.tabellieren(dataName);
tabellieren.then(function (result) {
    console.log(result);
});
//# sourceMappingURL=csvReader.js.map