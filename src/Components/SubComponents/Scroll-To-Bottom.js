import React, { useEffect, useRef } from "react";

const ScrollToBottom = ({ children }) => {
	const scrollRef = useRef(null);

	useEffect(() => {
		const scrollEl = scrollRef.current;

		scrollEl.scrollIntoView({ behavior: "smooth" });
	}, [children]);
	return (
		<>
			{children}
			<div ref={scrollRef}></div>
		</>
	);
};

export default ScrollToBottom;
