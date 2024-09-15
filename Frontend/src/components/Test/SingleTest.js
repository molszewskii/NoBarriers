import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, LinearProgress } from '@mui/material';

import TestService from '../../services/TestService';
import SingleQuestion from './SingleQuestion';
import TestResults from './TestResults';

const SingleTest = () => {
  const { id } = useParams();
  const [testData, setTestData] = useState([]);
  const [options, setOptions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [progress, setProgress] = useState(0);
  const [savedAnswers, setSavedAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [result, setResult] = useState(0);
  const [testResultOpen, setTestResultOpen] = useState(false);
  const [teacherId, setTeacherId] = useState("");

  const testService = new TestService();

  useEffect(() => {
    testService.getTestDetails(id).then((data) => {
      console.log(data.length);
      setTestData(data);
    });
  }, [id]);

  useEffect(() => {
    if (testData.length > 0) {
      const allOptions = testData.map((option) => option.options);
      const allQuestions = testData.map((question) => question.questionText);
      const correctOptions = testData.flatMap((question) =>
        question.options
          .filter((option) => option.isCorrect)
          .map((option) => ({
            questionId: option.questionId,
            optionText: option.optionText,
          }))
      );

      setTeacherId(testData[0].teacherId);
      setQuestions(allQuestions);
      setCorrectAnswers(correctOptions);
      setOptions(allOptions);
    }
  }, [testData]);

  useEffect(() => {
    if (parseInt(progress) === 100) {
      setTestResultOpen(true);
    }
  }, [progress]);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex < testData.length - 1 ? prevIndex + 1 : prevIndex
    );
    setProgress((prevProgress) => prevProgress + (100 / testData.length));
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((currentIndex) =>
      currentIndex > 0 ? currentIndex - 1 : currentIndex
    );
    setProgress((prevProgress) => prevProgress - (100 / testData.length));
  };

  const handleSave = () => {
    setProgress((prevProgress) => prevProgress + (100 / testData.length));
    savedAnswers.forEach((answer) => {
      const matchingCorrectAnswer = correctAnswers.find((correctAnswer) =>
        correctAnswer.optionText.toLowerCase() === answer.selectedOption.toLowerCase() &&
        correctAnswer.questionId === answer.questionId
      );
      if (matchingCorrectAnswer) {
        setResult((prevResult) => prevResult + 1);
      }
    });
  };

  const handleOptionChange = (selectedOption) => {
    const existingAnswerIndex = savedAnswers.findIndex(
      (answer) => answer.questionIndex === currentQuestionIndex
    );
    if (existingAnswerIndex !== -1) {
      const updatedAnswers = [...savedAnswers];
      updatedAnswers[existingAnswerIndex].selectedOption = selectedOption;
      setSavedAnswers(updatedAnswers);
    } else {
      setSavedAnswers((prevAnswers) => [
        ...prevAnswers,
        { questionIndex: currentQuestionIndex, questionId: correctAnswers[currentQuestionIndex].questionId, selectedOption }
      ]);
    }
  };

  if (testData.length === 0 || options.length === 0) {
    return null;
  }

  const currentQuestion = testData[currentQuestionIndex];

  return (
    <Box sx={{ width: '80%', height: '47.5vh', padding: !testResultOpen ? '10%' : '4% 10%' }}>
      {!testResultOpen ? (
        <Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              position: 'absolute',
              top: '20vh',
              left: '25vh',
              width: '75%',
              height: '1.5vh',
              borderRadius: '10px',
            }}
          />
          <SingleQuestion
            currentQuestion={currentQuestion}
            handleOptionChange={handleOptionChange}
            handleNextQuestion={handleNextQuestion}
            handlePrevQuestion={handlePrevQuestion}
            handleSave={handleSave}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={testData.length}
          />
        </Box>
      ) : (
        <TestResults
          result={result}
          questions={questions}
          savedAnswers={savedAnswers}
          correctAnswers={correctAnswers}
          teacherId={teacherId}
        />
      )}
    </Box>
  );
};

export default SingleTest;
