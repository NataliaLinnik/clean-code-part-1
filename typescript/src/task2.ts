
const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')
const results: string[] = [];
let tableHeaderString: string[] = [];

import * as readline from 'readline';

const dataName = 'data.csv'

const files = [
    {
      "folderName": "src/components/",
      "fileName": "SampleComponent2.tsx",
      "content": [
        "import React from 'react'",
        "",
        "const test = a",
        "// a commented line"
      ]
    },
    {
      "folderName": "src/components/",
      "fileName": "SampleComponent1.tsx",
      "content": [
        "import React from 'react'",
        "",
        "const test = a",
        "// a commented line",
        "const isYammerPost = (type: ContentType) => {",
        "switch (type) {",
        "case ContentType.ANNOUNCEMENT:",
        "case ContentType.UPDATE:",
        "case ContentType.QUESTION:",
        "  return true",
        "default:",
        "  return false"
      ]
    },
    {
      "folderName": "src/services/",
      "fileName": "SampleService.ts",
      "content": [
        "import React from 'react'",
        "",
        "const test = a",
        "      // a commented line"
      ]
    }
  ]


export default class filesLocCounter {


    async getFileContent(files: any[]) {

        let tlocOfAll = 0;
        let totalLinesOfAll = 0;

        console.log('files: ', files);

        files.forEach(file => {
            let tloc = this.fileContentReader(file.content);
            let totalLines = file.content.length;

            tlocOfAll += tloc;
            totalLinesOfAll += totalLines;

            console.log('File path: ', file.folderName + file.fileName)
            console.log('   TLOC: ', tloc);
            console.log('   Total Lines: ', totalLines);
        })
        console.log('************************');
        console.log('Total:');
        console.log('  LOC: ', tlocOfAll);
        console.log('  lines: ', totalLinesOfAll);
    }


    fileContentReader(content: any[]) {
        let counter = 0;
        // Step 1: Funciton that will return us true/false if our condition is ok
        content.forEach(line => {
            if(this.isCodeLineValid(line)){
                counter ++
            }
        })
        return counter;
    }

    isCodeLineValid(line: string) {

        if(line && !this.isCodeLineisComment(line)) {
            return true;
        }
        return false;
    }

    isCodeLineisComment(line: string): boolean {
        line = line.trim();
        if(line.charAt(0) === '/' && line.charAt(1) === '/'){
            return true;
        } 
        return false;
    }
}

// THIS IS THE STARTING POINT
const counter = new filesLocCounter();

counter.getFileContent(files);
