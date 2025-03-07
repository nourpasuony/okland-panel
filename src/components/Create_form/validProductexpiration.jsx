import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  TextField,
  Typography,
  Container,
  CssBaseline,
  ThemeProvider,
  Button,
  Box,
  LinearProgress,
  IconButton,
  Snackbar,
  Alert,
  Popover,
} from "@mui/material";
import {
  CloudUpload,
  Pause,
  Cancel,
  CalendarToday,
  ArrowDropDown,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import demoTheme from "../../theme";

// const PRODUCT_ID = "67c4f58af49700838005b4f6";

const UploadContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 500,
  padding: 20,
  margin: "20px auto",
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: 10,
  textAlign: "center",
  backgroundColor: theme.palette.background.paper,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
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
}));

const HiddenInput = styled("input")({ display: "none" });

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const theme = useMemo(
    () => (darkMode ? demoTheme.dark : demoTheme.light),
    [darkMode]
  );
  const toggleDarkMode = useCallback(() => setDarkMode((prev) => !prev), []);

  return { theme, toggleDarkMode };
};

const InputField = ({ label, name, value, onChange }) => (
  <TextField
    fullWidth
    label={label}
    variant="outlined"
    margin="normal"
    name={name}
    value={value}
    onChange={onChange}
  />
);

const FileUploader = ({
  selectedFile,
  progress,
  uploading,
  paused,
  onFileChange,
  onPauseResume,
  onCancel,
}) => (
  <UploadContainer>
    <label htmlFor="file-upload">
      <HiddenInput id="file-upload" type="file" onChange={onFileChange} />
      <Button component="span" variant="contained" startIcon={<CloudUpload />}>
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
          <IconButton onClick={onPauseResume}>
            {paused ? <CloudUpload /> : <Pause />}
          </IconButton>
          <IconButton onClick={onCancel}>
            <Cancel color="error" />
          </IconButton>
        </Box>
      </UploadProgressContainer>
    )}
  </UploadContainer>
);

const ValidateProduct = ({productId}) => {
  const { theme } = useDarkMode();

  const [formData, setFormData] = useState({
    username: "",
    isMobilePhone: "",
    nameshop: "",
    shopnumber: "",
    purchaseDate: "",
    invoicePhoto:""
  });


  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [paused, setPaused] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [tempDate, setTempDate] = useState(dayjs());
  const [anchorEl, setAnchorEl] = useState(null);
  
  const open = Boolean(anchorEl);
  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });
  
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);
  
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

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setTempDate(selectedDate);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemove = () => {
    setSelectedDate(null);
    setAnchorEl(null);
  };
  
  const handleDone = () => {
    setSelectedDate(tempDate);
    setAnchorEl(null);
    setFormData((prev) => {
      const updatedData = { ...prev, purchaseDate: tempDate.format("DD.MM.YYYY") };
      return updatedData;
    });
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
          setSnackbar({
            open: true,
            message: "Upload complete",
            severity: "success",
          });
        }
      }
    }, 500);
  };
  
  const handlePauseResume = () => setPaused((prev) => !prev);
  const handleCancel = () => {
    setSelectedFile(null);
    setProgress(0);
    setUploading(false);
    setPaused(false);
  };

  const activateWarranty = useCallback(async () => {
    try {
      const formDataPayload = new FormData();
      formDataPayload.append("username", formData.username);
      formDataPayload.append("isMobilePhone", formData.isMobilePhone);
      formDataPayload.append("nameshop", formData.nameshop);
      formDataPayload.append("shopnumber", formData.shopnumber);
      formDataPayload.append("purchaseDate", formData.purchaseDate);
      if (selectedFile) {
        formDataPayload.append("invoicePhoto", selectedFile);
      }
  
      const response = await axios.post(
        `http://92.112.181.199:5000/api/v1/activateWarranty/${productId}`,
        formDataPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
        setSnackbar({
        open: true,
        message: "Warranty Activated Successfully!",
        severity: "success",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to activate warranty",
        severity: "error",
      });
    }
  }, [formData, selectedFile]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography variant="h6">User Info</Typography>
        <InputField
          label="Name"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <InputField
          label="Phone"
          name="isMobilePhone"
          value={formData.isMobilePhone}
          onChange={handleChange}
        />
        <Typography variant="h6">Invoice Info</Typography>
        <InputField
          label="Shop Name"
          name="nameshop"
          value={formData.nameshop}
          onChange={handleChange}
        />
        <InputField
          label="Shop Number"
          name="shopnumber"
          value={formData.shopnumber}
          onChange={handleChange}
        />
        <FileUploader
          {...{
            selectedFile,
            progress,
            uploading,
            paused,
            onFileChange: handleFileChange,
            onPauseResume: handlePauseResume,
            onCancel: handleCancel,
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "8px 12px",
                cursor: "pointer",
                minWidth: "250px",
              }}
              onClick={handleOpen}
            >
              <CalendarToday fontSize="small" sx={{ marginRight: 1 }} />
              <Typography>
                {selectedDate
                  ? selectedDate.format("DD.MM.YYYY")
                  : "Select a date"}
              </Typography>
              <ArrowDropDown sx={{ marginLeft: "auto" }} />
            </Box>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              disableEnforceFocus
              disableAutoFocus
            >
              <Box
                sx={{
                  padding: 2,
                  backgroundColor: "white",
                  borderRadius: "8px",
                }}
              >
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  value={tempDate}
                  onChange={(newDate) => setTempDate(newDate)}
                  components={{
                    LeftArrowIcon: ChevronLeft,
                    RightArrowIcon: ChevronRight,
                  }}
                />
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleRemove}
                  >
                    Remove
                  </Button>
                  <Button variant="contained" onClick={handleDone}>
                    Done
                  </Button>
                </Box>
              </Box>
            </Popover>
          </Box>
        </LocalizationProvider>
        <Button
          variant="contained"
          color="primary"
          onClick={activateWarranty}
          sx={{ mt: 2 }}
        >
          Activate Warranty
        </Button>
      </Container>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {typeof snackbar.message === "string"
            ? snackbar.message
            : JSON.stringify(snackbar.message)}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default ValidateProduct;
