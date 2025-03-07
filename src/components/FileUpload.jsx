import React, { useState } from "react";
import { 
  Box, Button, LinearProgress, Typography, 
  IconButton, useTheme 
} from "@mui/material";
import { CloudUpload, Pause, Cancel } from "@mui/icons-material";
import { styled } from "@mui/system";

const UploadContainer = styled(Box)(({ theme }) => ({
  width: "100%", // Responsive width
  maxWidth: 500, // Prevents excessive width on large screens
  padding: 20,
  margin: "20px auto", // Centers it
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: 10,
  textAlign: "center",
  backgroundColor: theme.palette.background.paper,
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  "@media (max-width: 600px)": {
    maxWidth: "90%", // Adjust for smaller screens
  },
}));

const UploadProgressContainer = styled(Box)(({ theme }) => ({
  marginTop: 10,
  padding: 10,
  backgroundColor: theme.palette.background.default,
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  boxShadow: theme.shadows[2],
  "@media (max-width: 600px)": {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
}));

const HiddenInput = styled("input")({
  display: "none",
});

const FileUpload = () => {
  const theme = useTheme();
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [paused, setPaused] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setProgress(0);
      setUploading(true);
      setPaused(false);
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      if (!paused) {
        currentProgress += 10;
        setProgress(currentProgress);
        if (currentProgress >= 100) {
          clearInterval(interval);
          setUploading(false);
        }
      }
    }, 500);
  };

  const handlePauseResume = () => {
    setPaused((prevPaused) => !prevPaused);
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setProgress(0);
    setUploading(false);
    setPaused(false);
  };
  return (
    <UploadContainer>
      {console.log(selectedFile)}
      <label htmlFor="file-upload">
        <HiddenInput id="file-upload" type="file" onChange={handleFileChange} />
        <Button
          component="span"
          variant="contained"
          startIcon={<CloudUpload />}
          sx={{ backgroundColor: theme.palette.primary.main }}
        >
          Browse Photo
        </Button>
      </label>

      {selectedFile && (
        <UploadProgressContainer>
          <Box flex={1}>
            <Typography variant="body2">
              {uploading ? "Uploading..." : "Upload Complete"}
            </Typography>
            <Typography variant="caption">{progress}%</Typography>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ marginTop: 1, width: "100%" }} 
            />
          </Box>
          <Box>
            <IconButton onClick={handlePauseResume}>
              {paused ? (
                <CloudUpload sx={{ color: theme.palette.primary.main }} />
              ) : (
                <Pause sx={{ color: theme.palette.primary.main }} />
              )}
            </IconButton>
            <IconButton onClick={handleCancel}>
              <Cancel sx={{ color: theme.palette.error.main }} />
            </IconButton>
          </Box>
        </UploadProgressContainer>
      )}
    </UploadContainer>
  );
};

export default FileUpload;
