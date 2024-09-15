import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Typography from '@mui/material/Typography';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Document,Page, pdfjs } from 'react-pdf';
import { Box, Card, Grid } from '@mui/material';
import FileService from '../../services/FileService';
import axios from 'axios';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  dropzone: {
    cursor: 'pointer',
    border: '2px dashed #aaa',
    textAlign: 'center',
  },
  fileList: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '20px',
  },
  fileName: {
    marginTop: '4vh',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'wrap',
  },
};

const LearningMaterials = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileService = new FileService();
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7258/api/File/get-files/${userId}`);
        setUploadedFiles(response.data);
      } catch (error) {
        console.error('Błąd podczas pobierania plików:', error.message);
      }
    };

    fetchData();
  }, [userId]);
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0 && acceptedFiles[0].type === 'application/pdf') {
        const file = acceptedFiles[0];

        const formData = new FormData();
        formData.append('file', file);
        try{
            fileService.addFile(formData,userId).then((response)=>{
                console.log(response.data)
            if (response.status === 200) {
                const uploadedFile =  response.data;
                console.log('File sent successfully:', uploadedFile);
                setUploadedFiles((prevFiles) => [...prevFiles, uploadedFile]);
              } else {
                console.error('Error uploading file:', response.statusText);
              }
            });
            
            } catch (error) {
              console.error('Error uploading file:', error.message);
            }
    } else {
      alert('Please release the PDF file.');
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleClick = async (uploadedFile) => {
    try {
      const response = await fetch(`https://localhost:7258/api/File/download/${uploadedFile.id}`);
      const blob = await response.blob();
      
      const dataUrl = URL.createObjectURL(blob);

      if (dataUrl) {
        window.open(dataUrl, '_blank');
      } else {
        console.error('Błędny format danych PDF.');
      }
    } catch (error) {
      console.error('Błąd podczas otwierania pliku:', error);
    }
  };
  
  
  
  

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'auto', '&::-webkit-scrollbar': { display: 'none' } }}>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '5vh' }}>
        <Box {...getRootProps()} style={styles.dropzone} sx={{ marginBottom: '1vh', padding: '5vh 0', width: '80%' }}>
          <input {...getInputProps()} />
          <Typography variant="h6">Drag a PDF file or click here to add it</Typography>
        </Box>
      </Box>
      <Box className="flashCardBox" sx={{ padding: '2vh 10vh' }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {uploadedFiles.map((file, index) => (
            <Grid item xs={2} sm={6} md={4} key={index} onClick={() => handleClick(file)}>
              <Card
                sx={{
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                  padding: '10px',
                  borderRadius: '16px',
                  transition: 'transform 0.3s, background-color 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    backgroundColor: '#f4f4f4 !important',
                  },
                }}
              >
                <Box p={2}>
                  <Box sx={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center', marginTop: '4vh' }}>
                    <InsertDriveFileIcon style={{ fontSize: 100, color: 'rgb(78, 1, 78)' }} />
                  </Box>
                  <Typography variant="body2" sx={styles.fileName} color="textSecondary">
                    {file.fileName}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

    </Box>
  );
};

export default LearningMaterials;
