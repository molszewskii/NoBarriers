import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import planet from './../../assets/planet.png';
import planet1 from './../../assets/planet1.png';
import DoneIcon from '@mui/icons-material/Done';
import Tooltip from '@mui/material/Tooltip';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import './../../css/userPage.css';
import { getCompletedUserLevels } from '../../services/UserService';
function Levels() {
  const navigate = useNavigate();
  const [completedLevels, setCompletedLevels] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  
  const amplitude = 40;
  const frequency = 0.02;
  const buttonSpacing = 100;
  const spacingMultiplier = 0.78;
  const centerX = 300; 
  const numSections = 4;
  const numButtonsPerSection = 6; 
  const specialButtonLabels = ['Section 1 (A1)', 'Section 2 (A1)', 'Section 3 (A2)', 'Section 4 (A2)'];
  const specialButtonContent = ['Learn new words and complete some sentences', 'Learn grammatics and become better'];
  const specialButtonColor = ['orange', 'lightgreen', 'purple', 'cyan', 'blue'];
  const images = [planet1, planet];
  const sectionHeight = numButtonsPerSection * buttonSpacing * spacingMultiplier;
  const points = [];

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://localhost:7258/api/Level/getAllLevels');
      setDescriptions(response.data); 
    };
    fetchData();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    getCompletedUserLevels(userId)
      .then(data => {
        const levelIds = data.map(item => {
          if (item.levelId === 6) return 3;
          else if (item.levelId === 7) return 4;
          else if (item.levelId === 9) return 5;
          else if (item.levelId === 11) return 6;
          else if (item.levelId === 12) return 7;
          return item.levelId;
        });
        setCompletedLevels(levelIds);
        localStorage.setItem("levelIds", levelIds);
      })
      .catch(error => console.error('An error occurred while fetching completed levels:', error));
  }, []);

  const handleLevelClick = level => {
    navigate(`/levelgame/${level}`);
  };

  for (let section = 0; section < numSections; section++) {
    const sectionDiv = [];
    for (let i = 0; i < numButtonsPerSection; i++) {
      const y = i * buttonSpacing * spacingMultiplier;
      let x;
      if(section % 2 === 0){
         x = centerX + amplitude * (Math.sin(frequency * (y % sectionHeight)));
      }else{
         x = centerX + amplitude * (-Math.sin(frequency * (y % sectionHeight)));
      }
      
      const index = section * numButtonsPerSection + i;
      
      sectionDiv.push(
        <Tooltip key={index} title={descriptions[index]?.description}>
        <button
          key={index}
          className={i === 0 ? 'special-button' : 'normal-button'}
          style={{
            backgroundColor: i === 0 ? specialButtonColor[section] : null,
            ...(i !== 0 && { backgroundImage: `url(${images[section%2]})` }),
            position: 'absolute',
            left: i === 0 ? "6vh" : x,
            top: i === 0 ? 0 : y,
            marginLeft: i !== 0 ? (section % 2 === 0 ? "-4vh" : "4vh") : 0,
          }}
          onClick={() => {
            if (i !== 0) {
              handleLevelClick(index);
              console.log(index);
            }
          }}
        >
          {i === 0 ? 
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
              <h1 style={{margin:"0",marginLeft:"4vh",marginBottom:"2vh", fontSize:"5vh"}}>{specialButtonLabels[section]}</h1>
              <h2 style={{margin:"0",marginLeft:"4vh"}}>{specialButtonContent[section%2]}</h2>
          </div> : 
            completedLevels.includes(index) ? (
              <DoneIcon/>
            ) : (
              index % numButtonsPerSection
            )
          }
        </button>
        </Tooltip>
      );
      
    }
    
    points.push(
      <Box
        key={section}
        style={{
          position:"relative",
          width:"130%",
          height:"88%"
        }}
      >
        {sectionDiv}
      </Box>
    );
    

  }
    return (
      <Box sx={{ width: "100%", height: "100%" }}>
        {points}
      </Box>
    );
  
}

export default Levels;
