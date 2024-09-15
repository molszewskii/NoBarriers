import React, { useEffect, useState } from "react";
import './../../css/flashCards.css';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";

const FlashCardModal = ({ flashCards }) => {
    const [flip, setFlip] = useState(false);

    const handleCardClick = () => {
        setFlip(!flip);
    }

    const handleBeforeChange = () => {
        setFlip(false);
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: handleBeforeChange, 
    };
    return (
        <Box className="flashCardsContainer">
            <Slider {...settings}>
                {flashCards.flat().map((card) => (
                    <Box key={card.id} sx={{ width: "100%", height: "100%" }}>
                        <Box onClick={handleCardClick} className="boxWord">
                            <Box className="word">
                                {flip ? card.termTranslation : card.term}
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
}

export default FlashCardModal;

