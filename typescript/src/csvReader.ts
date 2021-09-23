
const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')
const results: string[] = [];

const dataName = 'data.csv'

export default class csvReader {

    Tabelieren(csvFile: string) {

        if(csvFile){
            fs.createReadStream(path.join(__dirname, csvFile))
            .pipe(csv())
            .on('data', (data:any) => results.push(data))
            .on('end', () => {
                // console.log(results);
            })
        } 

        const string1 = "+--------+-------+-----------+"
        const string2 = "|Name    |Alter  |Ort        |"
        const string3 = "|Paul    |17     |Stuttgart  |"
        const string4 = "|        |       |           |"

        return csvFile ? string1 + '\n' + string2 + '\n' + string1 + '\n'  + string3 + '\n' + string1 :  string1 + '\n' + string4 + '\n' + string1;
    }

}

const reader = new csvReader();

console.log("----- CSV file exists ----");
console.log(reader.Tabelieren(dataName));
console.log("\n")
console.log("----- CSV file does not exist ----");
console.log(reader.Tabelieren(""));
