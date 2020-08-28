import React from 'react';

import { Grid, Typography, } from "@material-ui/core"

const FollowTab = ({  }) => {
	return (
		<>
			<Grid item xs={4}>
				<Typography variant="body2" component="span">
					9
				</Typography>
				<Typography variant="caption" color="textSecondary" component="div">
					Posts
				</Typography>
			</Grid>
			<Grid item xs={4}>
				<Typography variant="body2" component="span">
					1875
				</Typography>
				<Typography variant="caption" color="textSecondary" component="div">
					Followers
				</Typography>
			</Grid>
			<Grid item xs={4}>
				<Typography variant="body2" component="span">
					135
				</Typography>
				<Typography variant="caption" color="textSecondary" component="div">
					Following
				</Typography>
			</Grid>
		</>
	);
};


export default FollowTab;
