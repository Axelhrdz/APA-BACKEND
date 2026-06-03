import { baldioToggle } from '../../utils/helpers.js';

const ExcelandData = (req) => {
    const file = req.files.file;
    const formData = req.body;

    const jsonData = baldioToggle(file, formData);

    if (jsonData?.status === 400) {
        return jsonData;
    }

    return {
        jsonData: jsonData,
        message: 'Sucess from ExcelandData',
        status: 200
    }
}


const previewExcelService = async (req) => {
    try {
        // console.log('sucess from preview excel service');
        const result = ExcelandData(req);
        console.log(result);

        if (result.status === 400) {
            return result;
        }

        return {
            message: 'Sucess from preview excel service',
            jsonData: result,
            status: 200
        };

        
    } catch (error) {
        console.error('Error in previewExcelService', error);
        return {
            message: 'Error in previewExcelService',
            error: error.message,
            status: 500
        };
    }
}


export default previewExcelService;