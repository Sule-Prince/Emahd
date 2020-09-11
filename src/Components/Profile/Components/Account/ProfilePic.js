import React, { useState } from "react";
import {
	Grid,
	IconButton,
	Avatar,
	Button,
	Badge,
	CircularProgress,
} from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

import { useSelector } from "react-redux";
import useFileUpload from "../../../../utils/useFileUpload";
import EdituserInfo from "./EdituserInfo";

const ProfilePic = ({ classes, imageUrl }) => {
	const [display, setDisplay] = useState(false);

	const fileUpload = useFileUpload("imageUrl");

	const isLoading = useSelector(
		state => state.userActions.uploadprofilePic.isLoading
	);

	const openEditProfile = () => {
		setDisplay(true);
	};

	return (
		<>
			{display && <EdituserInfo setDisplay={setDisplay} />}
			<Grid container>
				<Grid
					xs={5}
					justify="center"
					container
					className={classes.avatarContainer}
					item
				>
					<Badge
						overlap="circle"
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "right",
						}}
						badgeContent={
							<label htmlFor="upload-profile-pic">
								<IconButton color="primary" component="span">
									<div className={classes.uploadIconContainer}>
										<AddAPhotoIcon style={{ fontSize: "1.1rem" }} />
									</div>
								</IconButton>
							</label>
						}
					>
						<Avatar className={classes.avatar} src={imageUrl ? imageUrl : null}>
							{isLoading ? (
								<CircularProgress color="primary" thickness={5} size={25} />
							) : null}
						</Avatar>
						<input
							type="file"
							id="upload-profile-pic"
							accept="image/*"
							style={{ display: "none" }}
							onChange={fileUpload}
						/>
					</Badge>
					<img src={imageUrl} alt="preload Pic" style={{ display: "none" }} />
				</Grid>

				<Grid
					container
					justify="center"
					style={{ paddingLeft: "3vw", paddingTop: "3vmin" }}
					xs={7}
					item
				>
					<Grid style={{ minWidth: "80%" }} item>
						<Button
							style={{ fontSize: ".7rem", minWidth: "100%" }}
							size="small"
							variant="contained"
							onClick={openEditProfile}
						>
							Edit Profile
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default React.memo(ProfilePic);
