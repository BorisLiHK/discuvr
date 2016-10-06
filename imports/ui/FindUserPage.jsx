import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';
import {Form} from 'simple-react-form';
import RaisedButton from 'material-ui/RaisedButton';

export default class FindUserPage extends Component{
	render(){
		console.log(Meteor.users.find({"username":"001"}).fetch());
		return(
			<div>
				<h1>For TESTing only</h1>
			</div>
		);
	}
}

FindUserPage.PropTypes={
	userList:PropTypes.array,
};

export default createContainer(()=>{
	Meteor.subscribe('userList');
	return{
		userList:Meteor.users.find({}).fetch(),
	};
},FindUserPage)