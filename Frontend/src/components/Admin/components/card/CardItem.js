import { Box, Card, Typography, IconButton, Tooltip } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";

export const CardItem = ({
  item, 
  setDetailsItemId, 
  setDetailsMode, 
  editItem, 
  deleteItem, 
  mode, 
  setDetailsLanguageId, 
  languageName, 
  setCategoryName
}) => {
  const [achievementDisplay, setAchievementDisplay] = useState(false);

  useEffect(() => {
    setAchievementDisplay(mode === 'achievements');
  }, [mode]);

  return (
    <Card
      sx={{
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        borderRadius: "16px",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
        },
        backgroundColor: "#f0faff", 
        color: "#333", 
        m: 2,
      }}
      onClick={() => {
        setDetailsItemId(item.id);
        setDetailsMode(true);
        if (mode === 'levels') {
          setCategoryName(item.categoryName);
        }
        if (languageName === 'ENGLISH') {
          setDetailsLanguageId(1);
        } else if (languageName === 'GERMAN') {
          setDetailsLanguageId(2);
        }
      }}
    >
      <Box
        p={2}
        sx={{
          borderRadius: "16px 16px 0 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: "#1976d2" }}>
            {item.name}
          </Typography>
          <Box>
            <Tooltip title="Edit">
              <IconButton onClick={(e) => { e.stopPropagation(); editItem(item.id); }} color="primary">
                <ModeEditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }} color="error">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Box mt={2} flexGrow={1} sx={{ display: 'flex', flexDirection: 'column', justifyContent: "space-evenly" }}>
          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
            {achievementDisplay ? `Points: ${item.maxValue}` : `Category: ${item.categoryName}`}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
            {achievementDisplay ? `Users: ${item.usersCount}` : `LevelData: ${item.levelDataCount}`}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
