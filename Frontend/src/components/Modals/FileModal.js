import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const FileModal = ({ open, handleClose, files, handleFileSelect }) => {
  const [selectedRowId, setSelectedRowId] = useState(null);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "fileName", headerName: "File Name", width: 200 },
    { field: "uploadDate", headerName: "Upload Date", width: 200 },
  ];

  const handleRowClick = (params) => {
    const { id } = params.row;

    if (selectedRowId === id) {
      setSelectedRowId(null);
    } else {
      setSelectedRowId(id);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modalBox" sx={{ backgroundColor: 'background.paper', width: "600px", height: "400px", padding: "20px", outline: "none" }}>
        <Typography variant="h6">Select a File</Typography>
        <div style={{ height: 300, width: '100%' }}>
          <DataGrid
            rows={files}
            columns={columns}
            pageSize={5}
            onRowClick={handleRowClick}
            checkboxSelection={false}
            selectionModel={selectedRowId ? [selectedRowId] : []}
          />
        </div>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "20px", width:"100%", justifyContent:"space-evenly" }}>
          <Button
            sx={{ width: '10rem', backgroundColor: 'rgb(78, 1, 78)', color: 'white', '&:hover': { backgroundColor: 'rgb(78, 1, 78)' } }}
            variant="filled"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            sx={{ width: '10rem', backgroundColor: 'rgb(78, 1, 78)', color: 'white', '&:hover': { backgroundColor: 'rgb(78, 1, 78)' } }}
            variant="filled"
            onClick={() => {
              if (selectedRowId) {
                const selectedFile = files.find((file) => file.id === selectedRowId);
                if (selectedFile) {
                  handleFileSelect(selectedFile);
                }
              }
            }}
          >
            Select
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FileModal;
