import axios from "axios";

class FlashCardsService{
    constructor(){
        this.baseUrl = 'https://localhost:7258/api/FlashCard'
    }

    getAllBoxes(languageId){
        try{
            return axios.get(`${this.baseUrl}/getAllBoxes/${languageId}`)
            .then((response => response.data))
        }catch(error){
            throw error;
        }   
    }

    getBoxesFlashCards(boxId){
        try{
            return axios.get(`${this.baseUrl}/${boxId}/cards`)
            .then((response)=>response.data)
        }catch(error){
            throw error;
        }
    }

    createBoxWithFlashCards(requestData){
            axios.post(`${this.baseUrl}/createFlashCardBox`,JSON.stringify(requestData) ,{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then((response)=>{
                console.log("Utworzono box", response.data)
            })
            .catch((error)=>{
                console.error("Błąd",error);
            })
    }

    getMyBoxes(userId){
        try{
            return axios.get(`${this.baseUrl}/getMyBoxes/${userId}`)
            .then((response)=> response.data)
        }catch(error){
            throw error;
        }
    }

    addBoxToLiked(boxId, userId){
        console.log(boxId)
        axios.post(`${this.baseUrl}/addBoxToFav/${boxId}/${userId}`,{
            headers:{
                "Content-Type":"application/json"
            }
        }).then((response)=>console.log("Dodano box do ulubionych",response.data))
        .catch((error)=>console.error("Błąd",error))
    }

    getLikedBoxes(userId){
        try{
            return axios.get(`${this.baseUrl}/getFavBoxes/${userId}`)
            .then((response)=>response.data)
           
        }catch(error){
            throw error;
        }
    }

}

export default FlashCardsService