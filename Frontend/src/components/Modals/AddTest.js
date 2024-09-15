import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, Grid, Icon, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import FlashCardsService from "../../services/FlashCardService";

export const AddTest = ({ openModal, onCloseModal }) => {
  const [open, setOpen] = useState(false);
  const userId = localStorage.getItem("userId")
  const [category, setCategory] = useState('');
  const [flashCardBoxes, setFlashCardBoxes]=useState([])
  const [preperation, setPreperation] = useState('');
  const flashCardService = new FlashCardsService();
  const [testData, setTestData] = useState({
    userId: "",
    testName: "",
    questions: [
      {
        id: 0,
        testId: 0,
        questionText: "",
        options: [
          { id: 0, questionId: 0, optionText: "", isCorrect: false },
          { id: 1, questionId: 0, optionText: "", isCorrect: false },
          { id: 2, questionId: 0, optionText: "", isCorrect: false },
          { id: 3, questionId: 0, optionText: "", isCorrect: false },
        ],
      },
    ],
  });
  

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleChangePreperationBox = (event) => {
    setPreperation(event.target.value);
  };
  useEffect(() => {
    setOpen(openModal);
    const getMyBoxes = async()=>{
      const boxes  = await flashCardService.getMyBoxes(userId);
      setFlashCardBoxes(boxes)
    }
    setTestData((prevTestData) => ({ ...prevTestData, userId: userId }));
    getMyBoxes();
  }, [openModal]);

  const handleClose = () => {
    setOpen(false);
    onCloseModal();
  };

 const addQuestion = () => {
  setTestData((prevTestData) => ({
    ...prevTestData,
    questions: [
      ...prevTestData.questions,
      {
        id: prevTestData.questions.length,
        testId: prevTestData.questions.length,
        questionText: "",
        options: [
          { id: prevTestData.questions.length * 4, questionId: prevTestData.questions.length, optionText: "", isCorrect: false },
          { id: prevTestData.questions.length * 4 + 1, questionId: prevTestData.questions.length, optionText: "", isCorrect: false },
          { id: prevTestData.questions.length * 4 + 2, questionId: prevTestData.questions.length, optionText: "", isCorrect: false },
          { id: prevTestData.questions.length * 4 + 3, questionId: prevTestData.questions.length, optionText: "", isCorrect: false },
        ],
      },
    ],
  }));
};


  const handleTestNameChange = (event) => {
    setTestData((prevTestData) => ({
      ...prevTestData,
      testName: event.target.value,
    }));
  };

  const handleQuestionChange = (event, questionId) => {
    const updatedQuestions = testData.questions.map((question) =>
      question.id === questionId
        ? { ...question, questionText: event.target.value }
        : question
    );
    setTestData((prevTestData) => ({
      ...prevTestData,
      questions: updatedQuestions,
    }));
  };

  const handleOptionChange = (event, questionId, optionId) => {
    const updatedQuestions = testData.questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            options: question.options.map((option) =>
              option.id === optionId
                ? { ...option, optionText: event.target.value }
                : option
            ),
          }
        : question
    );
    setTestData((prevTestData) => ({
      ...prevTestData,
      questions: updatedQuestions,
    }));
  };

  const handleCorrectOptionChange = (questionId, optionId) => {
    const updatedQuestions = testData.questions.map((question) =>
      question.id === questionId
        ? {
            ...question,
            options: question.options.map((option) =>
              option.id === optionId
                ? { ...option, isCorrect: !option.isCorrect }
                : option
            ),
          }
        : question
    );
    setTestData((prevTestData) => ({
      ...prevTestData,
      questions: updatedQuestions,
    }));
  };

  const handleAddTest = async () => {
      const testDataToSend = {
        userId: testData.userId,
        testName: testData.testName,
        questions: testData.questions.map((question) => {
          return {
            testId: question.testId,
            questionText: question.questionText,
            options: question.options.map((option) => {
              return {
                questionId: option.questionId,
                optionText: option.optionText,
                isCorrect: option.isCorrect,
              };
            }),
          };
        }),
        categoryId : category,
        flashCardBoxId : preperation
      };
  
      const response = await fetch("https://localhost:7258/api/Test/addTest", {
  method: "POST",
  credentials: 'include',
  headers: {
    "Content-Type": "application/json",
  },
  
  body: JSON.stringify(testDataToSend),
});

console.log(JSON.stringify(testDataToSend));

if (response.ok) {
  try {
    const result = await response.text();
    console.log("Test added successfully:", result);
  } catch (jsonError) {
    console.error("Error parsing JSON response:", jsonError);
  }
} else {
  console.error("Failed to add test");

  if (response.status === 400) {
    const errorText = await response.text();
    console.error("Error details:", errorText);
  }
}
    }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modalBox" sx={{ backgroundColor: "background.paper", height:"450px" }}>
        <Box sx={{display:"flex"}}>
        <TextField
          id="boxName"
          label="Test Name"
          variant="standard"
          value={testData.testName}
          onChange={handleTestNameChange}
        />
        <FormControl sx={{width:"20%", marginLeft:"5vh"}}>
                  <InputLabel >Category</InputLabel>
                  <Select
                    value={category}
                    label="Category"
                    onChange={handleChangeCategory}
                  >
                    <MenuItem value={1}>VOCABULARY</MenuItem>
                    <MenuItem value={2}>GRAMMAR</MenuItem>
                  </Select>
        </FormControl>
        <FormControl sx={{width:"30%", marginLeft:"10vh"}}>
                  <InputLabel >Preperation Box</InputLabel>
                  <Select
                    value={preperation}
                    label="Preparation Box"
                    onChange={handleChangePreperationBox}
                  >
                    {flashCardBoxes.map((flashCardBox)=>(
                      <MenuItem value={flashCardBox.id}>{flashCardBox.title}</MenuItem>
                    ))}
                  </Select>
        </FormControl>
        </Box>
        
        {testData.questions.map((question) => (
          <div key={question.id}>
            <TextField
              fullWidth
              key={question.id}
              label={`Question ${question.id + 1}`}
              variant="standard"
              value={question.questionText}
              onChange={(event) => handleQuestionChange(event, question.id)}
            />
            {question.options.map((option) => (
              <TextField
                key={option.id}
                fullWidth
                label={`Option ${option.id % 4 + 1}`}
                variant="standard"
                value={option.optionText}
                onChange={(event) =>
                  handleOptionChange(event, question.id, option.id)
                }
              />
            ))}
            <Grid sx={{ display: "flex", flexDirection: "column" }}>
              <h1 style={{ margin: "0", color: "black", fontSize: "3vh" }}>
                Choose the correct answer:
              </h1>
              <Box sx={{ display: "flex" }}>
                {question.options.map((option) => (
                  <Box
                    key={option.id}
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <h2
                      style={{
                        margin: "0",
                        marginLeft: "5vh",
                        fontSize: "3vh",
                        color: "black",
                      }}
                    >{`Option ${option.id % 4 + 1}`}</h2>
                    <Icon
                      key={option.id}
                      sx={{ marginLeft: "15vh" }}
                      onClick={() =>
                        handleCorrectOptionChange(question.id, option.id)
                      }
                    >
                      {option.isCorrect ? (
                        <CheckCircleIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                    </Icon>
                  </Box>
                ))}
              </Box>
            </Grid>
          </div>
        ))}
        <Grid sx={{ display: "flex" }}>
          <AddCircleIcon sx={{ marginLeft: "auto" }} onClick={addQuestion} />
        </Grid>
        <Grid sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            sx={{
              width: "10rem",
              backgroundColor: "rgb(78, 1, 78)",
              color: "white",
            }}
            variant="filled"
            onClick={handleAddTest}
          >
            ADD
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
};
