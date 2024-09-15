import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const TestResults = ({ result, correctAnswers, savedAnswers, questions, teacherId}) => {
    console.log(correctAnswers)
    console.log(savedAnswers)
    console.log(result)
    const {id} = useParams();
    const navigate = useNavigate();
    console.log(id)
    const userId = localStorage.getItem("userId")
    console.log(userId)
    const [userAnswers,setUserAnswers]=useState([])
    const [corAnswers,setcorrectAnswers]=useState([])
    const [reportText, setReportText]=useState("")
    useEffect(()=>{
        const useranswers = savedAnswers.map((answer) => ({
            questionId: answer.questionId,
            answer: answer.selectedOption,
        }));
        const correctanswers = correctAnswers.map((answer)=>({
            questionId : answer.questionId,
            correctAnswerText: answer.optionText
        }))
        console.log(useranswers)
        console.log(correctanswers)
        setUserAnswers(useranswers);
        setcorrectAnswers(correctanswers)
    },[savedAnswers,correctAnswers])
    if(userAnswers.length === 0 || correctAnswers.length === 0 || questions.length === 0){
        return null;
    }
    
    const saveTestResults = async () => {
        const date = new Date().toISOString()
        console.log(result)
        const testResult = {
            testId: parseInt(id),
            userId: userId,
            score: parseInt(result),
            userAnswers: userAnswers,
            correctAnswers: corAnswers,
            dateTaken: date
        };
        if(reportText !== ""){
            console.log("Dane:" + userId,reportText,date,teacherId,id)
            const reportData = {
                userId: userId,
                description: reportText,
                reportDate: date,
                recipientId: teacherId,
                testId : id
            }
            try {
                    const data = await axios.post('https://localhost:7258/api/ProblemReports/report', JSON.stringify(reportData), {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                console.log(data)
                }
            catch (error) {
                console.log(error);
            }

        }
        console.log(userAnswers)
        console.log(correctAnswers)
        console.log('Dane do wysłania:', JSON.stringify(testResult));
        try {
            const response = await axios.post('https://localhost:7258/api/Test/submitTest', JSON.stringify(testResult), {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Wystąpił błąd podczas zapisywania wyników testu', error);
        
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
        
                if (error.response.data && error.response.data.errors) {
                    console.error('Validation errors:', error.response.data.errors);
                }
            } else if (error.request) {
                console.error('No response received from the server:', error.request);
            } else {
                console.error('Error setting up the request or other error:', error.message);
            }
        }
        navigate("/tests");
        
    };
    return (
        <Box sx={{ width: '80%', mx: 'auto', mt: 2, mb: 4 }}>
          <Card raised>
            <CardContent sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant="h4" gutterBottom>
                Test Result
              </Typography>
              <Typography variant="h6" gutterBottom>
                Your Score: {result} / {correctAnswers.length}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {result === correctAnswers.length ? "Congratulations! You answered all questions correctly." : "Keep practicing! Review the correct answers below."}
              </Typography>
            </CardContent>
            <Box sx={{ 
              maxHeight: '28vh', 
              overflowY: 'auto', 
              '&::-webkit-scrollbar': {
                width: '0.4em'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,.1)',
                borderRadius: '4px'
              }
            }}>
              {questions.map((question, index) => (
                <Box key={index} sx={{ borderBottom: 1, borderColor: 'divider', p: 2, bgcolor: userAnswers[index].answer === correctAnswers[index].optionText ? 'success.main' : 'error.main', color: 'common.white' }}>
                  <Typography variant="subtitle1">
                    Question {index + 1}: {question}
                  </Typography>
                  <Typography variant="body2">
                    Your answer: {userAnswers[index].answer}
                  </Typography>
                  <Typography variant="body2">
                    Correct answer: {correctAnswers[index].optionText}
                  </Typography>
                </Box>
              ))}
            </Box>
            <CardContent>
              <TextField 
                fullWidth 
                variant="outlined" 
                label="Report" 
                value={reportText} 
                onChange={(e) => setReportText(e.target.value)} 
                margin="normal"
              />
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={saveTestResults}
                >
                  Finish
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      );
};

export default TestResults;
