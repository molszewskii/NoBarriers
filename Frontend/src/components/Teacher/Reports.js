import { useEffect, useState } from "react";
import ReportsService from "../../services/ReportsService";
import { Box, Card, Grid, Typography } from "@mui/material";
import ReportsModal from "../Modals/ReportsModal";

const Reports=({userRole})=>{
    const reportsService = new ReportsService();
    const userId = localStorage.getItem("userId")
    const [reports, setReports]=useState([]);
    const [reportDetails,setReportDetails]=useState([]);
    const [openDetailsModal, setOpenDetailsModal]=useState(false);
    const closeDetailsModal=()=>setOpenDetailsModal(false);
    useEffect(()=>{
      if(userRole === 'TEACHER')
        reportsService.GetAllReports(userId).then((response)=>setReports(response));
      else if(userRole === 'USER')
        reportsService.GetAllAnswers(userId).then((response)=>setReports(response))
    },[])
    const handleReportClick=async(id)=>{
        console.log(id)
        await reportsService.GetReportDetails(id).then((response)=>setReportDetails(response));
        setOpenDetailsModal(true);
    }
    return(
        <Box sx={{width:"100%",height:"100%"}}>
            <Box  className='flashCardBox' sx={{padding:"2vh 10vh"}}>
                  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {reports?.map((report) => (
                      <Grid item xs={2} sm={6} md={4} key={report.id}>
                        <Card sx={{
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                            padding:"10px",
                            borderRadius: "16px",
                            transition: "transform 0.3s, background-color 0.3s",
                            '&:hover': {
                                transform: "scale(1.05)",
                                backgroundColor: "#f4f4f4 !important",
                            },
                        }} onClick={()=>(userRole === 'TEACHER' && handleReportClick(report.id))}>
                          <Box p={2}>
                            <Typography variant="h6" color="textSecondary">
                              {(userRole === 'TEACHER' ? `Student: ${report.userName}` : `Teacher: ${report.teacherName}` )}  
                            </Typography>
                            <Typography variant="h7" color="textSecondary">
                               {(userRole === 'TEACHER' ? report.description : report.answerText )}
                            </Typography>
                            <Typography variant="h6" sx={{marginTop:"4vh"}} color="textSecondary">
                               {(userRole === 'TEACHER' ? report.reportDate.substring(0,10) : report.answerDate.substring(0,10) )} 
                            </Typography>
                        </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                {openDetailsModal &&(
                    <ReportsModal data={reportDetails} openModal={openDetailsModal} onCloseModal={closeDetailsModal}/>
                )}
        </Box>
    )
}

export default Reports;