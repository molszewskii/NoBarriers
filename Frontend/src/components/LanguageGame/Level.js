import { Box, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import MatchWords from "./MatchWords";
import TranslateTheWord from "./TranslateTheWord";
import CompleteSentence from "./CompleteSentence";
import TranslateTheSentence from "./TranslateTheSentence";
import FinalViewOfTheLevel from "../Modals/FinalViewOfTheLevel";
import { useParams } from "react-router-dom";
import MultipleChoiceExercise from "./MultipleChoiceExercise";
import TransformSentence from "./TransformSentence";
import CreateSentence from "./CreateSentence";
import LevelService from "../../services/LevelService";
import SpeechLevel from "./SpeechLevel";
import useLevelData from "./hooks/useLevelData";

const Level = () => {
  const { levelId } = useParams();
  const languageName = localStorage.getItem("languageCourse")
  const levelService = new LevelService();
  const {
    progress, setProgress, nextView, setNextView, data, setData, newData, setNewData, dataLoaded, setDataLoaded, openModal, setOpenModal
  } = useLevelData(levelId, languageName);
  useEffect(() => {
    const saveDataToLocalStorage = async () => {
      setTimeout(() => {
        localStorage.setItem(`progress_${levelId}`, progress.toString());
        localStorage.setItem(`nextView_${levelId}`, nextView.toString());
        localStorage.setItem(`data_${levelId}`, JSON.stringify(data));
        localStorage.setItem(`newdata_${levelId}`, JSON.stringify(newData));
        localStorage.setItem(`loaded_${levelId}`, dataLoaded.toString());
      }, 0);
    };

    saveDataToLocalStorage();
  
  }, [progress, nextView, levelId, data, newData]);

  const handleUpdateData = (updatedData) => {
    setNewData(updatedData);
  };
  useEffect(() => {
    if(data.categoryName === 'VOCABULARY' && nextView === 6){
      setTimeout(() => {
        localStorage.removeItem(`progress_${levelId}`);
        localStorage.removeItem(`nextView_${levelId}`);
        localStorage.removeItem(`data_${levelId}`);
        localStorage.removeItem(`newdata_${levelId}`);
      }, 0);
      setOpenModal(true);
    }
    if (nextView === 5 && data.categoryName === 'GRAMMAR') {
      setTimeout(() => {
        localStorage.removeItem(`progress_${levelId}`);
        localStorage.removeItem(`nextView_${levelId}`);
        localStorage.removeItem(`data_${levelId}`);
        localStorage.removeItem(`newdata_${levelId}`);
      }, 0);
      setOpenModal(true);
    }
  }, [nextView]);

  const handleMatchWordsCompletion = () => {
    if(data.categoryName === 'VOCABULARY')
      setProgress((prevProgress) => prevProgress + 100/6);
    else
    setProgress((prevProgress) => prevProgress + 20);
    setNextView((prev) => prev + 1);
  };
  
  return (
    <div>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          top: "5vh",
          left: "25vh",
          width: "75%",
          height: "1vh",
          borderRadius: "10px",
        }}
      />
      {data.categoryName === 'GRAMMAR' ? (
        <>
        {dataLoaded  && nextView < 5 && (
                <>
                {data.data[nextView].exerciseType === 'multiple-choice' &&(
                  <MultipleChoiceExercise
                  data={data.data[nextView]}
                  onComplete={handleMatchWordsCompletion}
                  />
                )}
                {data.data[nextView].exerciseType === 'transform-sentence' &&(
                  <TransformSentence
                  data={data.data[nextView]}
                  onComplete={handleMatchWordsCompletion}
                  />
                )}
                {data.data[nextView].exerciseType === 'create-sentence' &&(
                  <CreateSentence
                  data={data.data[nextView]}
                  onComplete={handleMatchWordsCompletion}
                  />
                )}
                </>
          
        )}
        </>
      ):(
        <>
        {dataLoaded &&(
          <>
            {nextView === 0 && (
              <MatchWords
                data={data.data}
                onUpdateData={handleUpdateData}
                onComplete={handleMatchWordsCompletion}
              />
            )}
            {nextView === 1 && (
              <TranslateTheWord
                data={newData}
                onUpdateData={handleUpdateData}
                onComplete={handleMatchWordsCompletion}
              />
            )}
            {nextView === 2 && (
              <CompleteSentence
                data={data.data}
                onComplete={handleMatchWordsCompletion}
              />
            )}
            {nextView === 3 && (
              <TranslateTheWord
                data={newData}
                onUpdateData={handleUpdateData}
                onComplete={handleMatchWordsCompletion}
              />
              )}
            {nextView === 4  && (
               <TranslateTheSentence
                data={data.data}
                onComplete={handleMatchWordsCompletion}
              />
              )}
              {(nextView === 5 || nextView === 6) && (
              <SpeechLevel 
                sentence={data.data[nextView-1].sentence} 
                onComplete={handleMatchWordsCompletion}
                languageName ={languageName}/>
              )}

          </>
        )}
        </>
      )}
      {openModal && (
        <FinalViewOfTheLevel openModal={openModal} level={levelId} />
      )}
    </div>
  );
};

export default Level;
