"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Calculator_1 = __importDefault(require("../src/Calculator"));
describe('calculate', function () {
    it('add', function () {
        var result = Calculator_1.default.Sum(5, 2);
        expect(result).toBe(7);
    });
    it('substract', function () {
        var result = Calculator_1.default.Difference(5, 2);
        expect(result).toBe(3);
    });
});
//# sourceMappingURL=Calculator.test.js.map