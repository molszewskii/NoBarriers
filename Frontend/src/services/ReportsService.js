import axios from "axios"

class ReportsService{
    constructor(){
        this.baseUrl = "https://localhost:7258/api/ProblemReports"
    }

    async GetAllReports(teacherId){
        const response = await axios.get(`${this.baseUrl}/getAllReports/${teacherId}`);
        return response.data;
    }

    async GetReportDetails(reportId){
        const response = await axios.get(`${this.baseUrl}/getReport/${reportId}`);
        return response.data;
    }

    async SendAnswerToTheReport(formData){
        try{
            const response = await axios.post(`${this.baseUrl}/responseToReport`,JSON.stringify(formData),{
            headers:{
                'Content-Type':"application/json"
            }});
            console.log(response.data)
        }catch(error){
            throw error;
        }
    }

    async GetAllAnswers(userId){
        const response = await axios.get(`${this.baseUrl}/getAllAnswers/${userId}`);
        return response.data;
    }
}

export default ReportsService;
