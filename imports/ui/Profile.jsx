import React,{Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import Profiles from '../api/profiles';

export default class Profile extends Component{
	render(){
		console.log(this.props);
		return(
			<div>
				<h1>Hi, </h1>

			</div>
		);
	}
}

Profile.PropTypes={
	profile:PropTypes.object.isRequired,
};