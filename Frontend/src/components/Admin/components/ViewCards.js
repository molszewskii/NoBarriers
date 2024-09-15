import { Box, Card, Grid, Typography } from "@mui/material"
import { useContext ,useEffect, useState } from "react"
import AdminService from "../../../services/AdminService";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { EditModal } from "./EditModal";
import { DetailsModal } from "./DetailsModal";
import { CardItem } from "./card/CardItem";
export const ViewCards =({modeName})=>{
  const [englishItems, setEnglishItems] = useState([]);
  const [germanItems, setGermanItems] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [itemIdToEdit, setItemIdToEdit] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [detailsMode, setDetailsMode] = useState(false);
  const [success, setSuccess] = useState(false);
  const [detailsItemId, setDetailsItemId] = useState(null);
  const [detailsLanguageId, setDetailsLanguageId] = useState(null);
  const [detailsItemCategory, setDetailsItemCategory] = useState('')
  const closeEditItemModal = () => {
    setEditMode(false);
    setItemIdToEdit(null);
  };

  const closeAddItemModal = () => {
    setAddMode(false);
  };

  const closeDetailsModal = () => {
    setDetailsMode(false);
    setDetailsItemId(null);
    setDetailsLanguageId(null);
  };

  const adminService = new AdminService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(modeName === 'levels'){
          const englishData = await adminService.GetItems(modeName, 1);
          
          const germanData = await adminService.GetItems(modeName, 2);
          setEnglishItems(englishData);
          setGermanItems(germanData);
        }else{
          const achievementData = await adminService.GetItems(modeName);
          setAchievements(achievementData)
        }
        
        
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
      }
    };
  
    if (success) {
      fetchData();
      setSuccess(false);
    }
  }, [success, modeName, itemIdToDelete]);
  useEffect(() => {
    const handleAction = async () => {
      try {
        if (itemIdToDelete !== null) {
          await adminService.DeleteItem(modeName, itemIdToDelete);
        }
        setSuccess(true);
        setItemIdToDelete(null);
      } catch (error) {
        console.error("Error while handling action:", error);
      }
    };

    handleAction();
  }, [itemIdToDelete,modeName]);

  const deleteItem = (id) => {
    setItemIdToDelete(id);
  };

  const editItem = (id) => {
    setItemIdToEdit(id);
    setEditMode(true);
  };

  const handleSuccess = (success) => {
    if (success) {
      setSuccess(success);
    }
  };
  console.log()
  return (
    <Box sx={{ backgroundColor: "#f6f6f6", width: "97%", height: "auto", padding: "2vh 2vh", overflow:"auto", borderRadius:"8px", overflow:"auto",
    height:"-webkit-fill-available"}}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">{modeName.charAt(0).toUpperCase() + modeName.slice(1)}</Typography>
        <AddIcon sx={{ color: "white", backgroundColor: "rgb(78, 1, 78)", padding: "4px 12px" }} onClick={() => setAddMode(true)} />
      </Box>
      <Box sx={{ height: 650, width: "100%", marginTop: "5vh" }}>
        {(modeName === 'achievements') ? (
          <Box>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {achievements.map((item) => (
                <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                  <CardItem
                    key={item.id}
                    item={item}
                    setDetailsItemId={setDetailsItemId}
                    setDetailsMode={setDetailsMode}
                    editItem={editItem}
                    deleteItem={deleteItem}
                    mode={modeName}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        ):(
          <Box>
            <Typography variant="h5" color={"black"}>English</Typography>
                  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {englishItems.map((item) => (
                      <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                        <CardItem
                          key={item.id}
                          item={item}
                          setDetailsItemId={setDetailsItemId}
                          setDetailsMode={setDetailsMode}
                          editItem={editItem}
                          deleteItem={deleteItem}
                          mode={modeName}
                          languageName = {item.languageName}
                          setDetailsLanguageId={setDetailsLanguageId}
                          setCategoryName = {setDetailsItemCategory}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  <Typography variant="h5" mt={"2vh"} color={"black"}>German</Typography>
                  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {germanItems.map((item) => (
                      <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                        <CardItem
                          key={item.id}
                          item={item}
                          setDetailsItemId={setDetailsItemId}
                          setDetailsMode={setDetailsMode}
                          editItem={editItem}
                          deleteItem={deleteItem}
                          mode={modeName}
                          languageName = {item.languageName}
                          setDetailsLanguageId={setDetailsLanguageId}
                          setCategoryName = {setDetailsItemCategory}
                        />
                      </Grid>
                    ))}
                  </Grid>
          </Box>
        )}
      
    </Box>
      {editMode && <EditModal openModal={editMode} onCloseModal={closeEditItemModal} itemId={itemIdToEdit} onSuccess={handleSuccess} itemModeName={modeName} mode={'edit'} />}
      {addMode && <EditModal openModal={addMode} onCloseModal={closeAddItemModal} onSuccess={handleSuccess} itemModeName={modeName} mode={'add'} />}
      {detailsMode && <DetailsModal openModal={detailsMode} itemCategory = {detailsItemCategory} onCloseModal={closeDetailsModal} id={detailsItemId} itemModeName={modeName} onSuccess={handleSuccess} detailsLanguageId={detailsLanguageId}/>}
    </Box>
        
    )

}