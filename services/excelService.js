import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { EXCEL_FILE, TESTS_DIR, ACCOUNTS_FILE } from '../config/constants.js';
import { json } from 'stream/consumers';


// Extract accounts from excel, by poblacion
async function extractAccountsFromExcel(){

    try{
        // Check if tests directory exists, if not create it
        if(!fs.existsSync(TESTS_DIR)){
            fs.mkdirSync(TESTS_DIR, { recursive: true });
        }
    
        //Check if excel file exists, if not, throw error
        if(!fs.existsSync(EXCEL_FILE)){
            throw new Error('Excel file not found');
            // return {
            //     success: false,
            //     accountsByPoblacion: {},
            //     count: 0,
            //     error: `Excel file not found: ${EXCEL_FILE}`
            //   };
        }

        //read excel file
        const workbook = XLSX.readFile(EXCEL_FILE);
        console.log(`Readingf excel file... ${EXCEL_FILE}`);

        //get first sheet name
        const sheetName = workbook.SheetNames[0];
        console.log(`Sheet name: ${sheetName}`);

        //get the worksheet
        const worksheet = workbook.Sheets[sheetName];
        console.log(`current worksheet: ${worksheet}`);

        //convert to json
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log(`worksheet into json: ${jsonData}`);
        console.log(jsonData.length);


        const accountsByPoblacion = {};
        const allAccounts = []


        jsonData.forEach((row, index) => {
            // console.log(String(row.APA));
            // console.log(typeof String(row.APA));
            // allAccounts.push(String(row.APA));

            
            
        })

        console.log(allAccounts);
        const number = '12345';

        number.shift('0')
        
        // fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(allAccounts, null, 2));
    }
    catch(error){
        throw new Error(`Error extracting accounts from excel: ${error.message}`);
    }
}

extractAccountsFromExcel().then((result) => {
    console.log(result);
}).catch((error) => {
    console.error(error);
});