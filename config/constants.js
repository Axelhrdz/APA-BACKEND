import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Base paths (relative to project root)
export const EXCEL_FILE = path.join('tests', 'listado_cartas.xlsx');
// export const ROOT_DIR = path.join(__dirname, '..', '..');
// export const EXCEL_FILE = path.join(__dirname, '..', '..', 'tests', 'listado_cartas.xlsx');
export const TESTS_DIR = path.join('tests');
// export const DOWNLOADS_DIR = path.join(__dirname, '..', '..', 'massive_downloads');
// export const PROGRESS_DIR = path.join(__dirname, '..', '..', 'progress');
// export const LOGS_DIR = path.join(__dirname, '..', '..', 'logs');

// Account files
export const ACCOUNTS_FILE = path.join('tests', 'accounts_massive.json');


// export const ACCOUNTS_FIXED_FILE = path.join(__dirname, '..', '..', 'tests', 'accounts_massive_fixed.json');
// export const ACCOUNTS_BACKUP_FILE = path.join(__dirname, '..', '..', 'tests', 'accounts_massive_backup.json');

// Scraping configuration ------------------------------------------------------------
export const SCRAPING_CONFIG = {
    BATCH_SIZE: 100,
    DELAY_BETWEEN_ACCOUNTS: 1500,
    DELAY_BETWEEN_BATCHES: 30000,
    MAX_RETRIES: 2,
    TIMEOUT: 600000, // 10 minutes
    PROGRESS_SAVE_INTERVAL: 50, // Save progress every 50 accounts
    RESUME_ENABLED: true
};

// Login credentials ------------------------------------------------------------
export const LOGIN = {
    USERNAME: 'aihdez',
    PASSWORD: 'aihdez'
};

// Base URL ------------------------------------------------------------
export const BASE_URL = [
    'http://172.16.11.58/apa/',
    'http://services.tlajomulco.gob.mx:1080/apa/'
];