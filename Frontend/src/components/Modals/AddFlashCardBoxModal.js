import { Box, Button, FormControl, Grid, Icon, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './../../css/flashCards.css'
import FlashCardsService from "../../services/FlashCardService";

export const AddFlashCardBoxModal=({openModal, onCloseModal})=>{
    const [open, setOpen]=useState(false)
    const createBox = new FlashCardsService();
    const [category, setCategory] = useState('');
    const langaugeId = localStorage.getItem("languageId");
    const handleChangeCategory = (event) => {
      setCategory(event.target.value);
    };
    const [textFields, setTextFields] = useState([
        { id: 1, label: "Term", value:"" },
        { id: 2, label: "Term Translation", value:"" },
      ]);
    useEffect(()=>{
        setOpen(openModal);
    },[openModal])

    const handleChange = (event, id) => {
        console.log(id);
        const index = textFields.findIndex((textField) => textField.id === id);
      
        if (index !== -1) {
          const updatedTextFields = [...textFields];
      
          updatedTextFields[index].value = event.target.value;
      
          setTextFields(updatedTextFields);
        }
      };
    const handleClose = () => {
        setOpen(false);
        onCloseModal();
      };
      const addTextField = () => {
        const newId = textFields.length + 1;
        setTextFields((prevTextFields) => [
          ...prevTextFields,
          { id: newId, label: "Term", value: "" },
          { id: newId+1, label: "Term Translation", value: "" },
          
        ] );
      };
      const handleSubmit= async()=>{
        const boxName = document.querySelector('#boxName').value;
        const author = localStorage.getItem("username")
        const authorId = localStorage.getItem("userId");
        const flashCards = [];
            for (let i = 0; i < textFields.length; i += 2) {
            const termField = textFields[i];
            const translationField = textFields[i + 1];

            if (termField && translationField) {
                const flashCard = {
                Term: termField.value,
                TermTranslation: translationField.value,
                };
                flashCards.push(flashCard);
            }
            }
        const requestData = {   
            Title: boxName, 
            Author: author,
            UserId: authorId, 
            FlashCards: flashCards,
            CategoryId : category,
            LanguageId : langaugeId
          };
        console.log(requestData)
        try{
            const addBox = await createBox.createBoxWithFlashCards(requestData);
            console.log(addBox)
            handleClose();
        }catch(error){
            throw error;
        }  
        

      }
    return (
        
        <Modal
            open = {open}
            onClose={handleClose}>
                <Box className="modalBox" sx={{backgroundColor: 'background.paper'}}>
                <TextField id="boxName" label="Box Name" variant="standard" />
                <FormControl sx={{width:"40%", marginLeft:"20vh"}}>
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
                <Grid
                    container
                    spacing={2}
                    >
                    {textFields.map((textField) => (
                        <Grid item key={textField.id} xs={6}>
                        <TextField
                            fullWidth
                            label={textField.label}
                            variant="standard"
                            onChange={(event) => handleChange(event, textField.id)}
                        />
                        </Grid>
                    ))}
                    </Grid>
                
                 <Grid sx={{display:'flex'}}>
                    <AddCircleIcon sx={{marginLeft:'auto'}} onClick={addTextField}/>
                 </Grid>
                 <Grid sx={{display:'flex', justifyContent:'center'}}>
                    <Button sx={{width:'10rem', backgroundColor:'rgb(78, 1, 78)', color:'white'}} variant="filled" onClick={handleSubmit}>ADD</Button>
                 </Grid>
                 
                </Box>
        </Modal>
    )




}