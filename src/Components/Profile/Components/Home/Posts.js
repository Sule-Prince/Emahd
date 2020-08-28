import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Post from "./Post";




const useStyles = makeStyles( theme => ({
	root: {
		overflowY: "auto",
		minHeight: "100vh",
		position: "absolute",
		marginTop: 5,
		backgroundColor: "#f4f4f4"
	},
	positionFIx: {
		height: 70,
		width: "100vw"
	  }
}))


const Posts = ({ posts }) => {
	const classes = useStyles();

	let sortedPosts = [];

	if(posts) {
		posts.forEach(postArray => {
			sortedPosts = [...sortedPosts, ...postArray];
		});
	
		sortedPosts.sort((a, b) => {
			let createdAtA = Date.parse(a.createdAt);
			let createdAtB = Date.parse(b.createdAt);
	
			return createdAtA > createdAtB ? -1 : 1;
		});
	}



	return (
		<div className= {classes.root}>
		<Grid style= {{ position: "absolute", marginBottom: 170}} container>
			{posts ? (
				sortedPosts.map(post => <Post post={post} key={post.postId} />)
			) : (
				<div>Something will be here soonish</div>
			)}
			
		</Grid>
		<div className= {classes.positionFIx}></div>
		</div>
	);
};

export default Posts;
