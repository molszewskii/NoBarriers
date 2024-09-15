import { Box, Button, Card, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FlashCardsService from "./../../services/FlashCardService";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styled from "@emotion/styled";
import TestService from "../../services/TestService";
import { ViewTestModal } from "../Modals/ViewTestModal";
import FlashCardModal from "../VocabLevels/FlashCardModal";
export const ShowCreatedResources=()=>{
    const [createdFlashCardsClicked, setCreatedFlashCardsClicked]=useState(false);
    const [createdTestsClicked, setCreatedTestsClicked]=useState(true);
    const [myBoxes, setMyBoxes]=useState([]);
    const [myTests, setMyTests]=useState([]);
    const [testDetails, setTestDetails] = useState([]);
    const userId = localStorage.getItem("userId");
    const [flashCards, setFlashCards]=useState([])
    const [openFlashCard, setOpenFlashCard] = useState(false)
    const [openTestDetails,setOpenTestDetails]=useState(false);
    const flashCardsService = new FlashCardsService();
    const testService = new TestService();
    useEffect(() => {
        if (createdFlashCardsClicked) {
          try {
            console.log("essa");
            flashCardsService.getMyBoxes(userId).then((data) => setMyBoxes(data));
          } catch (error) {
            throw error;
          }
        }
        if(createdTestsClicked){
          testService.getAllTest(userId).then((data)=>setMyTests(data));
          
        }
      }, [createdFlashCardsClicked,createdTestsClicked]);
      console.log(myTests)
    const handleBoxClicked=(boxId)=>{
        console.log(boxId)
          flashCardsService.getBoxesFlashCards(boxId)
          .then((data) => setFlashCards(data))
          .catch((error) => console.error('Wystąpił błąd podczas pobierania flash cards:', error));
          setOpenFlashCard(true);
      }
      const handleTestClicked=(testId)=>{
        testService.getTestDetails(testId).then((data)=>setTestDetails(data))
        setOpenTestDetails(true);
      }
    const handleCreatedFlashCards=()=>{
      setCreatedFlashCardsClicked(true);
      setCreatedTestsClicked(false);
    }
    const handleCreatedTests=()=>{
      setCreatedTestsClicked(true);
      setCreatedFlashCardsClicked(false);
      setOpenFlashCard(false)
    }
    const closeTestDetailsModal=()=>{
      setOpenTestDetails(false);
    }
    console.log(myTests)
    return(
        <Box sx={{backgroundColor: openFlashCard ? 'grey' : 'white',width:"100%",height:"100%",overflow:"auto",'&::-webkit-scrollbar':{display:"none"}}}>
            <Box className="flashCardsOptions">
                <Button sx={{borderBottom:'1px solid white', color:'black', margin:'0 5vh','&:hover':{borderBottom:'1px solid purple'}, borderBottom :createdFlashCardsClicked ? '1px solid purple' : "none"}} onClick={handleCreatedFlashCards} >Created FlashCards</Button>
                <Button sx={{borderBottom:'1px solid white', color:'black','&:hover':{borderBottom:'1px solid purple'}, borderBottom :createdTestsClicked ? '1px solid purple' : "none"}} onClick={handleCreatedTests} >Created Tests</Button>
            </Box>
            <Box  className='flashCardBox' sx={{padding:"2vh 10vh"}}>
            {createdFlashCardsClicked && (
                !openFlashCard ? (
                  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {myBoxes.map((box) => (
                      <Grid item xs={2} sm={6} md={4} key={box.id} onClick={() => handleBoxClicked(box.id)}>
                        <Card sx={{
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                            padding:"10px",
                            borderRadius: "16px",
                            transition: "transform 0.3s, background-color 0.3s",
                            '&:hover': {
                                transform: "scale(1.05)",
                                backgroundColor: "#f4f4f4 !important",
                            },
                        }}>
                          <Box p={2}>
                            <Typography variant="h5" sx={{marginBottom:"1vh",color:"rgb(78, 1, 78)"}} color="primary">
                                {box.title}
                            </Typography>
                            <Typography variant="body2" sx={{marginBottom:"4vh"}} color="textSecondary">
                                Terms: {box.numberOfTerms}
                            </Typography>
                            <Typography variant="h6" color="textSecondary">
                                {box.author}
                            </Typography>
                        </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box>
                    <FlashCardModal flashCards={flashCards}></FlashCardModal>
                  </Box>
                )
              )}
              {createdTestsClicked && (
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {myTests?.map((test) => (
                  !openTestDetails ? (
                    <Grid key={test.id} item xs={12} sm={6} md={4} lg={3} onClick={() => handleTestClicked(test.id)}>
                    <Card
                        sx={{
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                            height:"21vh",
                            borderRadius: "16px",
                            transition: "transform 0.3s, background-color 0.3s",
                            '&:hover': {
                                transform: "scale(1.05)",
                                backgroundColor: "#f4f4f4 !important",
                            },
                        }}
                    >
                      <Box
                            sx={{
                                width: "100%",
                                height: "7vh",
                                backgroundColor: "rgb(78, 1, 78)", 
                            }}
                        />
                        <Box p={2}>
                            <Typography variant="h5" sx={{marginBottom:"1vh", color:"white", margin:"-8vh 0"}} color="primary">
                                {test.testName}
                            </Typography>
                            <Typography variant="body2" sx={{marginBottom:"3vh", margin:"9.5vh 0"}} color="textSecondary">
                                Ilość pytań: {test.questionCount}
                            </Typography>
                            <Typography variant="h6" sx={{margin:"-5.5vh 0"}} color="textSecondary">
                                {test.author}
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
                  ):(
                    <ViewTestModal key={test.id} openModal={openTestDetails}  onCloseModal={closeTestDetailsModal} data={testDetails}/>
                  )
                ))}
              </Grid>
              )}

  

        </Box>
     </Box>
    )


}