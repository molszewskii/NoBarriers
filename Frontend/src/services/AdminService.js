import axios from "axios"
class AdminService{
    constructor(){
        this.baseUrl = "https://localhost:7258/api/Admin"
        this.accessToken = window.localStorage.getItem("accessToken");
    }

    getAllUsers(){
        console.log(this.accessToken)
        try{
            return axios.get(`${this.baseUrl}/getAllUsers`,{
                headers:{
                    Authorization: `Bearer ${this.accessToken}`,
                }
            })
            .then((response => response.data))
            
        }catch(error){
            throw error;
        }  
    }
    async GetItems(modeName,languageId){
            try{
                if(modeName === 'levels'){
                    return await axios.get(`${this.baseUrl}/getAllLevels/${languageId}`,{
                        headers:{
                            Authorization: `Bearer ${this.accessToken}`,
                        }
                    })
                    .then((response)=>response.data)
                }else{
                    return await axios.get(`${this.baseUrl}/${modeName}`,{
                        headers:{
                            Authorization: `Bearer ${this.accessToken}`,
                        }
                    })
                    .then((response)=>response.data)
                }
            }catch(error){
                throw error;
            }
    }
    async DeleteItem(modeName, itemId){
            try{
                const response = await axios.delete(`${this.baseUrl}/${modeName}/${itemId}`);
                return response.data;
            }catch(error){
                throw error;
            }
    }
    async GetItem(id,modeName,langaugeId){
        try{
            if(modeName === 'levels'){
                console.log(modeName,id,langaugeId)
                return await axios.get(`${this.baseUrl}/${modeName}/${id}/${langaugeId}`,{
                    headers:{
                        Authorization: `Bearer ${this.accessToken}`,
                    }
                })
                .then((response)=>response.data)
            }
            else{
                return await axios.get(`${this.baseUrl}/${modeName}/${id}`,{
                    headers:{
                        Authorization: `Bearer ${this.accessToken}`,
                    }
                })
                .then((response)=>response.data)
            }
        }catch(error){
            throw error;
        }
    }
    async EditItem(id,updatedName, updatedPoints,modeName){
        try{
            if(modeName === 'achievements'){
                const data = await axios.put(
                    `${this.baseUrl}/${modeName}/${id}`,
                    JSON.stringify({
                        name: updatedName,
                        maxValue: updatedPoints
                    }),
                    {
                        headers:{
                            Authorization: `Bearer ${this.accessToken}`,
                            "Content-Type": "application/json",
                        }
                    }
                )
            }
            else if(modeName === 'levels'){
                const data = await axios.put(
                    `${this.baseUrl}/${modeName}/${id}`,
                    JSON.stringify({
                        name: updatedName,
                    }),
                    {
                        headers:{
                            Authorization: `Bearer ${this.accessToken}`,
                            "Content-Type": "application/json",
                        }
                    }
                )
            }
        }catch (error) {
            throw error;
        }
    }
    async AddLevelData(levelId, word,translation,sentence,sentenceTranslation, langaugeId){
        try{
            await axios.post(`${this.baseUrl}/leveldata`,JSON.stringify({
                word: word,
                translation : translation,
                sentence : sentence,
                sentenceTranslation : sentenceTranslation,
                levelId : levelId,
                languageId : langaugeId
            }),{
                headers:{
                    Authorization: `Bearer ${this.accessToken}`,
                    'Content-Type':"application/json"
                }
            })
        }catch(error){
            throw error;
        }
        
    }
    async AddLevelDataGrammar(levelId, theoryValue,ruleValue,exampleValue,exerciseValue,exerciseSolutionValue,selectedExerciseType, langaugeId){
        console.log(levelId, theoryValue,ruleValue,exampleValue,exerciseValue,exerciseSolutionValue,selectedExerciseType, langaugeId)
        try{
            await axios.post(`${this.baseUrl}/leveldatagrammar`,JSON.stringify({     
                theory : theoryValue,
                rule: ruleValue,
                example : exampleValue,
                exercise : exerciseValue,
                exerciseSolution : exerciseSolutionValue,
                exerciseType : selectedExerciseType,
                levelId : levelId,
                languageId : langaugeId
            }),{
                headers:{
                    Authorization: `Bearer ${this.accessToken}`,
                    'Content-Type':"application/json"
                }
            })
        }catch(error){
            throw error;
        }
        
    }
    async EditLevelData(id,updatedData){
        console.log(updatedData)
        try{
                const data = await axios.put(
                    `${this.baseUrl}/leveldata/${id}`,
                    JSON.stringify({
                        word: updatedData.word,
                        translation : updatedData.translation,
                        sentence : updatedData.sentence,
                        sentenceTranslation : updatedData.sentenceTranslation,
                        levelId : updatedData.levelId
                    }),
                    {
                        headers:{
                            Authorization: `Bearer ${this.accessToken}`,
                            "Content-Type": "application/json",
                        }
                    }
                )
                console.log(data)
        }catch (error) {
            throw error;
        }
    }
    async EditLevelDataGrammar(id,updatedData){
        console.log(updatedData)
        try{
                const data = await axios.put(
                    `${this.baseUrl}/leveldatagrammar/${id}`,
                    JSON.stringify({
                        word: updatedData.word,
                        translation : updatedData.translation,
                        sentence : updatedData.sentence,
                        sentenceTranslation : updatedData.sentenceTranslation,
                        levelId : updatedData.levelId,
                        theory : updatedData.theory,
                        rule: updatedData.rule,
                        example : updatedData.example,
                        exercise : updatedData.exercise,
                        exerciseSolution : updatedData.exerciseSolution,
                        exerciseType : updatedData.exerciseType,
                        levelId : updatedData.levelId,
                    }),
                    {
                        headers:{
                            Authorization: `Bearer ${this.accessToken}`,
                            "Content-Type": "application/json",
                        }
                    }
                )
                console.log(data)
        }catch (error) {
            throw error;
        }
    }
    async DeleteLevelData(id){
        try{
            const response = await axios.delete(`${this.baseUrl}/leveldata/${id}`);
            return response.data;
        }catch(error){
            throw error;
        }
    }
    async AddItem(name,points,description,modeName,categoryId){
        try{
            if(modeName === 'achievements'){
                await axios.post(`${this.baseUrl}/${modeName}`,JSON.stringify({
                    name : name,
                    maxValue : points
                }),{
                    headers:{
                        Authorization: `Bearer ${this.accessToken}`,
                        'Content-Type':"application/json"
                    }
                })
            }
            else if(modeName === 'levels'){
                await axios.post(`${this.baseUrl}/${modeName}`,JSON.stringify({
                    name : name,
                    description : description,
                    categoryId : categoryId
                }),{
                    headers:{
                        Authorization: `Bearer ${this.accessToken}`,
                        'Content-Type':"application/json"
                    }
                })
            }
        }catch(error){
            throw error;
        }
            
      }

}
export default AdminService;