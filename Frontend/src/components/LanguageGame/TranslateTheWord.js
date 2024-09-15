import { Alert, Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import person from './../../assets/person.png'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CompletionButtons from "./CompletionButtons";
const TranslateTheWord=({data, onComplete, onUpdateData})=>{
    const [randomWord, setRandomWord] = useState("");
    const [translation, setTranslation] = useState("")
    const [isCompleted, setIsCompleted] = useState(false);
    const [answers, setAnswers] = useState([])
    console.log(data);
    useEffect(()=>{
        const word = data.slice(0,1).map((item)=>item.word);
        const translation = data.slice(0,1).map((item)=>item.translation);
        const answers = data.slice(0,4).map((item)=>item.translation)
        console.log(translation)
        setRandomWord(word);
        setTranslation(translation)
        shuffleArray(answers)
        setAnswers(answers);
    },[])
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      };
    const handleCompletion = () =>{
        const newData = data.filter((item)=> item.word != randomWord)
        console.log(newData)
        onUpdateData(newData);
        onComplete();
      }
    const checkAnswer=(answer)=>{
        console.log(answer)
        if(answer == translation){
            setIsCompleted(true);
            console.log('essa')
        }
    }
    return(
        <Box sx={{width:"100%", height:"100%"}}>
            <h1 style={{ position: "absolute", top: "10vh", left: "6vh", color: "black" }}>Choose the right translation</h1>
            <Box sx={{width:"100%", height:"auto"}}>
                <img style={{width: "200px",height: "200px",marginLeft: "50vh", marginTop: "24vh"}} src={person} alt="image of a person"/>
                <TextField disabled variant="outlined" sx={{marginTop:"23vh", marginLeft:"4vh", textAlign:"center",'& .MuiOutlinedInput-input':{textAlign:"center"}}} value={randomWord}></TextField>
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
                    disabled={isCompleted && answer != translation}
                >
                    {answer}
                </Button>
                ))}
            </Box>
            <CompletionButtons isCompleted={isCompleted} handleCompletion={handleCompletion} />
        </Box>
    )
}

export default TranslateTheWord;