import csvReader from '../src/csvReader';

const string1 = "+--------+-------+-----------+"
const string2 = "|Name    |Alter  |Ort        |"
const string3 = "|Paul    |17     |Stuttgart  |"
const string4 = "|        |       |           |"

// mocked data
const dataName = 'data.csv'

describe('Tabelieren', function() {

  it('Tabelieren_null_empty-table', function() {
    let reader = new csvReader();
    let result = reader.Tabelieren('');
    let expectedResult = string1 + '\n' + string4 + '\n' + string1;
    expect(result).toBe(expectedResult);
  });

  it('Tabelieren_data_table-with-data', function() {
    let reader = new csvReader();
    let result = reader.Tabelieren(dataName);
    let expectedResult = string1 + '\n' + string2 + '\n' + string1 + '\n'  + string3 + '\n' + string1;
    expect(result).toBe(expectedResult);
  });

});
