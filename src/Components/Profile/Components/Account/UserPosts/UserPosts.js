import React from "react";

import { Grid, Tabs, Tab } from "@material-ui/core";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

import Screams from "./Screams";
import Media from "./Media";

const UserPosts = ({ posts, error, otherUser }) => {
	const [selected, setSelected] = React.useState(0);

	let mediaPosts = [];
	let textPosts = [];
	if (posts) {
		if (posts.length > 0) {
			posts.forEach(post => {
				if (post.mediaUrl.trim()) {
					mediaPosts.push(post);
					return;
				}
				textPosts.push(post);
			});
		}
	}

	const handleChange = (e, newSelected) => {
		setSelected(newSelected);
	};

	return (
		<>
			<Grid item xs={12}>
				<Tabs
					value={selected}
					onChange={handleChange}
					variant="fullWidth"
					indicatorColor="primary"
					textColor="primary"
					aria-label="Posts and Screams"
				>
					<Tab
						icon={<AllInboxIcon fontSize="small" />}
						style={{ fontSize: ".75rem", paddingBottom: 0 }}
						label="SCREAMS"
					/>
					<Tab
						icon={<CameraAltIcon fontSize="small" />}
						style={{ fontSize: ".75rem", paddingBottom: 0 }}
						label="MEDIA"
					/>
				</Tabs>
			</Grid>
			{selected === 0 && (
				<Screams error={error} otherUser={otherUser} posts={textPosts} />
			)}
			{selected === 1 && (
				<Media error={error} otherUser={otherUser} posts={mediaPosts} />
			)}
		</>
	);
};

export default UserPosts;
