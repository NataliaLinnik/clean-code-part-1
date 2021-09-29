"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var csvReader_1 = __importDefault(require("../src/csvReader"));
// mocked data
var csvInput = [
    { Name: 'Paul', Alter: 1, Ort: 'Stuttgart' },
    { Name: 'Max', Alter: 18, Ort: 'München' },
    { Name: 'Phillip', Alter: 19, Ort: 'Berlin' }
];
var tableOutput = [
    "NAME   |ALTER|ORT      |",
    "-------+-----+---------+",
    "Paul   |1    |Stuttgart|",
    "Max    |18   |München  |",
    "Phillip|19   |Berlin   |"
];
var dataName = 'data.csv';
var reader = new csvReader_1.default();
describe('Tabelieren', function () {
    it('Convert CSV file to table', function () {
        var result = reader.tabellieren(dataName);
        expect(result).toBe(tableOutput);
    });
    it('Convert CSV file to array of objects', function () {
        var result = reader.convertCSVfile(dataName);
        expect(result).toBe(csvInput);
    });
});
//# sourceMappingURL=csvReader.test.js.map