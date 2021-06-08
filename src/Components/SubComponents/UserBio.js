import React from "react";

import { Grid, Typography } from "@material-ui/core";

const UserBio = ({ data }) => {
  return (
    <Grid style={{ paddingLeft: "8px", marginTop: -10 }} container xs={12} item>
      {data.fullName && (
        <Grid item xs={10}>
          <Typography
            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
            variant="caption">
            {data.fullName}
          </Typography>
        </Grid>
      )}
      {data.course && (
        <Grid item xs={10}>
          <Typography style={{ fontWeight: "bold" }} variant="caption">
            {data.course}
          </Typography>
        </Grid>
      )}
      {data.university && (
        <Grid item xs={10}>
          <Typography style={{ fontWeight: "bold" }} variant="caption">
            {data.university}
          </Typography>
        </Grid>
      )}
      {data.bio && (
        <Grid item xs={10}>
          <Typography style={{ fontWeight: "bold" }} variant="caption">
            {data.bio}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default UserBio;
