import { Box, InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import CompletionButtons from './CompletionButtons';
import person from './../../assets/person.png'
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import MicOffIcon from '@mui/icons-material/MicOff';
import useSpeech from './hooks/useSpeach';
const SpeechLevel = ({sentence,onComplete, languageName}) => {
    const {
      speak, 
      startListening, 
      isCorrect, 
      isCompleted, 
      transcript, 
      listening
    } = useSpeech(languageName, sentence);
  const handleCompletion=()=>{
    onComplete();
  }
  return (
    <Box sx={{width:"100%", height:"99vh"}}>
      <h1 style={{ position: "absolute", top: "15vh", left: "22vh", color: "black" }}>Try to repeat the sentence</h1>
      <img style={{width: "200px",height: "200px",marginLeft: "35vh", marginTop: "30vh"}} src={person} alt="image of a person"/>
      <TextField disabled variant="outlined" value={sentence} sx={{width:"75vh",marginTop:"30vh",marginLeft:"10vh", textAlign:"center",'& .MuiOutlinedInput-input':{textAlign:"center"}}} />
      <TextField
      variant="outlined"
      sx={{width:"7vh", position:"absolute",left:"155vh", top:"31vh" }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="center">
            <VolumeUpIcon onClick={() => speak(sentence)} />
          </InputAdornment>
        ),
      }}
    />
    <TextField
      variant="outlined"
      sx={{width:"7vh", position:"absolute",left:"155vh", top:"50vh" }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="center">
            {listening ? (
              <KeyboardVoiceIcon />
            ):(
              <MicOffIcon onClick={()=>startListening()}/>
            )}
            
          </InputAdornment>
        ),
      }}
    />
      <TextField disabled variant="standard" value={transcript}  sx={{width:"75vh",position:"relative",top: "-7vh",left: "77vh", textAlign:"center",'& .MuiOutlinedInput-input':{textAlign:"center"}}} />
      <CompletionButtons   isCompleted={isCompleted} handleCompletion={handleCompletion}/>
    </Box>
  );
};

export default SpeechLevel;
