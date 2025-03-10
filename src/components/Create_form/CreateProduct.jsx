import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCodeDisplay from "../qrCode/QRCodeDisplay";
import {
  CssBaseline,
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Grid,
  TextareaAutosize,
  LinearProgress,
  useMediaQuery,
} from "@mui/material";
import demoTheme from "../../theme";

const API_BASE_URL = "http://92.112.181.199:5000/api/v1";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [productId, setProductId] = useState(null);
  const isSmallScreen = useMediaQuery(demoTheme.dark.breakpoints.down("md"));

  const initialProductState = {
    productName: "",
    productType: "",
    productDescription: "",
    warrantyPeriod: "",
    warrantyPeriodUnit: "days",
  };

  const [product, setProduct] = useState(initialProductState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setQrCode(null);

    try {
      const { data } = await axios.post(`${API_BASE_URL}/create-Product`, product);
      const newProductId = data.product._id;

      if (!newProductId) {
        throw new Error("Invalid product ID received.");
      }

      setProductId(newProductId); 
      await generateQRCode(newProductId);
      setSuccess(true);
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "You Should Enter Unique Name");
    } finally {
      setLoading(false);
    }
  };

  const generateQRCode = async (id) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/generate-qrcode/${id}`);
      if (data.qrCode) {
        setQrCode(data.qrCode);
      } else {
        throw new Error("Failed to generate QR code.");
      }
    } catch (err) {
      setError("Error generating QR code.");
    }
  };

  const resetForm = () => setProduct(initialProductState);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <CssBaseline />
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {isSmallScreen ? "New Product" : "Create New Product"}
        </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Product Name" name="productName" value={product.productName} onChange={handleInputChange} sx={{ mb: 3 }} />
          <TextField fullWidth label="Product Type" name="productType" value={product.productType} onChange={handleInputChange} sx={{ mb: 3 }} />
          <TextField fullWidth label="Warranty Period" name="warrantyPeriod" type="number" value={product.warrantyPeriod} onChange={handleInputChange} sx={{ mb: 3 }} />
          <TextareaAutosize minRows={4} placeholder="Product Description" name="productDescription" value={product.productDescription} onChange={handleInputChange} style={{ width: "100%", padding: "10px", borderRadius: "8px", borderColor: "#ccc", marginBottom: "16px" }} />
        </Grid>
      </Grid>
      {loading && <LinearProgress sx={{ mb: 3 }} />}
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="green">Product created successfully!</Typography>}
      {qrCode && (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h6">Generated QR Code</Typography>
          <QRCodeDisplay text={`http://localhost:5173/product/${productId}`} qrCode={qrCode} qrOptions={{ size: 200, fgColor: "#000000", bgColor: "#ffffff" }} />
        </Box>
      )}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button variant="outlined" onClick={() => navigate("/products/show-Product")}>Back to List</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>{loading ? "Saving..." : "Save Product"}</Button>
      </Box>
    </Container>
  );
};

export default CreateProduct;
