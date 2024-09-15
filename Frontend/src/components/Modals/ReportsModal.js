import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import FileModal from "./FileModal";
import FileService from "../../services/FileService";
import ReportsService from "../../services/ReportsService";


const ReportsModal = ({ data, openModal, onCloseModal }) => {
    const [open, setOpen] = useState(false);
    const [reportDetails, setReportDetails] = useState([]);
    const [replyClicked, setReplyClicked] = useState(false);
    const [fileClicked, setFileClicked] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [textClicked, setTextClicked]=useState(false);
    const [answerText, setAnswerText]=useState('');
    const fileService = new FileService();
    const reportsService = new ReportsService();
    useEffect(() => {
      setOpen(openModal);
      setReportDetails(data);
    }, [openModal]);
  
    const handleClose = () => {
      setOpen(false);
      onCloseModal();
    };
  
    const handleFileClick = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`https://localhost:7258/api/File/get-files/${userId}`);
        setUploadedFiles(response.data);
        setFileClicked(true);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
  
    const handleFileSelect = (file) => {
        console.log(file)
      setSelectedFile(file);
      setFileClicked(false);
    };
  
    const handleSelectFileModalClose = () => {
      setFileClicked(false);
    };
    const downloadFileAndUpload = async (fileName) => {
        try {
          const response = fileService.GetFileByName(fileName);
          const formData = new FormData();
          formData.append('file', new Blob([response.data]), fileName);
      
          const uploadResponse = fileService.addFile(formData,reportDetails.userId)
          handleClose();
        } catch (error) {
          console.error('Error downloading and uploading file:', error);
        }

      };
      
    const handleSendClick=(fileName)=>{
        downloadFileAndUpload(fileName);
    }
    const handleSendText =()=>{
      if(answerText !== ''){
        const userId = localStorage.getItem("userId");
        const formData = {
          senderId: userId,
          receiverId: reportDetails.userId,
          answerText: answerText,
          reportId: reportDetails.id
        }
        reportsService.SendAnswerToTheReport(formData);
        handleClose();
      }
    }
    console.log(reportDetails)
    if (reportDetails.length === 0) {
      return null;
    }
    return ( 
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box className="modalBox" sx={{backgroundColor: 'background.paper', width:"400px", display:"flex", flexDirection:"column", alignItems:"center", height:"530px"}}>
          <Typography variant="h6">Report Details</Typography>
          <TextField sx={{marginTop:"2vh"}} id="testName" value={reportDetails.testName} variant="outlined" disabled />
          <TextField sx={{marginTop:"2vh"}} id="userName" value={reportDetails.userName} variant="outlined" disabled />
          <TextField sx={{marginTop:"2vh", width:"55%"}} id="description" value={reportDetails.description} variant="outlined" disabled multiline rows={4} />
          <TextField sx={{marginTop:"2vh"}} id="reportDate" value={reportDetails.reportDate.substring(0,10)} variant="outlined" disabled />
          <Box sx={{display:"flex",width:"100%", alignItems:"center", justifyContent:"space-evenly"}}>
            {replyClicked ? (
              selectedFile ? (
                <Box sx={{display:"flex",flexDirection:"column"}}>
                    <Typography sx={{marginTop:"1vh"}}>Uploaded File:</Typography>
                    <Typography sx={{ marginTop: "1vh" }}>{selectedFile.fileName}</Typography>
                </Box>
               ) : textClicked ? (
                <TextField label="Enter message" sx={{marginTop:"2vh"}} onChange={(e)=>setAnswerText(e.target.value)} />
              ) : (
                <>
                    <Button sx={{width:'40%', backgroundColor:'rgb(78, 1, 78)', color:'white', marginTop:"2vh", '&:hover':{backgroundColor:'rgb(78, 1, 78)'}}} variant="filled" onClick={handleFileClick}>File</Button>
                    <Button sx={{width:'40%', backgroundColor:'rgb(78, 1, 78)', color:'white', marginTop:"2vh", '&:hover':{backgroundColor:'rgb(78, 1, 78)'}}} variant="filled" onClick={()=>setTextClicked(true)}>Text</Button>
                    </>
              )
              ) : (
              <Button sx={{width:'15rem', backgroundColor:'rgb(78, 1, 78)', color:'white', marginTop:"2vh", '&:hover':{backgroundColor:'rgb(78, 1, 78)'}}} variant="filled" onClick={() => setReplyClicked(true)}>Reply To The Report</Button>
            )}
          </Box>
          {(selectedFile || textClicked) ? (
            <Grid sx={{display:'flex', justifyContent:'center', marginTop:"5vh"}}>
                <Button sx={{width:'10rem', backgroundColor:'rgb(78, 1, 78)', color:'white', '&:hover':{backgroundColor:'rgb(78, 1, 78)'}}} variant="filled"
                    onClick={()=>(selectedFile ? handleSendClick(selectedFile.fileName) : handleSendText()) }
                >Send</Button>
            </Grid>
          ):(
            <Grid sx={{display:'flex', justifyContent:'center', marginTop:"5vh"}}>
                <Button sx={{width:'10rem', backgroundColor:'rgb(78, 1, 78)', color:'white', '&:hover':{backgroundColor:'rgb(78, 1, 78)'}}} variant="filled" >Close</Button>
            </Grid>
          )}
          
          {fileClicked && (
            <FileModal
              open={fileClicked}
              handleClose={handleSelectFileModalClose}
              files={uploadedFiles}
              handleFileSelect={handleFileSelect}
            />
          )}
        </Box>
      </Modal>
    );
};

export default ReportsModal;
