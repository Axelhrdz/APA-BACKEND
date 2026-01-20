import { v4 as uuidv4 } from 'uuid';
import excelService from '../services/excelService.js';
import accountService from '../services/accountService.js';
import scraperService from '../services/scraperService.js';
import fs from 'fs';
import path from 'path';
import { ACCOUNTS_FILE, DOWNLOADS_DIR, PROGRESS_DIR, LOGS_DIR } from '../config/constants.js';

// Exports accounts from excel
async function extractAccounts(req, res) {
    try{
        const result = await excelService.extractAccountsFromExcel();
        res.status(200).json({ message: 'Accounts extracted successfully', data: result });
    }
    catch(error){
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}