import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import person from './../../assets/person.png'
import CompletionButtons from "./CompletionButtons";
import BackspaceIcon from '@mui/icons-material/Backspace';
const TransformSentence = ({ data , onComplete}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [openTheory, setOpenTheory]=useState(true);
  const [example, setExample] = useState([])
  const [isCompleted, setIsCompleted] = useState(false);
  const [sentence, setSentence] = useState('')
  useEffect(() => {
    const parts = data.exercise.split('|');
    if (parts.length > 1) {
      setQuestion(parts[0]);
      setOptions(parts.slice(1));
    }
    setExample(data.example)
  }, [data]);
  useEffect(()=>{
    if(sentence === data.exerciseSolution){
        setIsCompleted(true);
    }else{
        setIsCompleted(false)
    }
  },[sentence])
  const handleCompletion = () =>{
    setOpenTheory(true);
    setIsCompleted(false);
    onComplete();
  }
  const addWordToSentence=(answer)=>{
    if(sentence == ""){
        setSentence(answer);
    }else
        setSentence((prev)=>prev+" "+answer)
  }
  const deleteLastWord=()=>{
    if (sentence !== "") {
        const wordsArray = sentence.split(" ");
        wordsArray.pop();
        console.log(wordsArray)
        const updatedSentenceTranslation = wordsArray.join(" ");
        setSentence(updatedSentenceTranslation);
      }
  }
  return (

    <Box sx={{width:"100%", height:"99vh"}}>
    {openTheory ? (
        <Box sx={{width:"100%", height:"100%", display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
            <Box sx={{width:"60%",height:"55%",border:"2px solid black",borderRadius:"20px", padding:"3vh 3vh",textAlign:"center"}}>
                <Typography variant='h4' >Teoria </Typography>
                <Typography variant='h5' >{data.theory} </Typography>
                <Typography variant='h4' sx={{marginTop:"5vh"}} >Reguła Gramatyczna</Typography>
                <Typography variant='h5' >{data.rule}</Typography>
                <Typography variant='h4' sx={{marginTop:"5vh"}}>Examples</Typography>
                <Typography variant='h5' >{example}</Typography>
                <Button variant='outlined' sx={{marginTop:"10vh"}} onClick={()=>setOpenTheory(false)}>Przejdź dalej</Button>
            </Box>
        </Box>
    ):(
        <>
        <Button variant='outlined' sx={{position:"absolute", top:"15vh",left:"10vh"}} onClick={()=>setOpenTheory(true)}>Pokaż teorię</Button>
        <h1 style={{ position: "absolute", top: "20vh", left: "30vh", color: "black" }}>Przekształć zdanie</h1>
        <Box sx={{width:"100%", height:"auto"}}>
            <img style={{width: "200px",height: "200px",marginLeft: "50vh", marginTop: "30vh"}} src={person} alt="image of a person"/>
                <TextField disabled variant="standard" value={question} sx={{width:"75vh",marginTop:"30vh", textAlign:"center",'& .MuiOutlinedInput-input':{textAlign:"center"}}} ></TextField>
                <TextField disabled variant="standard" value={sentence}  sx={{width:"75vh",position:"relative",top: "-15vh",left: "81vh", textAlign:"center",'& .MuiOutlinedInput-input':{textAlign:"center"}}} ></TextField>
                <BackspaceIcon onClick={deleteLastWord} sx={{position:"relative",left: "85vh",bottom: "15vh", color:"darkgray"}}/>
        </Box>
        <Box sx={{display:"flex", width:"100%", height:"auto",marginTop:"2vh",justifyContent:"space-evenly"}}>
        {options.map((option, index) => (
            <Button
                key={index}
                sx={{
                height: "8vh",
                width: "20vh",
                marginBottom: "2vh",
                }}
                variant="outlined"
                onClick={() => addWordToSentence(option)}
                disabled={isCompleted && option != data.exerciseSolution}
            >
                {option}
            </Button>
            ))}
        </Box>
        <CompletionButtons isCompleted={isCompleted} handleCompletion={handleCompletion} />
            </>
        )}
    
</Box>
  );
};

export default TransformSentence;
