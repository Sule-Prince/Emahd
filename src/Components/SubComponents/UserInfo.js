import React from "react";
import {
	Avatar,
	CardActionArea,
	CardHeader,
	Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";


const UserInfo = ({ userData }) => {

	return (
		<CardActionArea style={{ height: 65 }}>
			<Link to={userData.handle} style={{ height: "inherit", width: "inherit" }}>
				<CardHeader
					style={{ height: 60, background: "none" }}
					title={
						<Typography color="textPrimary" style={{ fontWeight: "bold" }}>
							{userData.handle}
						</Typography>
					}
					subheader={userData.fullName}
					avatar={<Avatar style={{ height: 50, width: 50 }} src={userData.imageUrl} />}
				/>
			</Link>
		</CardActionArea>
	);
};

export default UserInfo;
