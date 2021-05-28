import React from "react";
import SetBar from "./components/SetBar";
import CardListings from "./cards/CardListings";
import witch from "./img/magic.svg";
import "./App.css";

class App extends React.Component {
	state = { cards: [], hide: 0 };
	onGather = (cards) => {
		this.setState({ cards: cards, hide: 1 });
	};
	render() {
		return (
			<div>
				{" "}
				<div className="container">
					<img
						src={witch}
						className={this.state.hide ? "hide" : "witch-img"}
					/>
				</div>
				<SetBar onGather={this.onGather} />{" "}
				<CardListings cards={this.state.cards} />
			</div>
		);
	}
}

export default App;
