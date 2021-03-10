import React from "react";
import { CardActionArea } from "@material-ui/core";
import UserInfo from "./UserInfo";

const UserInfoButton = ({ imageUrl, header, subheader }) => {
	return (
		<CardActionArea style={{ height: 65 }}>
			<UserInfo imageUrl={imageUrl} header={header} subheader={subheader} />
		</CardActionArea>
	);
};

export default UserInfoButton;
