import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import person from './../../assets/person.png'
import CompletionButtons from "./CompletionButtons";
import BackspaceIcon from '@mui/icons-material/Backspace';
const CreateSentence = ({ data , onComplete}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [openTheory, setOpenTheory]=useState(true);
  const [example, setExample] = useState([])
  const [isCompleted, setIsCompleted] = useState(false);
  const [sentence, setSentence] = useState('')
  useEffect(() => {
    const parts = data.exercise.split('/');
    if (parts.length > 1) {
      setOptions(parts);
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
                <Button variant='outlined' sx={{marginTop:"15vh"}} onClick={()=>setOpenTheory(false)}>Przejdź dalej</Button>
            </Box>
        </Box>
    ):(
        <>
        <Button variant='outlined' sx={{position:"absolute", top:"15vh",left:"10vh"}} onClick={()=>setOpenTheory(true)}>Pokaż teorię</Button>
        <h1 style={{ position: "absolute", top: "20vh", left: "30vh", color: "black" }}>Stwórz zdanie z podanych słów na wzór przykładów z teorii</h1>
        <Box sx={{width:"100%", height:"auto"}}>
            <img style={{width: "200px",height: "200px",marginLeft: "50vh", marginTop: "30vh"}} src={person} alt="image of a person"/>
            <Box sx={{display:"flex", width:"50%", height:"auto",marginTop:"-25vh",justifyContent:"space-evenly", marginLeft:"70vh"}}>
            {options.map((option, index) => (
                <Button
                    key={index}
                    sx={{
                    height: "8vh",
                    width: "20vh",
                    marginBottom: "2vh",
                    }}
                    variant="outlined"
                >
                    {option}
                </Button>
                ))}
            </Box>
                <TextField variant="outlined" value={sentence} onChange={(e)=>setSentence(e.target.value)}  sx={{width:"75vh",position:"relative",top:"5vh",left: "81vh"}}/>
        </Box>
       
        <CompletionButtons isCompleted={isCompleted} handleCompletion={handleCompletion} />
            </>
        )}
    
</Box>
  );
};

export default CreateSentence;
