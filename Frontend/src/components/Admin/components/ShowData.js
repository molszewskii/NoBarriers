import { useCallback, useEffect, useState } from "react";
import AdminService from "../../../services/AdminService";
import { Box, Button, IconButton, InputLabel, Modal, OutlinedInput, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
export const ShowData=({openModal, onCloseModal, itemData, itemModeName,onSuccess,itemCategory})=>{
    const [open, setOpen]=useState(false)
    const [data, setData]=useState([])
    const [achievement, setAchievement]=useState(false)
    const [levelDataIdToDelete,setLevelDataIdToDelete]=useState(null);
    const adminService = new AdminService();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width:achievement ? 700 : 800,
        height: 450,
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
        console.log(itemModeName)
        setOpen(openModal);
        const preparedData = itemData.levelData.map(ld => {
            return {
                ...ld,
                language: { name: itemData.languageName }
            };
        });
        setData(preparedData);
        if(itemModeName === 'achievements')
            setAchievement(true)
        else
            setAchievement(false)
    },[openModal,levelDataIdToDelete])
    const handleClose = () => {
        setOpen(false);
        onCloseModal();
      };
      const handleSaveClick=async()=>{
        handleClose();
    }
    const handleDelete=(id)=>{
        setLevelDataIdToDelete(id);
        try{
            adminService.DeleteLevelData(id).then(()=>onSuccess(true))
            setLevelDataIdToDelete(null);
        }catch(error){
            throw error;
        }
    }
    const handleCellEditCommit = async (updatedRow, originalRow) => {
        try {
            const { id, field, value } = updatedRow;
            await adminService.EditLevelData(id, updatedRow);
            onSuccess(true)
            console.log('Data updated successfully!');
        } catch (error) {
            console.error('Błąd podczas edycji danych na serwerze', error);
        }
    };
    const handleGrammarCellEditCommit = async (updatedRow, originalRow) => {
        try {
            console.log(updatedRow)
            const { id, field, value } = updatedRow;
            await adminService.EditLevelDataGrammar(id, updatedRow);
            onSuccess(true)
            console.log('Data updated successfully!');
        } catch (error) {
            console.error('Błąd podczas edycji danych na serwerze', error);
        }
    };
    console.log(data)
    return(
        <Box>
            <Modal
                open={open}
                onClose={handleClose}
                >
                <Box sx={style}>
                    <Box sx={{width:"100%",height:"20%",textAlign:"center"}}>
                            <Typography variant="h5" component="h2">
                                Data
                            </Typography>
                    </Box>
                    {achievement ? (
                        <Box sx={{width:"100%",height:"75%"}}>
                            <DataGrid
                                rows={data}
                                columns={[
                                { field: 'userId', headerName: 'ID', width: 400 },
                                { field: 'userName', headerName: 'User Name', width: 130 },
                                { field: 'progress', headerName: 'Progress', width: 130 },
                                { field: 'course', headerName: 'Course', width: 130,valueGetter: (params) => params.row.course }
                                ]}
                            />
                        </Box>
                    ):(
                        <Box sx={{ width: '100%', height: '75%' }}>
                            {itemCategory === "VOCABULARY" ? (
                                <>
                                 <DataGrid
                                    rows={data}
                                    columns={[
                                    { field: 'word', headerName: 'Word', width: 130, editable: true },
                                    { field: 'translation', headerName: 'Translation', width: 130, editable: true },
                                    { field: 'sentence', headerName: 'Sentence', width: 200, editable: true },
                                    { field: 'sentenceTranslation', headerName: 'Sentence Translation', width: 200, editable: true },
                                    { 
                                        field: 'language',
                                        headerName: 'Course',
                                        width: 100,
                                        editable: true,
                                        valueGetter: (params) => params.row.language.name
                                    },
                                    {
                                        field: 'delete',
                                        headerName: 'Delete',
                                        width: 100,
                                        renderCell: (params) => (
                                        <IconButton
                                            onClick={() => handleDelete(params.id)}
                                            color="secondary"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                        ),
                                    },
                                    
                                ]}
                                processRowUpdate={handleCellEditCommit}
                                />
                                </>
                            ):(
                                <>
                                <DataGrid
                                    rows={data}
                                    columns={[
                                    { field: 'theory', headerName: 'Theory', width: 200, editable: true },
                                    { field: 'rule', headerName: 'Rule', width: 130, editable: true },
                                    { field: 'example', headerName: 'Example', width: 200, editable: true },
                                    { field: 'exercise', headerName: 'Exercise', width: 200, editable: true },
                                    { field: 'exerciseSolution', headerName: 'Exercise Solution', width: 200, editable: true },
                                    { field: 'exerciseType', headerName: 'Exercise Type', width: 200, editable: true },
                                    { 
                                        field: 'language',
                                        headerName: 'Course',
                                        width: 100,
                                        editable: true,
                                        valueGetter: (params) => params.row.language.name
                                    },
                                    {
                                        field: 'delete',
                                        headerName: 'Delete',
                                        width: 100,
                                        renderCell: (params) => (
                                        <IconButton
                                            onClick={() => handleDelete(params.id)}
                                            color="secondary"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                        ),
                                    },
                                    
                                ]}
                                processRowUpdate={handleGrammarCellEditCommit}
                                />
                                </>
                            )}
                           
                        </Box>
                    )}
                    
                    <Button variant="filled" sx={{marginTop:"2vh",backgroundColor:"rgb(78, 1, 78)",color:"white",padding:"1vh 6vh",'&:hover': {backgroundColor: "rgb(78, 1, 78) !important",},}}
                     onClick={handleSaveClick}
                     >Close</Button>
                </Box>
            </Modal>
        </Box>
    )


}