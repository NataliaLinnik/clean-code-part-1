"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var csvReader_1 = __importDefault(require("../src/csvReader"));
var string1 = "+--------+-------+-----------+";
var string2 = "|Name    |Alter  |Ort        |";
var string3 = "|Paul    |17     |Stuttgart  |";
var string4 = "|        |       |           |";
// mocked data
var dataName = 'data.csv';
describe('Tabelieren', function () {
    it('Tabelieren_null_empty-table', function () {
        var reader = new csvReader_1.default();
        var result = reader.Tabelieren('');
        var expectedResult = string1 + '\n' + string4 + '\n' + string1;
        expect(result).toBe(expectedResult);
    });
    it('Tabelieren_data_table-with-data', function () {
        var reader = new csvReader_1.default();
        var result = reader.Tabelieren(dataName);
        var expectedResult = string1 + '\n' + string2 + '\n' + string1 + '\n' + string3 + '\n' + string1;
        expect(result).toBe(expectedResult);
    });
});
//# sourceMappingURL=csvReader.test.js.map