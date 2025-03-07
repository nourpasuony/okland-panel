import { CircularProgress, Box } from "@mui/material";

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress size={60} thickness={5}  sx={{ color: "#FF9933" }} />
    </Box>
  );
};

export default Loader;