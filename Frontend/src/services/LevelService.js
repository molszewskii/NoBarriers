import axios from "axios";

class LevelService{
    constructor(){
        this.baseUrl = "https://localhost:7258"
        this.accessToken = window.localStorage.getItem("accessToken");
    }
    getLevelData(levelId, languageId){
        try{
            return axios.get(`${this.baseUrl}/getDataLevel/${levelId}/${languageId}`,{
                headers:{
                    Authorization: `Bearer ${this.accessToken}`,
                }
            })
            .then((response => response.data))
            
        }catch(error){
            throw error;
        }  
    }
}
export default LevelService;