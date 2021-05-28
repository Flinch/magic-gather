import React from "react";
import "../App.css";

const ErrorBar = ({ msg }) => {
	return (
		<div className="ui negative message error-bar">
			<div className="header">{msg}</div>
		</div>
	);
};

export default ErrorBar;
