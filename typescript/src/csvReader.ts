
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

    async tabellieren(csvFile: string) {
        try {
            let convertedFile:any = await this.convertCSVfile(csvFile);

            let tableHeader = Object.keys(convertedFile[0]);
            // ['Name', 'Alter', 'Ort']
    
            let deviderNumbers: number[] = [];
            // [ 7, 5, 9 ]
    
            tableHeader.forEach((header: string) => {
                let numberOfStrings = this.stringLength(convertedFile.map((a:any) => a[header]));
                if(numberOfStrings > header.length) {
                    deviderNumbers.push(numberOfStrings);
                } else {
                    deviderNumbers.push(header.length);
                };
            })
    
            // Create table header
            let tableHeaderString = this.createTableHeader(tableHeader, deviderNumbers);
            
            // Create table data
            let tableData = this.createTableData(tableHeader, convertedFile, deviderNumbers);
    
            let mergedData = tableHeaderString.concat(tableData);

            return mergedData;
        }catch (error) {
            console.error("testGetData: An error occurred: ");
        }

    }

    convertCSVfile(csvFile: string) {
        if(csvFile){
            return new Promise((resolve, reject) => {
            fs.createReadStream(path.join(__dirname, csvFile))
            .pipe(csv())
            .on('data', (data:any) => results.push(data))
            .on('end', () => {
                resolve(results);
                // console.log("RESULTS: ",results);
            })
            });
        }

        //return csvInput;
    }

    stringLength(arrayOfStrings:string[]) {
        if(arrayOfStrings.length != 0) {
            return Math.max(...(arrayOfStrings.map(el => el.toString().length)));
        } else {
            return 0;
        }
      }

    createTableHeader(tableHeader: string[], deviderNumbers: number[]) {

        let string1: string = "";
        let string2: string = "";

        for (let i = 0; i < tableHeader.length; i++) {
            string1 += "" + tableHeader[i] + " ".repeat(deviderNumbers[i] - tableHeader[i].length) + "|";
            string2 += "-".repeat(deviderNumbers[i]) + "+";
        }

        return [string1, string2]
    }

    createTableData(tableHeader: string[], convertedFile: object[], deviderNumbers: number[]) {
        
        let arrayOfStrings:string[] = [] 

        for (let i = 0; i < convertedFile.length; i++) {

            let createdString: string = "";
            let extractedTableRow:any = convertedFile[i];
            for (let j = 0; j < tableHeader.length; j++) {
                let extractedHeaderName = tableHeader[j];
                createdString += "" + extractedTableRow[extractedHeaderName] + " ".repeat(deviderNumbers[j] - extractedTableRow[extractedHeaderName].toString().length) + "|";
            }

            arrayOfStrings.push(createdString);
        }

        return arrayOfStrings
    }

}

const reader = new csvReader();

let tabellieren = reader.tabellieren(dataName);


tabellieren.then(function(result) {
   console.log(result);
})


