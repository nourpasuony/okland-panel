import React from "react";
import { Typography, Grid, Box, Tooltip, LinearProgress } from "@mui/material";
import calculateWarrantyProgress from "../../utils/calcWarrantyProgress";

const ProductDetails = ({ product }) => {
  const { warrantyProgress } = calculateWarrantyProgress(
    product.warrantyStartDate,
    product.productId.warrantyEndDate
  );

  const formattedWarrantyEndDate = new Date(product?.productId?.warrantyEndDate)
    .toISOString()
    .split("T")[0]
    .replace(/-/g, "/");

  return (
    <Box sx={{ height: "100vh", width: "100%", margin: "0 auto", py: 4 }}>
      <Box mb={4} textAlign="center">
        <Typography variant="body1" fontWeight="bold">
          Warranty Progress
        </Typography>
        <Tooltip title={`Warranty expires on: ${formattedWarrantyEndDate}`}>
        <LinearProgress
            variant="determinate"
            value={100 - warrantyProgress}
            sx={{
              height: 8,
              borderRadius: 1,
              mt: 1,
              "& .MuiLinearProgress-bar": { backgroundColor: "#FF9933" },
            }}
          />
        </Tooltip>
      </Box>

      <Grid
        container
        spacing={10}
        alignItems="center"
        sx={{ minHeight: "70vh" }}
      >
        {/* Left Side - Product Image */}
        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <Box
            component="img"
            src={product?.productId?.image || "/src/assets/images/background.jpg"}
            alt={product?.productId?.productName || "Product"}
            sx={{
              width: { xs: 180, sm: 220, md: 250 },
              height: { xs: 180, sm: 220, md: 250 },
              borderRadius: "50%",
              border: "3px solid #FF5722",
              objectFit: "cover",
              animation: "pulsate-fwd 1.5s infinite ease-in-out",
            }}
          />
        </Grid>

        {/* Right Side - Product Information */}
        <Grid item xs={12} md={6} textAlign="center">
          <Typography variant="h5" fontWeight="bold">
            {product?.productId?.productName}
          </Typography>

          <Typography variant="h6" color="#FF9933" mt={1}>
            Warranty expires on:{" "}
            <Typography  color="#F00" component="span">
              {formattedWarrantyEndDate}
            </Typography>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mt: 2,
              wordBreak: "break-word",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {/* dawdawdawdawdlk;mklqkwmdlkqwmdlkmqlkdmalkdmlkawmdlamd */}
            {product?.productId?.productDescription || "No description available."}
          </Typography>
        </Grid>
      </Grid>

      <style>
        {`
          @keyframes pulsate-fwd {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </Box>
  );
};

export default ProductDetails;
