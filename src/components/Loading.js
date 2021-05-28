import React from "react";

const Loading = (props) => {
	return (
		<div>
			<p></p>
			<div class="ui active dimmer">
				<div class="ui loader"></div>
			</div>
		</div>
	);
};

Loading.defaultProps = {
	message: "Loading...",
};

export default Loading;
