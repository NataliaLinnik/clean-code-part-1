"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var tableHeaderString = [];
var readline = __importStar(require("readline"));
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
            var convertedFile_1, tableHeader, deviderNumbers_1, tableData, error_1;
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
                        // Create table header
                        tableHeaderString = this.createTableHeader(tableHeader, deviderNumbers_1);
                        tableData = this.createTableData(tableHeader, convertedFile_1, deviderNumbers_1);
                        return [2 /*return*/, tableData];
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
                });
            });
        }
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
    csvReader.prototype.displayResults = function (result) {
        console.log('\n');
        console.log(tableHeaderString[0]);
        console.log(tableHeaderString[1]);
        for (var i = 0; i < result.length; i++) {
            console.log(result[i]);
        }
        console.log(menu);
    };
    csvReader.prototype.splitArrayToChunks = function (array, parts) {
        var copyArray = array.map(function (v) { return v; });
        var result = [];
        for (var i = parts; i > 0; i--) {
            result.push(copyArray.splice(0, Math.ceil(copyArray.length / i)));
        }
        return result;
    };
    return csvReader;
}());
exports.default = csvReader;
var start = 0;
var reader = new csvReader();
var tabellieren = reader.tabellieren(dataName);
var menu = "\nf)irst page, p)revious page, n)ext page, l)ast page, e)xit\n";
console.log("\nPut your CSV file in the same folder where *.js is located. File name must be data.csv\n " + menu);
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Enter your choice: '
});
rl.prompt();
rl.on('line', function (line) {
    tabellieren.then(function (result) {
        var splittedResults = reader.splitArrayToChunks(result, result.length / 3);
        if (result) {
            switch (line.trim()) {
                case 'f':
                    start = 0;
                    reader.displayResults(splittedResults[start]);
                    break;
                case 'p':
                    start = (start - 1) != -1 ? start - 1 : 0;
                    reader.displayResults(splittedResults[start]);
                    break;
                case 'n':
                    start = start + 1 != splittedResults.length ? start + 1 : splittedResults.length - 1;
                    reader.displayResults(splittedResults[start]);
                    break;
                case 'l':
                    start = splittedResults.length - 1;
                    reader.displayResults(splittedResults[start]);
                    break;
                case 'e':
                    rl.close();
                    break;
                default:
                    console.log("We dont recognize '" + line.trim() + "' command");
                    console.log(menu);
                    break;
            }
            rl.prompt();
        }
    });
}).on('close', function () {
    console.log('Have a great day!');
    process.exit(0);
});
//# sourceMappingURL=csvReader.js.map