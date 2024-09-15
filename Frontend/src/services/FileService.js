import axios from "axios";

class FileService{
    constructor(){
        this.baseUrl = 'https://localhost:7258/api/File'
    }
    async addFile(requestData, userId) {
        try {
            const response = await axios.post(`${this.baseUrl}/upload/${userId}`, requestData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(response);
            return response;
        } catch (error) {
            return error.response;
        }
    }

    async GetFileByName(fileName){
        try{
            const response = await axios.get(`${this.baseUrl}/download-by-name/${fileName}`, {
                responseType: 'blob',
              });
            console.log(response)
        }catch(error){
            throw error;
        }
    }
}

export default FileService