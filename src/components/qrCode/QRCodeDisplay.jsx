import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import printJS from "print-js";
import { Button, Box, Typography } from "@mui/material";

const QRCodeDisplay = ({ text, qrCode, qrOptions }) => {
  const [qrImage, setQrImage] = useState("");

  useEffect(() => {
    if (qrCode) {
      const canvas = document.getElementById("qr-canvas");
      if (canvas) {
        setQrImage(canvas.toDataURL("image/png"));
      }
    }
  }, [qrCode]);

  const handlePrint = () => {
    if (qrImage) {
      printJS({
        printable: qrImage,
        type: "image",
        header: "QR Code",
        documentTitle: "QR Code",
        style: `
          @media print {
            body {
              width: 58mm; /* Set width for thermal printer */
              margin: 0;
              padding: 0;
            }
            img {
              max-width: 100%;
              display: block;
              margin: 0 auto;
            }
          }
        `,
      });
    } else {
      console.warn("QR code is not ready for printing.");
    }
  };

  const handleDownload = () => {
    if (qrImage) {
      const link = document.createElement("a");
      link.href = qrImage;
      link.download = "qr_code.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!qrCode) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6">No QR Code generated</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mt: 3,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <QRCodeCanvas
        id="qr-canvas"
        value={text}
        size={qrOptions.size}
        fgColor={qrOptions.fgColor}
        bgColor={qrOptions.bgColor}
        includeMargin={true}
      />

      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrint}
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          🖨️ Print QR Code
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleDownload}
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          📥 Download QR Code
        </Button>
      </Box>
    </Box>
  );
};

export default QRCodeDisplay;
