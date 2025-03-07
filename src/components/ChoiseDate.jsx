import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import {
  CalendarToday,
  ArrowDropDown,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";

const CustomDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [tempDate, setTempDate] = useState(dayjs()); 
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

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
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        
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
          <Typography>{selectedDate ? selectedDate.format("DD.MM.YYYY") : "Select a date"}</Typography>
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
          <Box sx={{ padding: 2, backgroundColor: "white", borderRadius: "8px" }}>
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
              <Button variant="contained" color="error" onClick={handleRemove}>
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
  );
};

export default CustomDatePicker;
