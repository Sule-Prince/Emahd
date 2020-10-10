import React from "react";

import { Grid } from "@material-ui/core";

import UserInfo from "./UserInfo";
import Header from "./Header";

const DisplayCardList = ({ dataList, setDisplay, data }) => {
	return (
		<div
			style={{
				height: "calc(100vh - 50px)",
				maxHeight: "calc(100vh - 50px)",
				width: "100vw",
				top: 0,
				paddingBottom: 10,
				position: "fixed",
				zIndex: 1000,
				backgroundColor: "#fff",
			}}
		>
			

			<Grid container>
            <Header setDisplay={setDisplay} data={data} />
				{dataList.map(data => (
					<Grid item xs={12} style={{ height: 68 }}>
						<UserInfo userData={data} />
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default DisplayCardList;
