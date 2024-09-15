import React, { useCallback, useEffect, useState } from 'react';
import ForumService from '../../services/ForumService';
import { Box, Button, Card, Grid, Input, TextField, Typography } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import { AddPostModal } from '../Modals/AddPostModal';
function Forum() {
  const [authorId,setAuthorId]=useState('');
  const [forumQuestions,setForumQuestions]=useState([]);
  const [originalForumQuestions, setOriginalForumQuestions]=useState([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [replyClicked, setReplyClicked]=useState(false);
  const [commentsClicked,setCommentsClicked]=useState(false);
  const [commentText, setCommentText]=useState('');
  const [titleText, setTitleText]=useState("");
  const [questionDescriptionText,setQuestionDescriptionText]=useState("");
  const [commentIdToDelete, setCommentIdToDelete]=useState(null);
  const [questionIdToDelete, setQuestionIdToDelete]=useState(null);
  const [saveClicked, setSaveClicked] = useState(false);
  const [saveEditClicked,setSaveEditClicked]=useState(false);
  const [saveQuestionEditClicked,setSaveQuestionEditClicked]=useState(false);
  const [editMode,setEditMode]=useState(false);
  const [questionEditMode,setQuestionEditMode]=useState(false);
  const [filterMode,setFilterMode]=useState(false);
  const [addQuestionMode, setAddQuestionMode]=useState(false);
  const [success, setSuccess]=useState(false);
  const closeAddQuestionModal =()=>setAddQuestionMode(false);
  const forumService = new ForumService();

  useEffect(() => {
    const senderId = localStorage.getItem("userId");
    setAuthorId(senderId);
    forumService.getAllForumQuestions().then((response) => {
      setForumQuestions(response)
      setOriginalForumQuestions(response)
    });
  }, []);
  const handleButtonClicked = (name, questionId) => {
    if (name === "comments") {
      setReplyClicked(false);
      if (questionId !== selectedQuestionId) {
        setCommentsClicked(true);
      } else {
        setCommentsClicked((prev) => !prev);
      }
      setSelectedQuestionId(questionId);
    }  else if (name === "reply") {
      setCommentsClicked(false);
      if (questionId !== selectedQuestionId) {
        setReplyClicked(true);
      } else {
        setReplyClicked((prev) => !prev);
      }
      setSelectedQuestionId(questionId);
    }
  };
  const handleSuccess = (success) => {
    if (success) {
      console.log(success)
      setSuccess(success)
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const updatedQuestions = await forumService.getAllForumQuestions();
        setForumQuestions(updatedQuestions);
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };
  
    if (commentIdToDelete !== null){
      forumService.deleteComment(commentIdToDelete).then(fetchData);
      setCommentIdToDelete(null);
    }
    else if(questionIdToDelete !== null){
        forumService.deleteQuestion(questionIdToDelete).then(fetchData);
        setQuestionIdToDelete(null);
    } else if (saveClicked) {
      forumService.addComment(authorId, commentText, selectedQuestionId).then(fetchData);
      setReplyClicked(false);
      setCommentText("");
      setSaveClicked(false);
    }else if(saveEditClicked){
      console.log(selectedCommentId,commentText)
      forumService.editComment(selectedCommentId,commentText).then(fetchData);
      setCommentText("");
      setSaveEditClicked(false);
      setEditMode(false);
    }
    else if(saveQuestionEditClicked){
      console.log(selectedQuestionId,titleText,questionDescriptionText)
      forumService.editQuestion(selectedQuestionId,titleText,questionDescriptionText).then(fetchData);
      setTitleText("");
      setQuestionDescriptionText("");
      setSaveQuestionEditClicked(false);
      setQuestionEditMode(false);
    }
    else if(success){
      fetchData();
      setSuccess(false);
    }
    
  }, [saveClicked,commentIdToDelete,questionIdToDelete,saveEditClicked,success,saveQuestionEditClicked]);
  const handleCancelClick=()=>{
    setReplyClicked(false);
  }
  const handleDeleteClick=(commentId)=>{
    setCommentIdToDelete(commentId);
  }
  const handleFilter = useCallback((text) => {
    if (text.trim() === '') {
      setForumQuestions(originalForumQuestions);
    } else {
      const filteredQuestions = originalForumQuestions.filter((question) => {
        return question.title.includes(text);
      });
      setForumQuestions(filteredQuestions);
    }
  }, [originalForumQuestions]);
  console.log(commentText)
  console.log(forumQuestions)
  return (
    <Box sx={{width:"100%",height:"100%",overflow:"auto",'&::-webkit-scrollbar':{display:"none"} }}>
      <Box sx={{width:"100%", display:"flex",justifyContent:"flex-end", marginTop:"3vh"}}>
        {filterMode && (
          <Box p={2} sx={{
            width:"60%",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
            borderRadius: "16px",
            marginRight:"15vh",
            display:"flex",
            justifyContent:"center"}}>
              <Input placeholder='Enter text...' sx={{width:"90%"}} onChange={(e)=>handleFilter(e.target.value)}></Input>
          </Box>
        )}
        <Box sx={{width:"8%", display:"flex",justifyContent:"space-between", marginRight:"2vh"}}>
          <AddIcon sx={{color:"white",backgroundColor:"rgb(78, 1, 78)", padding:"4px 12px"}} onClick={()=>setAddQuestionMode(true)}/>
          <FilterAltIcon sx={{color:"white",backgroundColor:"rgb(78, 1, 78)", padding:"4px 12px"}} onClick={()=>setFilterMode((prev)=>!prev)}/>
        </Box>
      </Box>
      <Box className='flashCardBox' sx={{padding:"2vh 10vh",marginTop:"3vh"}}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {forumQuestions.map((question) => (
            <Grid key={question.id} item xs={12} >
              <Card
                sx={{
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                  height:"25vh",
                  borderRadius: "16px",
                  transition: "transform 0.3s, background-color 0.3s",
                  '&:hover': {
                    transform: "scale(1.05)",
                    backgroundColor: "#f4f4f4 !important",
                  },
                }}
              >
                <Box sx={{width:"100%",height:"100%"}}>
                  <Box
                    p={2}
                    sx={{
                      width: "98%",
                      height: "10%",
                      backgroundColor: "rgb(78, 1, 78)",
                      display:"flex",
                      justifyContent:"space-between" 
                    }}
                  >
                    {(questionEditMode && selectedQuestionId === question.id) ? (
                      <Box>
                        <Input value={titleText} onChange={(e)=>setTitleText(e.target.value)}></Input>
                      </Box>
                    ):(
                      <Typography variant="h5" sx={{ marginBottom: "1vh", color: "white", margin: " 0" }} color="primary">
                        {question.title}
                      </Typography>
                    )}
                    {authorId === question.authorId && (
                      <Box>
                        <ModeEditIcon color="primary" onClick={()=>{setQuestionEditMode(true);setTitleText(question.title);setSelectedQuestionId(question.id);setQuestionDescriptionText(question.description)}}/>
                        <DeleteIcon color="error" onClick={()=>setQuestionIdToDelete(question.id)}/>
                      </Box>
                    )}
                  </Box>
                  <Box p={2} sx={{ display: 'flex', flexDirection: 'column',height:"55%",justifyContent:"space-between" }}>
                    
                    {(questionEditMode && selectedQuestionId === question.id) ? (
                      <Box>
                        <Input value={questionDescriptionText} onChange={(e)=>setQuestionDescriptionText(e.target.value)}></Input>
                      </Box>
                    ):(
                      <Typography variant="body1" color="textPrimary">
                      {question.description}
                    </Typography>
                    )}
                    <Typography variant="body2" color="textSecondary">
                      {question.timestamp.slice(0,10)}
                    </Typography>
                    <Box sx={{width:"100%",display:"flex",justifyContent:"space-between"}}>
                      <Typography variant="h6" color="textSecondary">
                        {question.authorName}
                      </Typography>
                      {(questionEditMode && selectedQuestionId === question.id) ? (
                      <Box>
                          <Button onClick={()=>setQuestionEditMode(false)}>
                            Cancel
                          </Button>
                          <Button onClick={()=>setSaveQuestionEditClicked(true)}>
                            Save
                          </Button>
                      </Box>
                      ):(
                        <Box>
                          <Button name="reply" variant='filled' sx={{
                            '& span':{width:"100%"},
                            borderRadius:"16px",
                            }} onClick={(e)=>handleButtonClicked(e.currentTarget.getAttribute('name'),question.id)}>
                            <Typography sx={{fontSize:"16px",color: "rgb(78, 1, 78)"}}>
                              Reply
                            </Typography>
                          </Button>
                          <Button  name="comments" variant='filled' sx={{
                            '& span':{width:"100%"},
                            borderRadius:"16px",
                            }} onClick={(e)=>handleButtonClicked(e.currentTarget.getAttribute('name'),question.id)}>
                            <Typography sx={{fontSize:"16px",color: "rgb(78, 1, 78)"}}>
                              Comments: {question.commentsList.length}
                            </Typography>
                          </Button>
                      </Box>
                      )}  
                    </Box>
                  </Box>
                </Box>   
              </Card>
              {(commentsClicked && selectedQuestionId === question.id) && (
                <Box sx={{
                  width:"100%",
                  display:"flex",
                  justifyContent:"flex-end"
                }}>
                  <Box sx={{
                    width:"90%",
                }}>
                    {question.commentsList.map((comment) => (
                        <Box key={comment.id} p={2} sx={{
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                          borderRadius: "16px",
                          marginTop:"2vh"
                        }}>
                          {(editMode && selectedCommentId === comment.id) ? (
                            <Box>
                              <Input value={commentText} onChange={(e)=>setCommentText(e.target.value)} sx={{width:"100%"}}></Input>  
                            </Box>
                          ):(
                            <Box>
                              <Typography key={comment.id} variant="body1"color="textprimary">
                                {comment.descritpion}
                              </Typography>
                            </Box>
                          )}
                          
                          <Typography variant="body2" color="textSecondary">
                          {comment.timestamp.slice(0,10)}
                          </Typography>
                          <Box sx={{width:"100%",display:'flex',justifyContent:"space-between"}}>
                            <Typography variant="h7" color="textSecondary">
                              {comment.authorName}
                            </Typography>
                            {authorId === comment.authorId && (
                              <>
                                {(editMode && selectedCommentId === comment.id) ? (
                                  <Box>
                                    <Button onClick={()=>setEditMode(false)}>
                                      Cancel
                                    </Button>
                                    <Button onClick={()=>setSaveEditClicked(true)}>
                                      Save
                                    </Button>
                                  </Box>
                                ) : (
                                  <Box>
                                    <ModeEditIcon color="primary" onClick={() => {setEditMode(true);setSelectedCommentId(comment.id); setCommentText(comment.descritpion) }} />
                                    <DeleteIcon color="error" onClick={() => handleDeleteClick(comment.id)} />
                                  </Box>
                                )}
                              </>
                            )}
                          </Box>
                        </Box>
                    ))}
                  </Box>
                </Box>
              )}
              {(replyClicked && selectedQuestionId === question.id) && (
                <Box sx={{
                  marginTop:"2vh",
                  padding:"2vh 1vh",
                  width:"98.5%",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                  borderRadius: "16px",
                  display:"flex",
                  flexDirection:"column",
                  justifyContent:"center",
                  alignItems:"center"
                }}>
                  <TextField variant='standard'label='Add comment' onChange={(e)=>setCommentText(e.target.value)} sx={{width:"95%"}}></TextField>
                  <Box sx={{
                    width:"100%",
                    display:"flex",
                    justifyContent:"flex-end"
                    }}>
                    <Button name="cancel" variant='filled' sx={{
                            '& span':{width:"100%"},
                            borderRadius:"16px",
                            }} onClick={handleCancelClick}>
                            <Typography sx={{fontSize:"16px",color: "rgb(78, 1, 78)"}}>
                              Cancel
                            </Typography>
                          </Button>
                          <Button  name="comments" variant='filled' sx={{
                            '& span':{width:"100%"},
                            borderRadius:"16px",
                            }} onClick={()=>setSaveClicked(true)} >
                            <Typography sx={{fontSize:"16px",color: "rgb(78, 1, 78)"}}>
                              Save
                            </Typography>
                          </Button>
                  </Box>
                </Box>
              )}     
            </Grid>
          ))}  
        </Grid> 
      </Box>
      {addQuestionMode && (
      <AddPostModal openModal={addQuestionMode} onCloseModal={closeAddQuestionModal} onSuccess={handleSuccess}/>
    )}
    </Box>
    
  )
}

export default Forum;
