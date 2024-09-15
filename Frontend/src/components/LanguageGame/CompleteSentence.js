import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import person from './../../assets/person2.png'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CompletionButtons from "./CompletionButtons";
const CompleteSentence=({data, onComplete})=>{
    const [randomSentence, setRandomSentence]=useState("")
    const [rightAnswer, setRightAnswer] = useState("");
    const [answers,setAnswers]=useState([])
    const [isCompleted, setIsCompleted] = useState(false);
    useEffect(()=>{
        const sentences = data.map((sentence)=>sentence.sentence)
        const answers = data.map((word)=>word.word)
        console.log(sentences)
        if (sentences.length > 0) {
            const answerList = []
            const indexList = []
            while (indexList.length < 3) {
                const randomAnswerIndex = Math.floor(Math.random() * answers.length);
              
                if (!indexList.includes(randomAnswerIndex)) {
                  indexList.push(randomAnswerIndex);
                  answerList.push(answers[randomAnswerIndex]);
                }
              }
            const randomIndex = Math.floor(Math.random() * sentences.length);
            const randomSelectedSentence = sentences[randomIndex];
            const words = randomSelectedSentence.split(" ");
            const randomIndex2 = Math.floor(Math.random() * words.length);
            const newSentence = randomSelectedSentence.replace(words[randomIndex2], "...");
            setRightAnswer(words[randomIndex2]);
            setRandomSentence(newSentence);
            answerList.push(words[randomIndex2]);
            shuffleArray(answerList);
            setAnswers(answerList);
          }
          
        }, [data]);
        console.log(answers)

        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
            }
          };
          const handleCompletion = () =>{
            onComplete();
          }
        const checkAnswer=(answer)=>{
            console.log(answer)
            if(answer == rightAnswer){
                setIsCompleted(true);
                console.log('essa')
            }
        }
    return(
        <Box sx={{width:"100%", height:"100%"}}>
            <h1 style={{ position: "absolute", top: "10vh", left: "6vh", color: "black" }}>Fill the gap in the sentence with correct word</h1>
            <Box sx={{width:"100%", height:"auto"}}>
                <img style={{width: "150px",height: "200px",marginLeft: "50vh", marginTop: "24vh"}} src={person} alt="image of a person"/>
                <TextField disabled variant="standard" value={randomSentence} sx={{width:"70vh",marginTop:"23vh", textAlign:"center",'& .MuiOutlinedInput-input':{textAlign:"center"}}} ></TextField>
            </Box>
            <Box sx={{display:"flex", flexDirection:"column", width:"100%", height:"auto",marginTop:"-15vh"}}>
            {answers.map((answer, index) => (
                <Button
                    key={index}
                    onClick={() => checkAnswer(answer)}
                    sx={{
                    height: "8vh",
                    width: "30vh",
                    marginLeft: "85vh",
                    marginBottom: "2vh",
                    }}
                    variant="outlined"
                    disabled={isCompleted && answer != rightAnswer}
                >
                    {answer}
                </Button>
                ))}
            </Box>
            <CompletionButtons isCompleted={isCompleted} handleCompletion={handleCompletion} />
        </Box>


    )
}

export default CompleteSentence;