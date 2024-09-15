import React from "react";
import { Box, Typography, Button, FormControl, RadioGroup, FormControlLabel, Radio, Card, CardContent } from "@mui/material";
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 5px 15px rgba(0,0,0,0.2)',
  },
}));

const CustomRadio = styled(Radio)(({ theme }) => ({
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  }
}));

const SingleQuestion = ({
  currentQuestion,
  handleOptionChange,
  handleNextQuestion,
  handlePrevQuestion,
  handleSave,
  currentQuestionIndex,
  totalQuestions,
}) => {
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "55vh",
      padding: 4,
      bgcolor: 'background.default',
      '& .MuiCard-root': {
        maxWidth: 700,
        width: '100%',
      },
    }}>
      <Card elevation={5}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            Question {currentQuestionIndex + 1}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            {currentQuestion.questionText}
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup>
              {currentQuestion.options.map((option) => (
                <FormControlLabel
                  key={option.id}
                  value={option.optionText}
                  control={<CustomRadio />}
                  label={option.optionText}
                  onChange={() => handleOptionChange(option.optionText)}
                  sx={{ mb: 1 }}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            {currentQuestionIndex > 0 && (
              <CustomButton variant="outlined" onClick={handlePrevQuestion}>
                Previous
              </CustomButton>
            )}
            {currentQuestionIndex < totalQuestions - 1 ? (
              <CustomButton variant="contained" color="primary" onClick={handleNextQuestion}>
                Next
              </CustomButton>
            ) : (
              <CustomButton variant="contained" color="secondary" onClick={handleSave}>
                Save
              </CustomButton>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SingleQuestion;
