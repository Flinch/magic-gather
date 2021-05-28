import React from "react";
import axios from "axios";
import Loading from "./Loading";
import ErrorBar from "./ErrorBar";
import { Dropdown } from "semantic-ui-react";

class SetBar extends React.Component {
	state = {
		sets: [{ key: "", text: "", value: "" }], //An array of objects with key-value pairs
		selectedSet: { key: "", text: "", value: "" }, //One object with key-value pait
		cards: [], //cards that belong to a set
		isLoading: 0,
		userSelected: 0, //Used to check and see if user has selected a state
		errMsg: "",
	};

	constructor(props) {
		super(props);
	}

	componentDidMount = () => {
		axios
			.get(`https://api.magicthegathering.io/v1/sets?`)
			.then((res) => {
				const setName = res.data.sets.map((set) => {
					//Uses the map function to create an array of sets objects, each containing a key-value pair.
					return { key: set.name, text: set.name, value: set.name };
				});

				this.setState({ sets: setName }); //setName var is then passed into sets state. Note that the sets state is an array of objects.
			})
			.catch((error) => {
				console.log(error);
			});
	};

	handleDrop = (event, data) => {
		this.setState({ selectedSet: data.value, userSelected: 1 }); //sets the selectedSet data to the set that the user has clicked on, and toggles the userSelected state to 1
	};

	onSubmit = () => {
		if (!this.state.userSelected) {
			//Checks to see if user has selected a set and displays an error message if no set has been selected.
			this.setState({ errMsg: "You need to select a set to continue" });
		} else {
			this.setState({ isLoading: 1, errMsg: "" });
			axios
				.get(
					`https://api.magicthegathering.io/v1/cards?setName=${this.state.selectedSet}` // We come here only if the user has selected a set, and proceed to retrieve all cards related to that set.
				)
				.then((res) => {
					this.setState({ cards: res.data.cards }, () => {
						// This is making sure that onGather is only invoked after the cards state has been set.
						this.props.onGather(this.state.cards);
						setTimeout(() => {
							this.setState({ isLoading: 0 }); //This timeout is here to give ample time for the fetched images to appear on the card. It isn't enough to wait for some data to be available, we need a little bit more time to make sure images are updated.
						}, 1000);
					});
				})
				.catch((error) => {
					console.log(error); //error checking here can be more thorough, but for the purposes of a simple program it is logged to the console.
				});
		}
	};

	render() {
		return (
			<div className="ui container pdt-20">
				{this.state.isLoading ? <Loading /> : ""}
				<div className="ui grid">
					<div className="fifteen wide column">
						<Dropdown
							placeholder="Select a set"
							fluid
							selection
							options={this.state.sets}
							onChange={this.handleDrop}
						/>
					</div>

					<div
						className={
							this.state.cards.length //We're checking to see if we are on the main page, or the results page by checking the state of cards (if its populated or not). Button behaves differently in either case.
								? "one wide column"
								: "gather-button"
						}
					>
						<button
							className="ui button go-button"
							onClick={this.onSubmit}
						>
							{" "}
							Gather{" "}
						</button>
					</div>
					{this.state.errMsg === "" ? (
						""
					) : (
						<ErrorBar msg={this.state.errMsg} />
					)}
				</div>
			</div>
		);
	}
}

export default SetBar;
