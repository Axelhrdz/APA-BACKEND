import { apaAccessService } from './aperturasMasivas.playwright.service.js';
import { baldioToggle } from '../../utils/helpers.js';
import dotenv from 'dotenv';


dotenv.config();

const defineAperturas = (jsonData, formData) => {

    // console.log(jsonData);
    // console.log(formData);
    


    let conexionFormat;
    let aperturaFormat;
    let baldioValue;
    // console.log(baldioValue);


    if(formData['baldio'] === 'S') {
        baldioValue = jsonData['Metros cuadrados'];
    } else {
        baldioValue = '0';
    }

    conexionFormat = `N,,,,${formData['conexiones']},${formData['cobros']}`;

    aperturaFormat = `${jsonData['Recaudadora']},${jsonData['Tipo']},${jsonData['Cuenta']},${conexionFormat},${jsonData['Fecha de otorgamiento']},,${formData['tipo_servicio']},${formData['baldio']},${baldioValue},${jsonData['Recamaras']},${jsonData['Banios']}`;
    

    return aperturaFormat;

};


const txtFile = (jsonData, formData) => {
    


    const accountsToProcess = [];

    jsonData.forEach(account => {
       const accountFormat =  defineAperturas(account, formData);
       accountsToProcess.push(accountFormat);
    });
    const txtContent = accountsToProcess.join('\n');

    return txtContent;
}


const aperturasMasivasService = async (req) => {
    const file = req.files.file;
    const formData = req.validatedData;
    let response = {};

    try {
        const jsonData = baldioToggle(file, formData);

        if (jsonData?.status === 400) {
            return jsonData;
        }

        //txt file into variable
        const txtFileOutput = txtFile(jsonData, formData);

        // const aperturasAPAOutput = await aperturasMasivasPlaywright(txtFileOutput, 'https://apa.tlajomulco.gob.mx/');

        const urlAccess = await apaAccessService(
            txtFileOutput, 
            formData, 
            // 'https://apa.tlajomulco.gob.mx/',
            // 'http://172.16.11.58/apa/',
            process.env.APA_BASE_URL
        );


        // console.log(urlAccess);

        if(urlAccess.success && urlAccess.status === 200) {
            response = {
                success: true,
                message: urlAccess.message,
                status: urlAccess.status,
            }
        } else if(!urlAccess.success && urlAccess.status === 502) {
            response = {
                success: false,
                message: urlAccess.message,
                status: urlAccess.status,
                error: urlAccess.error,
            }
        } else if (!urlAccess.success) {
            response = {
                success: false,
                message: 'Error en aperturas masivas service',
                error: urlAccess.error,
                status: 500,
            }
        }

        return response;
        
        
    } catch (error) {
         return {
            success: false,
            message: 'Error en aperturas masivas service',
            error: 'Error en aperturas masivas service',
            status: 500,
         };
    }



    
}

export default aperturasMasivasService;