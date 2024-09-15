import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import person from './../../assets/person.png'
import CompletionButtons from "./CompletionButtons";
const MultipleChoiceExercise = ({ data , onComplete}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [openTheory, setOpenTheory]=useState(true);
  const [example, setExample] = useState([])
  const [isCompleted, setIsCompleted] = useState(false);
  useEffect(() => {
    
    const parts = data.exercise.split('|');
    if (parts.length > 1) {
      setQuestion(parts[0]);
      setOptions(parts.slice(1));
    }
    const exampleParts = data.example.split('.');
    setExample(exampleParts)
  }, [data]);
  const handleCompletion = () =>{
    setOpenTheory(true);
    setIsCompleted(false);
    onComplete();
  }
  const checkAnswer=(answer)=>{
    if(answer === data.exerciseSolution){
        setIsCompleted(true);
    }
  }
  console.log(data)
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
                {example.map((example,index)=>(
                    <Typography variant='h5' key={index} >{example}</Typography>
                ))}
                <Button variant='outlined' sx={{marginTop:"10vh"}} onClick={()=>setOpenTheory(false)}>Przejdź dalej</Button>
            </Box>
        </Box>
    ):(
        <>
        <Button variant='outlined' sx={{position:"absolute", top:"15vh",left:"10vh"}} onClick={()=>setOpenTheory(true)}>Pokaż teorię</Button>
        <h1 style={{ position: "absolute", top: "20vh", left: "30vh", color: "black" }}>Uzupełnij lukę w zdaniu</h1>
        <Box sx={{width:"100%", height:"auto"}}>
            <img style={{width: "200px",height: "200px",marginLeft: "50vh", marginTop: "30vh"}} src={person} alt="image of a person"/>
            <TextField disabled variant="outlined" sx={{marginTop:"30vh", marginLeft:"4vh", textAlign:"center",'& .MuiOutlinedInput-input':{textAlign:"center"}}} value={question}></TextField>
        </Box>
        <Box sx={{display:"flex", flexDirection:"column", width:"100%", height:"auto",marginTop:"-15vh"}}>
        {options.map((option, index) => (
            <Button
                key={index}
                sx={{
                height: "8vh",
                width: "30vh",
                marginLeft: "85vh",
                marginBottom: "2vh",
                }}
                variant="outlined"
                onClick={() => checkAnswer(option)}
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

export default MultipleChoiceExercise;
