import React from "react";
import "./App.css";
import { CssBaseline } from "@mui/material";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
      <div className="App">
        <CssBaseline />
        <AppRoutes />
      </div>
  );
}

export default App;
