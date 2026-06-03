import * as XLSX from 'xlsx';

const excelSerialToDate = (serial) => {
    const date = new Date(Math.round((serial - 25569) * 86400 * 1000));
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    return `${day}/${month}/${date.getUTCFullYear()}`;
};

export const formatExcelDate = (value) => {
    if (value == null || value === '') return value;

    if (typeof value === 'string') return value;

    if (value instanceof Date) {
        const day = String(value.getUTCDate()).padStart(2, '0');
        const month = String(value.getUTCMonth() + 1).padStart(2, '0');
        return `${day}/${month}/${value.getUTCFullYear()}`;
    }

    if (typeof value === 'number') {
        return excelSerialToDate(value);
    }

    return value;
};

export const baldioToggle  = (file, formData) => {
    console.log('baldio toggle helper working');

    let sheetName;
        const workbook = XLSX.read(file.data, {type: 'buffer'});
    
        if(formData['baldio'] === 'S') {
            sheetName = workbook.SheetNames[1];
        } else if(formData['baldio'] === 'N') {
            sheetName = workbook.SheetNames[0];
        } else {
            return {
                message: 'Error in baldioToggle',
                error: 'Baldio is not selected',
                status: 400
            }
        }
        
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet).map((row) => ({
            ...row,
            'Fecha de otorgamiento': formatExcelDate(row['Fecha de otorgamiento']),
        }));
    
        return jsonData;
    
}