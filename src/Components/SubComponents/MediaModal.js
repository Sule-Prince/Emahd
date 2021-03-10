import React from "react";

import { Paper } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { motion, AnimatePresence } from "framer-motion";

const MediaModal = ({ children, setDisplay, Backdrop }) => {
	const rootVariant = {
		exit: {
			scale: 0,
		},
		initial: {
			scale: 0,
		},
		animate: {
			scale: 1,
		},
		transition: {
			duration: 2,
			delay: 0.5,
		},
	};

	return (
		<Backdrop setDisplay={setDisplay}>
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<AnimatePresence>
					<motion.div
						variants={rootVariant}
						exit="exit"
						initial="initial"
						animate="animate"
						style={{
							position: "absolute",
							width: "90%",
						}}
						onClick={e => {
							e.stopPropagation();
						}}
					>
						<Paper elevation={2} style={{ padding: 6 }}>
							<div
								style={{
									display: "flex",
									justifyContent: "flex-end",
									paddingBottom: 3,
								}}
							>
								<span
									onClick={() => {
										setDisplay(false);
									}}
								>
									<CloseIcon style={{ color: "#2196f3", fontSize: ".85rem" }} />
								</span>
							</div>
							{children}
						</Paper>
					</motion.div>
				</AnimatePresence>
			</div>
		</Backdrop>
	);
};

export default MediaModal;
