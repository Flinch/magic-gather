import React from "react";
import axios from "axios";
import Loading from "./Loading";
import ErrorBar from "./ErrorBar";
import { Dropdown } from "semantic-ui-react";

class SetBar extends React.Component {
	state = {
		sets: [{ key: "", text: "", value: "" }],
		selectedSet: { key: "", text: "", value: "" },
		cards: [],
		isLoading: 0,
		userSelected: 0,
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
					return { key: set.name, text: set.name, value: set.name };
				});

				this.setState({ sets: setName });
			})
			.catch((error) => {
				console.log(error);
			});
	};

	handleDrop = (event, data) => {
		this.setState({ selectedSet: data.value, userSelected: 1 });
	};

	onSubmit = () => {
		if (!this.state.userSelected) {
			this.setState({ errMsg: "You need to select a set to continue" });
		} else {
			this.setState({ isLoading: 1, errMsg: "" });
			axios
				.get(
					`https://api.magicthegathering.io/v1/cards?setName=${this.state.selectedSet}`
				)
				.then((res) => {
					this.setState({ cards: res.data.cards }, () => {
						this.props.onGather(this.state.cards);
						setTimeout(() => {
							{
								/*1 second Timeout here just to ensure pictures are populated before dimmer goes away*/
							}
							this.setState({ isLoading: 0 });
						}, 1000);
					});
				})
				.catch((error) => {
					console.log(error);
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
							this.state.cards.length
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
