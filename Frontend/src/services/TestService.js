import axios from "axios";

class TestService {
    constructor(){
        this.baseUrl="https://localhost:7258/api/Test";
    }
    async getAllTest(userId){
        const response = await axios.get(`${this.baseUrl}/getTests/${userId}`);
        return response.data;
    }

    async getTestDetails(testId){
        const response = await axios.get(`${this.baseUrl}/getTestDetails/${testId}`);
        return response.data;
    }
    async getAllTeachers(){
        const response = await axios.get(`https://localhost:7258/api/User/getAllTeachers`);
        return response.data;
    }
    async getAllTests(){
        const response = await axios.get(`${this.baseUrl}/getAllTests`);
        return response.data;
    }

    async getStudentTestResult(teacherId){
        const response = await axios.get(`${this.baseUrl}/getTestResult/${teacherId}`);
        return response.data;
        }
}

export default TestService