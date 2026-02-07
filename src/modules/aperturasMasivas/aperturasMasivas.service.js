import * as XLSX from 'xlsx';


const txtFile = (jsonData) => {
    let textChainFormat = '';
    const accountsToProcess = [];

    jsonData.forEach(account => {
        textChainFormat = `${account['Recaudadora']},${account['Tipo']},${account['Cuenta']},N,,,,4,1,${account['Fecha de otorgamiento']},,H,N,0,${account['Recamaras']},${account['Banios']}`;
        accountsToProcess.push(textChainFormat);
    });
    const txtContent = accountsToProcess.join('\n');

    return txtContent;
}

const aperturasMasivasService = async (req) => {
    const file = req.files.file;
    const formData = req.body;

    try {
        //read file as buffer
        // const fileBuffer = file.data.toString('base64');
        const workbook = XLSX.read(file.data, {type: 'buffer'});

        //get first worksheet name
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        //convert to an array of json obejcts
        const jsonData = XLSX.utils.sheet_to_json(worksheet);


        //txt file into variable
        const txtFileOutput = txtFile(jsonData);
        console.log('file output from service');
        console.log(txtFileOutput);


        return txtFileOutput;
        
    } catch (error) {
        console.error('Error in aperturas masivas service', error);
        return {
            message: 'Error in aperturas masivas service',
            error: error.message
        }
    }
}

export default aperturasMasivasService;