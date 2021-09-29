import csvReader from '../src/csvReader';

// mocked data
const csvInput = [
  {Name: 'Paul', Alter: 1, Ort: 'Stuttgart'},
  {Name: 'Max', Alter: 18, Ort: 'München'},
  {Name: 'Phillip', Alter: 19, Ort: 'Berlin'}
]

const tableOutput = [
  "NAME   |ALTER|ORT      |",
  "-------+-----+---------+",
  "Paul   |1    |Stuttgart|",
  "Max    |18   |München  |",
  "Phillip|19   |Berlin   |"
]

const dataName = 'data.csv'
const reader = new csvReader();
describe('Tabelieren', function() {

  it('Convert CSV file to table', function() {
    let result = reader.tabellieren(dataName);
    expect(result).toBe(tableOutput);
  });

  it('Convert CSV file to array of objects', function() {
    let result = reader.convertCSVfile(dataName);
    expect(result).toBe(csvInput);
  });

});
