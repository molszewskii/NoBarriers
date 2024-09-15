import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Slider from "react-slick";
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const ViewTestModal = ({ key, openModal, onCloseModal, data }) => {
  const [open, setOpen] = useState(false);
  const [testDetails, setTestDetails] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOpen(openModal);
    setTestDetails(data);
  }, [openModal,data]);

  useEffect(() => {
    const allOptions = testDetails.map((option) => option.options);
    setOptions(allOptions);
  }, [testDetails]);

  const handleClose = () => {
    setOpen(false);
    onCloseModal();
    setTestDetails([])
    setOptions([])
  };
  console.log(testDetails)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  if (testDetails.length === 0 || options.length === 0) {
    return null;
  }
  return (
    <Modal open={open} onClose={handleClose} sx={{display:"flex",justifyContent:"center",alignContent:"center"}}>
        <Box style={{display:"flex",justifyContent:'center',alignItems:"center"}}>
            <Slider {...settings}>
                {testDetails?.map((question,index) => (
                <Box
                    key={question.id}
                    sx={{
                        width:"50vh",
                        height:"50vh",
                    backgroundColor: "background.paper",
                    padding: "0",
                    borderRadius: "20px",
                    }}
                >
                    <Box
                    sx={{
                        width: "100%",
                        height: "33%",
                        backgroundColor: "lightgray",
                        borderTopLeftRadius:"20px",
                        borderTopRightRadius:"20px",
                        overflow:"auto"
                    }}
                    >
                    <Typography key={question.id} variant="h5" sx={{marginLeft:"3vh",marginTop:"8vh"}}>{question.questionText}</Typography>
                    </Box>
                    <Box
                    sx={{
                        width: "100%",
                        height: "67%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent:"center"
                    }}
                    >
                    <FormControl>
                        <RadioGroup className="radiogroup-testview"sx={{'&.MuiTypography-root .span':{width:"100%"}}}>
                            {options[index]?.map((option) => (
                                    <FormControlLabel 
                                        key={option.id}
                                        value={option.optionText}
                                        control={<Radio />}
                                        label={option.optionText}
                                    />
                            ))}
                        </RadioGroup>
                    </FormControl>
                    </Box>
                </Box>
                ))}
            </Slider>
        </Box>
    </Modal>
  );
};
