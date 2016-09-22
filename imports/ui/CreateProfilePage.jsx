import React, {Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Form} from 'simple-react-form';
import RaisedButton from 'material-ui/RaisedButton'

import Profiles from '../api/profiles';

export default class CreateProfilePage extends Component{
	handleSubmit(event){
		Console.log(this);
	}
	render(){
		return(
			<div>
				<h1>Tell us about you</h1>
				<Form
					collection={Profiles}
					type='insert'
					ref='form'
                    onSuccess={() => browserHistory.push('/')}
					logErrors
				/>
				<RaisedButton primary label='Save' onTouchTap={() => this.refs.form.submit()}/>
			</div>
		);
	}
}