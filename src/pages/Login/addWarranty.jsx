import React, { memo } from "react";
import { Box, Grid, Paper } from "@mui/material";
import ValidateProduct from "../../components/Create_form/validProductexpiration";

const styles = {
  container: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    p: { xs: 2, sm: 4 },
  },
  paper: {
    maxWidth: 900,
    width: "100%",
    p: { xs: 2, sm: 4 },
    borderRadius: 2,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
  },
  image: {
    width: { xs: 150, sm: 200, md: 250 },
    height: { xs: 150, sm: 200, md: 250 },
    borderRadius: "50%",
    border: "2px solid #FF5722",
    objectFit: "cover",
    animation: "pulsate-fwd 1.5s infinite ease-in-out",
    "@keyframes pulsate-fwd": {
      "0%": { transform: "scale(1)" },
      "50%": { transform: "scale(1.1)" },
      "100%": { transform: "scale(1)" },
    },
  },
};

const AddWarranty = memo(({productId}) => (
  <Box sx={styles.container}>
    <Paper elevation={3} sx={styles.paper}>
      <Grid container spacing={3} alignItems="center">
        {/* Left Side */}
        <Grid item xs={12} md={4} sx={styles.imageContainer}>
          <Box component="img" src="/src/assets/images/background.jpg" alt="Meeting" sx={styles.image} />
        </Grid>

        {/* Right Side */}
        <Grid item xs={12} md={8}>
          <ValidateProduct productId={productId}/>
        </Grid>
      </Grid>
    </Paper>
  </Box>
));

export default AddWarranty;
