import React from "react";
import "../App.css";

class CardPost extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="column" data-aos="fade-right">
				<div className="ui card large">
					<div
						className="content"
						style={{ BackgroundColor: "#E0E1E2" }}
					>
						<div className="ui header center aligned">
							{this.props.card.name}
						</div>
						<div className="ui center aligned">
							{this.props.card.setName}
						</div>
					</div>
					<div class="image">
						<img
							src={
								this.props.card.imageUrl
									? this.props.card.imageUrl
									: "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
							}
						/>
					</div>
					<div class="content">
						<div class="extra content">
							Release Date:{" "}
							{this.props.card.releaseDate
								? this.props.card.releaseDate
								: "N/A"}{" "}
							<br />
							Rarity: {this.props.card.rarity} <br />
							Type: {this.props.card.type} <br />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CardPost;
