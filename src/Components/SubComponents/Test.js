import React, { useState } from "react";
import { Grid } from "@material-ui/core";

function Test() {
  // const [display, setDisplay] = useState(true);
  return (
    <Grid
      justify="center"
      alignItems="center"
      container
      style={{
        height: "100%",
        backgroundColor: "#333a",
        padding: 10,
      }}></Grid>
  );
}

export default Test;
