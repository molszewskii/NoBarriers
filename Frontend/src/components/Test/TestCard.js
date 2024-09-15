import React, { useState } from "react";
import { Grid, Card, Box, Typography, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArticleIcon from '@mui/icons-material/Article';
import VocabularyA1 from "../VocabLevels/FlashCardModal";
const TestCard = ({ test, onFlashCardToggle ,flashCardData}) => {
    const [openFlashCard, setOpenFlashCard] = useState(false);
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/test/${test.id}`);
    };

    const handlePreparationClick = (event) => {
        event.stopPropagation();
        setOpenFlashCard(true);
        onFlashCardToggle(true);
        flashCardData(test.flashCards)
    };
    return ( 
    <Grid key={test.id} item xs={12} sm={6} md={4} lg={3}>
            <Card
            onClick={handleCardClick}
            sx={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                height: "21vh",
                borderRadius: "16px",
                transition: "transform 0.3s, background-color 0.3s",
                "&:hover": {
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
            >
                 <Box sx={{display:"flex",width:"100%",justifyContent:"space-between",height:"100%"}}>
                    <Typography
                    variant="h5"
                    sx={{ color: "white", marginLeft:"2vh",marginTop:"1vh" }}
                    color="primary"
                    >
                    {test.testName}
                    </Typography>
                    <Tooltip title="Preparation">
                            <Box sx={{ marginRight: "2vh", marginTop: "1.5vh" }} onClick={handlePreparationClick}>
                                <ArticleIcon key={test.id} />
                            </Box>
                        </Tooltip>
                </Box>
                </Box>
           
            <Box p={2}>
                    <Typography
                    variant="body2"
                    sx={{ marginBottom: "3vh"}}
                    color="textSecondary"
                    >
                    Ilość pytań: {test.questionCount}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                    {test.author}
                    </Typography>
            </Box>
            </Card>
    </Grid>
)};

export default TestCard;
