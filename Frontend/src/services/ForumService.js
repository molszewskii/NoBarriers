import axios from "axios";
class ForumService{
    constructor(){
        this.baseUrl = "https://localhost:7258/api/Forum"
    }

    async getAllForumQuestions(){
        return await axios.get(`${this.baseUrl}/getAllPosts`).then((response)=>response.data);
    }

    async addComment(authorId, description, questionId){
        try{
            const data = await axios.post(`${this.baseUrl}/addComment`, JSON.stringify({
                descritpion : description,
                authorId : authorId,
                forumQuestionId : questionId
            }),{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            console.log(data);
        }catch(error){
            throw error;
        }   
    }
    async deleteComment(commentId){
        try{
            const response = await axios.delete(`${this.baseUrl}/deleteComment/${commentId}`);
            return response.data
        }catch(error){
            throw error;
        }
    }
    async deleteQuestion(questionId){
        try{
            const response = await axios.delete(`${this.baseUrl}/deleteQuestion/${questionId}`);
            return response.data;
        }catch(error){
            throw error;
        }
    }
    async editComment(commentId, updatedDescription) {
        try {
          const data = await axios.patch(
            `${this.baseUrl}/editComment/${commentId}`,
            JSON.stringify({
              descritpion: updatedDescription,
              authorId:"",
            }),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(data);
        } catch (error) {
          throw error;
        }
      }
      async editQuestion(questionId, updatedTitle, updatedDescription) {
        try {
          const data = await axios.put(
            `${this.baseUrl}/editQuestion/${questionId}`,
            JSON.stringify({
              title: updatedTitle,
              description: updatedDescription,
              authorId:"",
            }),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(data);
        } catch (error) {
          throw error;
        }
      }
      async addQuestion(title,description,authorId){
        try{
            const data = await axios.post(`${this.baseUrl}/addQuestion`,JSON.stringify({
                title : title,
                description : description,
                authorId : authorId
            }),{
                headers:{
                    'Content-Type':"application/json"
                }
            })
            console.log(data)
        }catch(error){
            throw error;
        }
            
      }
}
export default ForumService