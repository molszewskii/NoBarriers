import React ,{useEffect, useState}from "react";
import './../css/flashCards.css'
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, Grid, Icon, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
import FlashCardsService from "../services/FlashCardService";
import VocabularyA1 from "./VocabLevels/FlashCardModal";
import { AddFlashCardBoxModal } from "./Modals/AddFlashCardBoxModal";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FlashCardModal from "./VocabLevels/FlashCardModal";
const FlashCards=()=>{
    const themes = ['VOCABULARY', 'GRAMMAR', 'PHRASES', 'PRONUNCIATION']
    const [showMenu, setShowMenu] = useState(false);
    const [userName, setUserName] = useState('');
    const [openFlashCard, setOpenFlashCard] = useState(false)
    const [allBoxes, setAllBoxes]=useState(true);
    const [myBoxes, setMyBoxes]=useState(false);
    const [likedBoxes, setLikedBoxes]=useState(false);
    const userId = localStorage.getItem("userId");
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();
    const flashCardsService = new FlashCardsService();
    const [boxes, setBoxes]=useState([]);
    const [flashCards, setFlashCards]=useState([])
    const [openModal, setOpenModal]=useState(false);
    const [favoriteBoxes, setFavoriteBoxes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const language = localStorage.getItem("languageCourse");
    useEffect(()=>{
        const storedName = localStorage.getItem('userName');
        setUserName(storedName); 
    })
    const handleBoxClicked=(boxId)=>{
      console.log(boxId)
        flashCardsService.getBoxesFlashCards(boxId)
        .then((data) => setFlashCards(data))
        .catch((error) => console.error('Wystąpił błąd podczas pobierania flash cards:', error));
        setOpenFlashCard(true);
    }

    const openAddModal=()=>setOpenModal(true);
    const closeAddModal = () =>setOpenModal(false);
    useEffect(()=>{
      if (myBoxes) {
        try {
          flashCardsService.getMyBoxes(userId)
            .then((data) => setBoxes(data));
        } catch (error) {
          throw error;
        }
      } else if (allBoxes) {
        try {
          console.log(language)
          if(language === 'ENGLISH'){
            flashCardsService.getAllBoxes(1).then((data) => setBoxes(data));
          }
            
          else if(language === 'GERMAN')
            flashCardsService.getAllBoxes(2).then((data) => setBoxes(data));
        } catch (error) {
          throw error;
        }
      } else if (likedBoxes) {
        try {
          flashCardsService.getLikedBoxes(userId)
            .then((data) => setBoxes(data));
        } catch (error) {
          throw error;
        }
      }
  
    }, [myBoxes, allBoxes, likedBoxes]);
    console.log(boxes)
    useEffect(() => {
      if (userId) {
        flashCardsService.getLikedBoxes(userId)
          .then((data) => {
            setFavoriteBoxes(data.map((box) => box.id));
          })
          .catch((error) => console.error('Wystąpił błąd podczas pobierania ulubionych boxów:', error));
      }
    }, [userId]);
    const handleLogout = ()=>{
        navigate('/');
    }
    const handleAllFlashCards=()=>{
      setAllBoxes(true);
      setOpenFlashCard(false);
      setMyBoxes(false)
      setLikedBoxes(false)
    }
    const handleMyBoxes=()=>{
      setAllBoxes(false); 
      setOpenFlashCard(false);
      setMyBoxes(true);
      setLikedBoxes(false);
    }
    const handleLikedBoxes=()=>{
      setAllBoxes(false);
      setOpenFlashCard(false);
      setMyBoxes(false);
      setLikedBoxes(true);
    }
    const handleAddBoxToFav=(boxId)=>{
      console.log(boxId)
      try{
        flashCardsService.addBoxToLiked(boxId,userId)
        setFavoriteBoxes((prevFavoriteBoxes) => [...prevFavoriteBoxes, boxId]);
      }catch(error){
        throw error
      }
    }
    const Item = styled(Card)(({ theme }) => ({
      ...theme.typography.body2,
      padding: theme.spacing(2),
      height:'20vh'
    }));
    const groupByCategory = () => {
      const groupedData = {};
      boxes.forEach((box) => {
        const categoryName = box.categoryName ? box.categoryName : 'Uncategorized';
        if (!groupedData[categoryName]) {
          groupedData[categoryName] = [];
        }
        groupedData[categoryName].push(box);
      });
      return groupedData;
    };
  
    const filteredBoxes = selectedCategory
      ? boxes.filter((box) => box.categoryName === selectedCategory)
      : boxes;
  
    const renderBoxes = () => {
      const groupedData = groupByCategory();
      return (
        <>
          <Box sx={{width:"18%",display:"flex",justifyContent:"space-between", marginBottom:"3vh"}}>
            {Object.keys(groupedData).map((category) => (
              <Button
                key={category}
                sx={{ borderBottom: '1px solid white', color: 'white', '&:hover': { borderBottom: '1px solid purple' } }}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </Box>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {filteredBoxes.map((box) => (
              <Grid item xs={2} sm={6} md={4} key={box.id} onClick={() => handleBoxClicked(box.id)}>
                <Item >
                          <div style={{display:'flex', flexDirection:'column', width:'100%', height:'85%'}}>
                            <h1 style={{color:'black', margin:'0'}}>{box.title}</h1>
                            <p>Ilość: {box.numberOfTerms}</p>
                        </div>
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                        <h2 style={{ margin: 'auto 0 0 0' }}>{box.author}</h2>
                        <FavoriteBorderIcon className={favoriteBoxes.includes(box.id) ? 'favoriteIcon' : ''} onClick={(e) => { e.stopPropagation(); handleAddBoxToFav(box.id); }}/>
                        </div>
                      </Item>
              </Grid>
            ))}
          </Grid>
        </>
      );
    };
  
    return(
        
        <div className="background">
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <div className="flashCardsOptions">
              <Button sx={{borderBottom:'1px solid white', color:'white', '&:hover':{borderBottom:'1px solid purple'}}} onClick={handleAllFlashCards} >All FlashCards</Button>
              <Button sx={{borderBottom:'1px solid white', color:'white', margin:'0 5vh','&:hover':{borderBottom:'1px solid purple'}}} onClick={handleMyBoxes}>My FlashCards</Button>
              <Button sx={{borderBottom:'1px solid white', color:'white','&:hover':{borderBottom:'1px solid purple'}}} onClick={handleLikedBoxes} >Favourite FlashCards</Button>
              <Icon className="addIcon" onClick={openAddModal}>add_circle</Icon>
            </div>
            <Box className='flashCardBox'>
              {!openFlashCard ? renderBoxes() : (
                <div>
                  <FlashCardModal flashCards={flashCards}></FlashCardModal>
                </div>
              )}
            </Box>
          <AddFlashCardBoxModal openModal={openModal} onCloseModal={closeAddModal}/>
            
        </div>
        
    );

}

export default FlashCards;