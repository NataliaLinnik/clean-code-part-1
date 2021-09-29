
const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')
const results: string[] = [];

const dataName = 'data.csv'

const csvInput = [
    {Name: 'Paul', Alter: 1, Ort: 'Stuttgart'},
    {Name: 'Max', Alter: 18, Ort: 'München'},
    {Name: 'Phillip', Alter: 19, Ort: 'Berlin'}
  ]

const csvInput2 = [
    "NAME; ALTER; ORT",
    "PAUL; 17; MÜNCHEN",
    "MAX; 46; KÖLN"]

export default class csvReader {

    // Note: 
    // Instead of providing file like > node csvReader.js file.csv
    // We could just make as requirement that file with some name
    // is in same folder as our csvReader.js app
    // If we had more time, perhaps we can consider a solution where we
    // will pass our file to csvReader.js app 

    tabellieren(csvFile: string) {

        let convertedFile = this.convertCSVfile(csvFile);

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

        const string1 = "+--------+-------+-----------+"
        const string2 = "|Name    |Alter  |Ort        |"
        const string3 = "|Paul    |17     |Stuttgart  |"
        const string4 = "|        |       |           |"

        return csvFile ? string1 + '\n' + string2 + '\n' + string1 + '\n'  + string3 + '\n' + string1 :  string1 + '\n' + string4 + '\n' + string1;
    }

    convertCSVfile(csvFile: string) {
        if(csvFile){
            fs.createReadStream(path.join(__dirname, csvFile))
            .pipe(csv())
            .on('data', (data:any) => results.push(data))
            .on('end', () => {
                return results;
                console.log("RESULTS: ",results);
            })
        }

        return csvInput;
    }

}

const reader = new csvReader();

console.log("----- CSV file exists ----");
console.log(reader.tabellieren(dataName));
console.log("\n")
console.log("----- CSV file does not exist ----");
console.log(reader.tabellieren(""));
