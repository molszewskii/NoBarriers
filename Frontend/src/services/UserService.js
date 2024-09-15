import axios from "axios";

let userData = null;

export const loginUser = async (userEmail, userPassword) => {
    try {
        const response = await axios.post(
            'https://localhost:7258/api/Auth/login',
            {
                Email: userEmail,
                Password: userPassword
            },
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        console.log(response.data);
        const userData = {
            userId: response.data.userId,
            username: response.data.firstName,
            surname: response.data.lastName,
            course: response.data.course,
            role: response.data.role
        };
        
        return userData;
    } catch (error) {
        throw error;
    }
}


export const addProgress = async (userId, progress , achievementName, maxValue)=>{
    try{
        const data = await axios.post(`https://localhost:7258/addUserAchievement/${userId}/${progress}`, JSON.stringify({
            Name : achievementName,
            MaxValue: maxValue
        }),{
            headers:{
                "Content-Type":"application/json"
            }
        })
        console.log(data);
        return data;
    }catch(error){
        throw error;
    }
}
export const addNewCompletedLevel = async (userId, levelId)=>{
    try{
        console.log(userId, levelId)
        const data = await axios.post(`https://localhost:7258/addNewCompletedLevel/${userId}/${levelId}`,{
            headers:{
                "Content-Type":"application/json"
            }
        }
        )
    }catch(error){
        throw error;
    }
        
}
export const getCompletedUserLevels = (userId)=>{
    try{
        return axios.get( `https://localhost:7258/getAllCompletedUserLevels/${userId}`).then((response)=>response.data)
    }catch(error){
        throw error;
    }
} 

export const getUserData = ()=>{
    const userDataJSON = window.localStorage.getItem("userData");
  if (userDataJSON) {
    return JSON.parse(userDataJSON);
  }
  return null; 
}