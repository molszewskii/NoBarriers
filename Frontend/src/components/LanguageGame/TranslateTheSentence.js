import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import person from './../../assets/person.png'
import BackspaceIcon from '@mui/icons-material/Backspace';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CompletionButtons from "./CompletionButtons";
const TranslateTheSentence=({data, onComplete})=>{
    const [sentence,setSentence]= useState("");
    const [translation,setTranslation]=useState("");
    const [answers, setAnswers] = useState([]);
    const [sentenceTranslation,setSentenceTranslation]=useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    useEffect(()=>{
        setSentenceTranslation("");
        const sentences = data.map((sentence)=>sentence.sentence);
        const translations = data.map((translation)=>translation.sentenceTranslation);
        const randomSentenceIndex = Math.floor(Math.random() * sentences.length);
        setSentence(sentences[randomSentenceIndex]);
        console.log(sentences[randomSentenceIndex])
        const translationWords = translations[randomSentenceIndex].split(" ");
        if(randomSentenceIndex == sentences.length-1){
            const randomIndex = randomSentenceIndex-1;
            const newIndex = Math.max(0, Math.floor(Math.random() * (translations[randomIndex].split(" ").length - 3)));

            const threeWords = translations[randomIndex].split(" ").slice(newIndex, newIndex + 3);
            console.log(threeWords)
            translationWords.push(...threeWords);
        }
        else{
            const randomIndex = randomSentenceIndex+1;
            const newIndex = Math.max(0, Math.floor(Math.random() * (translations[randomIndex].split(" ").length - 3)));

            console.log(translations[randomIndex]) 
            console.log(translations[randomIndex].split(" ").length)
            const threeWords = translations[randomIndex].split(" ").slice(newIndex, newIndex + 3);
            console.log(threeWords)
            translationWords.push(...threeWords);
        }
        shuffleArray(translationWords);
        setAnswers(translationWords);
        setTranslation(translations[randomSentenceIndex]);
    },[])

    useEffect(()=>{
        console.log(sentenceTranslation);
        console.log(translation)
        if(sentenceTranslation === translation && sentenceTranslation.length>0){
            console.log(isCompleted)
            setIsCompleted(true);
        }else{
            setIsCompleted(false);
        }
    },[sentenceTranslation])    
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      };
    
    const addWord=(answer)=>{
        if(sentenceTranslation == ""){
            setSentenceTranslation(answer);
        }else
            setSentenceTranslation((prev)=>prev+" "+answer)
    }
    
    const deleteLastWord=()=>{
        if (sentenceTranslation !== "") {
            const wordsArray = sentenceTranslation.split(" ");
            wordsArray.pop();
            console.log(wordsArray)
            const updatedSentenceTranslation = wordsArray.join(" ");
            setSentenceTranslation(updatedSentenceTranslation);
          }
    }
    const handleCompletion = () =>{
        onComplete();
      }
    return(
        <Box sx={{width:"100%", height:"100%"}}>
            <h1 style={{ position: "absolute", top: "10vh", left: "6vh", color: "black" }}>Translate the sentence</h1>
            <Box sx={{width:"100%", height:"auto"}}>
                <img style={{width: "200px",height: "200px",marginLeft: "50vh", marginTop: "24vh"}} src={person} alt="image of a person"/>
                <TextField disabled variant="standard" value={sentence} sx={{width:"75vh",marginTop:"23vh", textAlign:"center",'& .MuiOutlinedInput-input':{textAlign:"center"}}} ></TextField>
                <TextField disabled variant="standard" value={sentenceTranslation}  sx={{width:"75vh",position:"relative",top: "-15vh",left: "84vh", textAlign:"center",'& .MuiOutlinedInput-input':{textAlign:"center"}}} ></TextField>
                <BackspaceIcon onClick={deleteLastWord} sx={{position:"relative",left: "85vh",bottom: "15vh", color:"darkgray"}}/>
            </Box>
            <Box sx={{display:"flex",justifyContent:"space-evenly"}}>
                {answers.map((answer,index)=>(
                    <Button key={index} variant="outlined" onClick={()=>addWord(answer)} >{answer}</Button>
                ))}
            </Box>
            <CompletionButtons isCompleted={isCompleted} handleCompletion={handleCompletion} />
        </Box>



    )

}

export default TranslateTheSentence;