import React from "react";
import "../App.css";

const ErrorBar = ({ msg }) => {
	return (
		<div className="ui negative message error-bar">
			<div className="header">{msg}</div>
		</div>
	);
};

ErrorBar.defaultProps = {
	msg: "Sorry. We could not process that",
};

export default ErrorBar;
