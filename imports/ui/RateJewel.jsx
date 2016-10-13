import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';

export default class RateJewel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sliderValue: 2.5
		}
	}
	rateJewel() {
		console.log(this.state.sliderValue)
	}
	render() {
		return (
			<div>
				<Slider
					defaultValue = {2.5}
					value = {this.state.sliderValue}
					onChange = (event, value) => {
						this.setState({sliderValue: value})
					}
				/>
				<RaisedButton
					label = "Rate"
					onTouchTap = () => {this.rateJewel()}
				/>
			</div>
		)
	}
}