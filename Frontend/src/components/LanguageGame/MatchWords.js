import { Button, Box, TextField, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CompletionButtons from "./CompletionButtons";
const MatchWords = ({ data, onComplete , onUpdateData}) => {
  const [selectedWord1, setSelectedWord1] = useState("");
  const [selectedWord2, setSelectedWord2] = useState("");
  const [match, setMatch] = useState(false);
  const [shuffledArray, setShuffledArray] = useState([]);
  const [combinedWordsAndTranslations,setCombinedWordsAndTranslations] = useState([]);
  const [selectedPairs, setSelectedPairs] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [matches, setMatches] = useState(0)
  const [words, setWords]=useState([])
  const [translations, setTranslations]=useState([])
 
  useEffect(() => {
    console.log(data)
    const words = data.map((item) => item.word);
    const translations = data.map((item) => item.translation);
    setWords(words);
    setTranslations(translations);
    const arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(words[i]);
      arr.push(translations[i]);
    }
    setCombinedWordsAndTranslations(arr);
    const array = [...arr]
      shuffleArray(array);
      setShuffledArray(array);
      setTimeout(() => {
      }, 1000);
  }, [data]);
  useEffect(() => {
    if (matches === 5) {
      const updatedData = data.filter((item) => !selectedPairs.some(([pairWord1, pairWord2]) => pairWord1 === item.word || pairWord2 === item.word));
      onUpdateData(updatedData);
      setIsCompleted(true);
    }
  }, [matches]);
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  const checkMatch = (word1, word2) => {
    if (word1 && word2) {
      const word = words.find((word) => word.toLowerCase() === (word1 || '').toLowerCase());
      if (!word) {
        const indexTranslation = translations.findIndex((translation) => translation.toLowerCase() === (word1 || '').toLowerCase());
        const word = words[indexTranslation];  
        if (word && word.toLowerCase() === word2.toLowerCase()) {
          setMatch(true);
                setMatches((prevMatches) => prevMatches + 1)
                setSelectedPairs([...selectedPairs, [word1.toLowerCase(), word2.toLowerCase()]]);
              setTimeout(() => {
                setSelectedWord1("");
                setSelectedWord2("");
              }, 1000)
        } else {
          setTimeout(() => {
            setSelectedWord1("");
            setSelectedWord2("");
          }, 1000);
        }
      } else {
        const indexWord = words.findIndex((w) => w.toLowerCase() === word1.toLowerCase());
        const translation = translations[indexWord];
      
        if (translation && translation.toLowerCase() === word2.toLowerCase()) {
          setMatch(true);
                setMatches((prevMatches) => prevMatches + 1)
                setSelectedPairs([...selectedPairs, [word1.toLowerCase(), word2.toLowerCase()]]);
              setTimeout(() => {
                setSelectedWord1("");
                setSelectedWord2("");
              }, 1000);
        } else {
          setTimeout(() => {
            setSelectedWord1("");
            setSelectedWord2("");
          }, 1000);
        }
      } 
  }
}
  console.log(matches)
  const selectWord = (word) => {
    if (!selectedWord1) {
      setSelectedWord1(word.toUpperCase());
    } else if (!selectedWord2) {
      setSelectedWord2(word.toUpperCase());
      checkMatch(selectedWord1, word);
    }
  
  };

  const handleCompletion = () =>{
    onComplete();
  }
  return (
    <Box sx={{ width: "100%", height: "99vh", position: "relative" }}>  
      <h1 style={{ position: "absolute", top: "10vh", left: "6vh", color: "black" }}>Match the words</h1>
      <Box sx={{ width: "100%", height: "auto", display: "flex", flexDirection: "column" }}>
        <Box sx={{ width: "100%", marginTop: "25vh", height: "auto", display: "flex", justifyContent: "center" }}>
          {shuffledArray.map((word, index) => (
            <Button
              key={index}
              sx={{ height: "15%", marginRight: "2vh" }}
              variant="outlined"
              onClick={() => selectWord(word)}
              disabled={selectedPairs.some(([pairWord1, pairWord2]) => pairWord1 === word || pairWord2 === word)}
            >
              {word}
            </Button>
          ))}
        </Box>
        <Box sx={{ width: "100%", height: "auto", marginTop: "25vh", display: "flex", justifyContent: "space-evenly" }}>
          <TextField disabled variant="standard" value={selectedWord1}></TextField>
          <TextField disabled variant="standard" value={selectedWord2}></TextField>
        </Box>
      </Box>
      <CompletionButtons isCompleted={isCompleted} handleCompletion={handleCompletion} />
    </Box>
  );
};

export default MatchWords;
