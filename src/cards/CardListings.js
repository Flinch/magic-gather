import React from "react";
import CardPost from "./CardPost";

const CardListings = ({ cards }) => {
	const Listings = cards.map((card) => {
		return <CardPost card={card} />;
	});

	return (
		<div className="ui container">
			<div className="ui four column grid">{Listings}</div>
		</div>
	);
};

export default CardListings;
