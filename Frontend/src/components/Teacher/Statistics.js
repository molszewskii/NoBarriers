import { Box, Card, Grid, Typography } from "@mui/material"
import TestService from "../../services/TestService"
import { useEffect, useState } from "react";

const Statistics=()=>{
    const testService = new TestService();
    const [testResult,setTestResult]=useState([])
    const [userAnswers,setUserAnswers]=useState([]);
    const [correctAnswers,setCorrectAnswers]= useState([]);
    const [questions,setQuestions]=useState([]);

    const teacherId = localStorage.getItem("userId");
    useEffect(()=>{
        testService.getStudentTestResult(teacherId).then((result)=>setTestResult(result));
        
    },[])
    const handleTestResultClick=(id)=>{
        testResult.map((result)=>{
            if(result.testResult.id === id){
                const questions = result.questions.map((question)=>question.questionText)
                const useranswers = result.testResult.userAnswers.map((answer)=> answer.answer);
                const correctanswers = result.testResult.correctAnswers.map((answer)=>answer.correctAnswerText); 
                setCorrectAnswers(correctanswers);
                setQuestions(questions);
                setUserAnswers(useranswers);
            }
        })
    }
    console.log(userAnswers,correctAnswers,questions)
    if(testResult.length === 0){
        return (
            <Box sx={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Typography variant="h5" sx={{color:"black"}}>Nobody has done any of your tests yet...</Typography>
                <Typography variant="h6" sx={{color:"black"}}>If anybody will you'll see their results here</Typography>
            </Box>
        )
    }
    console.log(testResult)
    return(
        <Box sx={{width:"100%",height:"100%",overflow:"auto",'&::-webkit-scrollbar':{display:"none"}}}>
            <Box  className='flashCardBox' sx={{padding:"2vh 10vh"}}>
                  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {testResult.map((result) => (
                      <Grid item xs={2} sm={6} md={4} key={result.testResult.id} onClick={()=>handleTestResultClick(result.testResult.id)}>
                        <Card sx={{
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                            padding:"10px",
                            borderRadius: "16px",
                            transition: "transform 0.3s, background-color 0.3s",
                            '&:hover': {
                                transform: "scale(1.05)",
                                backgroundColor: "#f4f4f4 !important",
                            },
                        }}>
                          <Box p={2}>
                            <Typography variant="h5" sx={{marginBottom:"1vh",color:"rgb(78, 1, 78)"}} color="primary">
                                {result.testName}
                            </Typography>
                            <Typography variant="body2" sx={{marginBottom:"4vh"}} color="textSecondary">
                                Student: {result.userName}
                            </Typography>
                            <Typography variant="h6" color="textSecondary">
                               Result: {result.testResult.score} / {result.testResult.correctAnswers.length}
                            </Typography>
                            <Typography variant="h6" color="textSecondary">
                               Execution date: {result.testResult.dateTaken.substring(0,10)}
                            </Typography>
                        </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
        </Box>
    )
}

export default Statistics