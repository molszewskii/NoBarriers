import { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const useSpeech = (languageName, sentence) => {
  const [language, setLanguage] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  useEffect(() => {
    switch (languageName) {
      case 'ENGLISH':
        setLanguage("en-GB");
        break;
      case 'GERMAN':
        setLanguage("de-DE");
        break;
      default:
        setLanguage("en-GB");
    }
  }, [languageName]);
  useEffect(() => {
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      setVoicesLoaded(true);
    } else {
      speechSynthesis.onvoiceschanged = () => {
        setVoicesLoaded(true);
      };
    }
  }, []);
  useEffect(() => {
    if (!listening && transcript) {
      verify();
    }
  }, [listening, transcript]);

  const normalizeText = (text) => {
    return text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"")
               .replace(/\s{2,}/g," ")
               .toLowerCase()
               .trim();
  };

  const speak = (text) => {
    if (!voicesLoaded) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = speechSynthesis.getVoices().find(voice => voice.lang === language);
    speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    resetTranscript();
    setIsCorrect(null);
    SpeechRecognition.startListening({ continuous: false, language });
  };

  const verify = () => {
    const userSaidNormalized = normalizeText(transcript);
    const sentenceNormalized = normalizeText(sentence);
    const isMatch = userSaidNormalized === sentenceNormalized;
    setIsCorrect(isMatch);
    if(isMatch){
      setIsCompleted(true);
    }
  };

  return { speak, startListening, isCorrect, isCompleted, transcript, listening };
};

export default useSpeech;
