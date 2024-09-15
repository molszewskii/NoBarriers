import React, { useEffect, useState } from "react";
import TestService from "../services/TestService";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import TestCard from "./Test/TestCard";
import FlashCardModal from "./VocabLevels/FlashCardModal";


export const TestPage =()=>{
    const testService = new TestService();
    const [testsFiltered, setTestsFiltered] = useState([]);
    const [tests, setTests]=useState([])
    const [teachers, setTeachers] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [openFlashCard, setOpenFlashCard]=useState(false)
    const [flashCards, setFlashCards]=useState([]);
    const handleFlashCardToggle = (isOpen) => {
      if(isOpen){
        setOpenFlashCard(true);
      }
  };
  const handleFlashCardData=(data)=>{
      setFlashCards(data);
  }
  const handleCategoryFilter = (category) => {
    const filteredTests = tests.filter((test)=> test.categoryName === category);
    setTestsFiltered(filteredTests);
    setSelectedCategory(category);
  };

  const renderCategories = () => {
    const uniqueCategories = [...new Set(tests.map(test => test.categoryName))];
    return uniqueCategories.map((category) => (
      <Button
        key={category}
        sx={{
          borderBottom: selectedCategory === category ? '1px solid purple' : '1px solid white',
          color: 'black',
          '&:hover': {
            borderBottom: '1px solid purple',
          },
          marginTop:"-2vh",
          marginBottom:"2vh"
        }}
        onClick={() => handleCategoryFilter(category)}
      >
        {category}
      </Button>
    ));
  };

  const filteredTests = selectedCategory
    ? tests.filter((test) => test.categoryName === selectedCategory)
    : tests;
    useEffect(()=>{
        testService.getAllTeachers().then((data)=>{
            setTeachers(data)});
        testService.getAllTests().then((data)=>setTests(data));
    },[])

    const filterByAuthor = (name, surname) => {
        const filteredTests = tests.filter(test => {
            const authorFullName = `${test.author}`;
            return authorFullName === `${name} ${surname}`;
        });
        setTestsFiltered(filteredTests);
    };
    if(teachers.length === 0 || tests.length === 0){
        return null;
    }
    return (
      <Box sx={{ width: "100%", height: "90vh", display: "flex" }}>
          {openFlashCard ? (
            <Box className="background">
              <Box className='flashCardBox'>
                <Typography color={'white'} mt={'3vh'} onClick={()=>setOpenFlashCard(false)}>X</Typography>
                <FlashCardModal flashCards={flashCards} />
              </Box>
              </Box>
          ) : (
              <>
                  <Box sx={{ width: "20%", height: "100%", backgroundColor: "#1E1E1E" }}>
                      <Box sx={{ width: "100%", height: "10%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                          <Typography variant="h5" sx={{ color: "white" }}>LIST OF TEACHERS</Typography>
                      </Box>
                      <Box sx={{ width: "100%", height: "90%", display: "flex", flexDirection: "column", textAlign: "center", overflow: "auto" }}>
                          {teachers.map((teacher, index) => (
                              <Button sx={{
                                  borderBottom: "1px solid #333333",
                                  height: "10vh",
                                  color: "white",
                                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                  margin: "10px 0",
                                  borderRadius: "8px",
                                  '& span': { width: "100%" },
                                  '&:hover': {
                                      backgroundColor: "#555555"
                                  },
                              }} key={index} onClick={() => filterByAuthor(teacher.userName, teacher.surname)}>{teacher.userName + " " + teacher.surname}</Button>
                          ))}
                      </Box>
                  </Box>
                  <Box sx={{ width: "80%", height: "76vh", overflow: "auto", '&::-webkit-scrollbar': { display: "none" }, padding: "7vh" }}>
                      <Box sx={{ width: "20%", display: "flex", justifyContent: "space-between" }}>
                          {renderCategories()}
                      </Box>
                      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                          {(selectedCategory || testsFiltered.length > 0) ? (
                              testsFiltered.map((test) => (
                                  <TestCard key={test.id} test={test} onFlashCardToggle={handleFlashCardToggle} flashCardData={handleFlashCardData} />
                              ))
                          ) : (
                              tests.map((test) => (
                                  (selectedCategory && test.categoryName === selectedCategory) || !selectedCategory ? (
                                      <TestCard key={test.id} test={test} onFlashCardToggle={handleFlashCardToggle} flashCardData={handleFlashCardData} />
                                  ) : null
                              ))
                          )}
                      </Grid>
                  </Box>
              </>
          )}
      </Box>
  );
}