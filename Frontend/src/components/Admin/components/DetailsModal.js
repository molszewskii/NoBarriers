import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import AdminService from "../../../services/AdminService";
import { ShowData } from "./ShowData";

export const DetailsModal=({openModal,itemCategory, onCloseModal, id, itemModeName,onSuccess,detailsLanguageId})=>{
    console.log(detailsLanguageId)
    console.log(itemCategory)
    const [open, setOpen]=useState(false)
    const [details, setDetails]=useState([])
    const [showUsers, setShowUsers]=useState(false)
    const [showLevelData, setShowLevelData]=useState(false)
    const [usersProgress, setUsersProgress]=useState([])
    const [levelData, setLevelData]=useState([])
    const [achievement, setAchievement]=useState(false)
    const [openAddLevelData, setOpenAddLevelData]= useState(false);
    const [openGrammarAddLevel,setOpenGrammarAddLevel] = useState(false);
    const closeShowUsers =()=>{setShowUsers(false)}
    const closeShowLevelData =()=>{setShowLevelData(false)}
    const [wordValue, setWordValue] = useState('');
    const [translationValue, setTranslationValue] = useState('');
    const [sentenceValue, setSentenceValue] = useState('');
    const [sentenceTranslationValue, setSentenceTranslationValue] = useState('');
    const [theoryValue, setTheoryValue]=useState('');
    const [ruleValue, setRuleValue]=useState('');
    const [exampleValue, setExampleValue]=useState('');
    const [exerciseValue, setExerciseValue]=useState();
    const [exerciseSolutionValue, setExerciseSoulutionValue]=useState('');
    const [exerciseType, setExerciseType] = useState([
        { id: 1, name: "fill-in-the-blank", label: "Fill in the Blank" },
        { id: 2, name: "multiple-choice", label: "Multiple Choice" },
        { id: 3, name: "transform-sentence", label: "Transform Sentence" },
    ]);
    const [selectedExerciseType, setSelectedExerciseType] = useState('');

    const handleChangeExerciseType = (event) => {
        setSelectedExerciseType(event.target.value);
    };
    const adminService = new AdminService();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: openGrammarAddLevel ? 550 : 350,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display:"flex", 
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:"4vh",
      };
      useEffect(()=>{
        setOpen(openModal);
        adminService.GetItem(id,itemModeName,detailsLanguageId).then((response)=>{
            setDetails(response); 
            if(itemModeName === 'achievements'){
                setUsersProgress(response.userAchievements)
                setAchievement(true)
            }
            else{
                setLevelData(response)
                setAchievement(false)
            }
            })
            

    },[openModal])
    const handleClose = () => {
        setOpen(false);
        onCloseModal();
      };
      console.log(details)
      console.log(usersProgress)
      if(details.length === 0 ){
        return null;
      }
      const handleAddLevelData=()=>{
        try{
            adminService.AddLevelData(id,wordValue,translationValue,sentenceValue,sentenceTranslationValue,detailsLanguageId);
            onSuccess(true);
            setWordValue('');
            setTranslationValue('');
            setSentenceValue('');
            setSentenceTranslationValue('');
        }catch(error){
            throw error;
        }
      }
      const handleAddLevelDataGrammar=()=>{
        try{
            adminService.AddLevelDataGrammar(id,theoryValue,ruleValue,exampleValue,exerciseValue,exerciseSolutionValue,selectedExerciseType,detailsLanguageId);
            onSuccess(true);
            setTheoryValue('');
            setRuleValue('');
            setExampleValue('');
            setExerciseValue('');
            setExerciseSoulutionValue('');
            setSelectedExerciseType('');
        }catch(error){
            throw error;
        }
      }
      const handleSuccess=(success)=>{
        if(success){
            onSuccess(true);
        }
      }
      const handleOpenLevelData=()=>{
        setOpenAddLevelData(true);
        if(itemCategory === 'GRAMMAR'){
            setOpenGrammarAddLevel(true);
        }
      }
      console.log(levelData)
    return(
        <Box>
            <Modal
                open={open}
                onClose={handleClose}
                >
                <Box sx={style}>
                    {openAddLevelData ? (
                        <Box sx={{width:"100%",height:"20%",textAlign:"center"}}>
                            <Typography variant="h5" component="h2">
                                Add Level Data
                            </Typography> 
                        </Box>
                    ):(
                        <Box sx={{width:"100%",height:"20%",textAlign:"center"}}>
                            <Typography sx={{marginTop:"1vh"}} variant="h5" component="h2">
                                Details of {itemModeName.charAt(0).toUpperCase() + itemModeName.slice(1)}
                            </Typography> 
                        </Box>
                    )}
                    
                    {achievement ? (
                        <Box sx={{ width: "80%", height: "80%" }}>
                            <TextField variant="outlined" sx={{ marginTop: "2vh", width: "100%" }} label="Name" defaultValue={details.name} InputProps={{ readOnly: true }} />
                            <TextField variant="outlined" sx={{ marginTop: "2vh", width: "100%" }} label="Points" defaultValue={details.maxValue} InputProps={{ readOnly: true }} />
                            <TextField variant="outlined" sx={{ marginTop: "2vh", width: "100%" }} label="Number of Users" defaultValue={details.usersCount} InputProps={{ readOnly: true }} onClick={() => setShowUsers(true)} />
                        </Box>
                        ) : (
                        <Box sx={{ width: "80%", height: "80%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                            {openAddLevelData ? (
                            <>
                                {openGrammarAddLevel ? (
                                     <>
                                     <TextField variant="outlined" sx={{ marginTop: "-5vh", width: "100%" }} label="Theory" value={theoryValue} onChange={(e) => setTheoryValue(e.target.value)} />
                                     <TextField variant="outlined" sx={{ marginTop: "2vh", width: "100%" }} label="Rule" value={ruleValue} onChange={(e) => setRuleValue(e.target.value)} />
                                     <TextField variant="outlined" sx={{ marginTop: "2vh", width: "100%" }} label="Example" value={exampleValue} onChange={(e) => setExampleValue(e.target.value)} />
                                     <TextField variant="outlined" sx={{ marginTop: "2vh", width: "100%" }} label="Exercise" value={exerciseValue} onChange={(e) => setExerciseValue(e.target.value)} />
                                     <TextField variant="outlined" sx={{ marginTop: "2vh", width: "100%" }} label="Exercise Solution" value={exerciseSolutionValue} onChange={(e) => setExerciseSoulutionValue(e.target.value)} />
                                     <FormControl sx={{width:"100%", marginTop:"2vh"}}>
                                         <InputLabel>Exercise Type</InputLabel>
                                         <Select
                                             value={selectedExerciseType}
                                             label="Exercise Type"
                                             onChange={handleChangeExerciseType} 
                                         >
                                             {exerciseType.map((type) => (
                                                 <MenuItem key={type.id} value={type.name}>{type.label}</MenuItem>
                                             ))}
                                         </Select>
                                     </FormControl>
                                     <Button variant="filled" sx={{marginTop: "1.5vh",backgroundColor:"rgb(78, 1, 78)",color:"white",padding:"1vh 6vh",'&:hover': {backgroundColor: "rgb(78, 1, 78) !important",},}}
                                         onClick={handleAddLevelDataGrammar}
                                     >Save</Button>
                                     </>
                                ):(
                                   
                                    <>
                                    <TextField variant="outlined" sx={{ marginTop: "-3vh", width: "100%" }} label="Word" value={wordValue} onChange={(e) => setWordValue(e.target.value)} />
                                    <TextField variant="outlined" sx={{ marginTop: "2vh", width: "100%" }} label="Translation" value={translationValue} onChange={(e) => setTranslationValue(e.target.value)} />
                                    <TextField variant="outlined" sx={{ marginTop: "2vh", width: "100%" }} label="Sentence" value={sentenceValue} onChange={(e)=>setSentenceValue(e.target.value)} />
                                    <TextField variant="outlined" sx={{ marginTop: "2vh", width: "100%" }} label="Sentence Translation" value={sentenceTranslationValue} onChange={(e)=>setSentenceTranslationValue(e.target.value)} />
                                    <Button variant="filled" sx={{marginTop: "1.5vh",backgroundColor:"rgb(78, 1, 78)",color:"white",padding:"1vh 6vh",'&:hover': {backgroundColor: "rgb(78, 1, 78) !important",},}}
                                        onClick={handleAddLevelData}
                                    >Save</Button>
                                    </>
                                )}
                            </>
                            ) : (
                            <>
                                <TextField variant="outlined" sx={{ marginTop: "2vh", width: "100%" }} label="Name" value={details.name} InputProps={{ readOnly: true }} />
                                <TextField variant="outlined" sx={{ marginTop: "2vh", width: "100%" }} label="Number of Terms" value={details.levelDataCount} InputProps={{ readOnly: true }} onClick={() => setShowLevelData(true)} />
                                <Button
                                variant="filled"
                                sx={{
                                    backgroundColor: "gray",
                                    marginTop: "3vh",
                                    color: "white",
                                    padding: "2vh 6vh",
                                    '&:hover': { backgroundColor: "rgb(78, 1, 78) !important" },
                                }}
                                onClick={()=>handleOpenLevelData()}
                                >
                                Add Level Data
                                </Button>
                                <Button variant="filled" sx={{marginTop:"2vh",backgroundColor:"rgb(78, 1, 78)",color:"white",padding:"1vh 6vh",'&:hover': {backgroundColor: "rgb(78, 1, 78) !important",},}}
                                    onClick={handleClose}
                                >Close</Button>
                            </>
                            )}
                        </Box>
                        )}
                    
                </Box>
            </Modal>
            {showUsers &&(
                <ShowData openModal={showUsers} onCloseModal={closeShowUsers} itemData={usersProgress} itemModeName={itemModeName}/>
            )}
            {showLevelData && (
                <ShowData openModal={showLevelData} onCloseModal={closeShowLevelData} itemData={levelData} itemModeName={itemModeName} onSuccess={handleSuccess} itemCategory={itemCategory}/>
            )}
        </Box>
    )

}