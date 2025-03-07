import { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box } from "@mui/material";

const QRCodeGenerator = () => {
  const [qrCode, setQrCode] = useState(null);
  const [text, setText] = useState("");
  const [qrOptions, setQrOptions] = useState({
    size: 200,
    fgColor: "#000000",
    bgColor: "#ffffff",
  });

  const generateQRCode = async () => {
    if (!text.trim()) return alert("Please enter text");

    try {
      const response = await axios.get(
        "http://92.112.181.199:5000/api/v1/generate-qrcode/",
        {
          headers: {
            "Product-ID": "67b366496df88e6f71c1702a",
          },
          params: {
            text: text,
          },
        }
      );

      if (response.data.qrCode) {
        setQrCode(response.data.qrCode);
      } else {
        alert("Failed to generate QR code.");
      }
    } catch (error) {
      console.error("Error generating QR:", error);
      alert("Error generating QR code.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Typography variant="h5" gutterBottom>
        QR Code Generator
      </Typography>

      <TextField
        label="Enter text"
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" onClick={generateQRCode} sx={{ mb: 2 }}>
        Generate QR Code
      </Button>

      {qrCode ? (
        <img
          src={qrCode}
          alt="QR Code"
          width={qrOptions.size}
          height={qrOptions.size}
        />
      ) : (
        <Typography variant="body2" color="textSecondary">
          No QR code generated yet.
        </Typography>
      )}
    </Box>
  );
};

export default QRCodeGenerator;
