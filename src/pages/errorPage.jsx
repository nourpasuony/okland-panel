import React from "react";
import { Grid, Button, Typography } from "@mui/material";

import monster from "/images/godzilla.gif";

function ErrorPage() {
  return (
    <Grid
      container
      className="fullSize"
      direction="column"
      justifyContent="center"
      alignItems="center"
      id="ERR404"
    >
      <Typography variant="h3">OH NO!</Typography>
      <Typography variant="h5" align="center">
        Godzilla just ate this page!
      </Typography>
      <Grid container justifyContent="center" alignItems="center">
        <div id="beforeTooLate">
          Go back
          <Button className="textLink" component="a" href="/">
            home
          </Button>
          before it's too late!
        </div>
        <img id="monsterImg" src={monster} alt="Godzilla" />
      </Grid>
    </Grid>
  );
}

export default ErrorPage;
