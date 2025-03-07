import React from "react";
import useQRCode from "../../hooks/useQRCode";
import QRCodeDisplay from "./QRCodeDisplay";
import { TextField, Button, Box, Typography, Slider } from "@mui/material";

const QrMain = () => {
//   const { text, setText, qrCode, qrOptions, setQrOptions, generateQRCode } =
//     useQRCode();

//   // Handle size change using slider
//   const handleSizeChange = (event, newValue) => {
//     setQrOptions({ ...qrOptions, size: newValue });
//   };

  return (
    <Box >
      <Typography variant="h4">QR Code Generator</Typography>

      {/* Input Field */}
      {/* <TextField
        label="Enter text"
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ mt: 2, width: "80%" }}
      /> */}

      {/* Generate QR Button */}
      <Button
        variant="contained"
        color="primary"
        // onClick={generateQRCode}
        sx={{ mt: 2}}
      >
        Generate QR
      </Button>

      {/* <Box sx={{ mt: 4 }}>
        <Typography variant="h6">QR Customization</Typography>

        <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
          <Typography>Size: {qrOptions.size}</Typography>
          <Slider
            value={qrOptions.size}
            min={100}
            max={500}
            step={10}
            onChange={handleSizeChange}
            sx={{ width: 200, ml: 2 }}
          />
        </Box>

        <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
          <Typography>Foreground: </Typography>
          <TextField
            type="color"
            value={qrOptions.fgColor}
            onChange={(e) =>
              setQrOptions({ ...qrOptions, fgColor: e.target.value })
            }
            sx={{ ml: 2 }}
          />
        </Box>

        <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
          <Typography>Background: </Typography>
          <TextField
            type="color"
            value={qrOptions.bgColor}
            onChange={(e) =>
              setQrOptions({ ...qrOptions, bgColor: e.target.value })
            }
            sx={{ ml: 2 }}
          />
        </Box>
      </Box>

      <QRCodeDisplay text={text} qrCode={qrCode} qrOptions={qrOptions} /> */}
    </Box>
  );
};

export default QrMain;
