import React, { useState } from "react";
import { Grid } from "@material-ui/core";

import AddFeaturePost from "../Profile/Components/Account/Features/AddFeaturePost";
import TypeSelect from "../Profile/Components/Home/Story/TypeSelect";

function Test() {
  const [display, setDisplay] = useState(true);
  return (
    <Grid
      justify="center"
      alignItems="center"
      container
      style={{
        height: "100%",
        backgroundColor: "#333a",
        padding: 10,
      }}>
      {display && <AddFeaturePost setDisplay={setDisplay} />}
      {/* <TypeSelect setStyle={() => {}} setDisplay= {() => {}} /> */}
    </Grid>
  );
}

export default Test;
