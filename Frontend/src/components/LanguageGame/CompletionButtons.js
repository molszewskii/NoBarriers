import React from "react";
import { Box, Button } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const CompletionButtons = ({ isCompleted, handleCompletion }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "13vh",
        borderTop: "2px solid lightgray",
        position: "fixed",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: isCompleted ? "green" : "",
      }}
    >
      {isCompleted ? (
        <>
          <Box sx={{ display: "flex" }}>
            <CheckCircleOutlineIcon
              sx={{ marginLeft: "38vh", marginTop: "0.9vh", color: "white" }}
            />
            <h2 style={{ margin: "0", color: "white" }}>Success</h2>
          </Box>

          <Button
            disabled={!isCompleted}
            onClick={handleCompletion}
            sx={{
              height: "8vh",
              width: "30vh",
              marginRight: "30vh",
              backgroundColor: "white",
            }}
            variant="outlined"
          >
            Next
          </Button>
        </>
      ) : (
        <>
          <Button sx={{ height: "8vh", width: "30vh", marginLeft: "30vh" }} variant="outlined">
            Skip
          </Button>
          <Button
            disabled={!isCompleted}
            onClick={handleCompletion}
            sx={{
              height: "8vh",
              width: "30vh",
              marginRight: "30vh",
              backgroundColor: "white",
              ":hover": { backgroundColor: "white" },
            }}
            variant="outlined"
          >
            Next
          </Button>
        </>
      )}
    </Box>
  );
};

export default CompletionButtons;
