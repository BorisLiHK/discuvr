import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import {Form} from 'simple-react-form';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from 'react-router';
import FilteredMultiSelect from 'react-filtered-multiselect';

import Circles from '../api/circles';

class CreateCirclePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            CULTURE_SHIPS: this.props.CULTURE_SHIPS,
            selectedShips: this.props.selectedShips
        }

        this.addShip = this.addShip.bind(this)
        this.removeShip = this.removeShip.bind(this)
    }

    addShip(newSelectedShips) {
        this.setState({selectedShips: newSelectedShips}) 
        console.log(newSelectedShips)
        console.log(this.state.selectedShips)
    }

    removeShip(index) {
        var newSelectedShips = this.state.selectedShips.slice()
        newSelectedShips.splice(index, 1)
        this.setState({selectedShips: newSelectedShips})
    }

    render() {
        return (
            <div>
                <h1>Create a New Circle</h1>
                <Form
                    collection={Circles}
                    type='insert'
                    ref='form'
                    inSuccess={()=>
                        browserHistory.push('/')
                    }
                    logErrors
                />

                <div style={{marginTop: 20}}>
                    <FilteredMultiSelect
                        buttonText="Add Ship"
                        onChange={this.addShip}
                        options={this.state.CULTURE_SHIPS}
                        selectedOptions={this.state.selectedShips}
                        textProp="name"
                        valueProp="id"
                        classNames={{
                            button: 'FilteredMultiSelect__button',
                            // Used when at least one <option> is selected
                            buttonActive: 'FilteredMultiSelect__button--active',
                            filter: 'FilteredMultiSelect__filter',
                            select: 'FilteredMultiSelect__select'
                        }}
                    />
                    <FilteredMultiSelect
                        buttonText="Remove Ship"
                        onChange={this.removeShip}
                        options={this.state.selectedShips}
                        textProp="name"
                        valueProp="id"
                        classNames={{
                            button: 'FilteredMultiSelect__button',
                            // Used when at least one <option> is selected
                            buttonActive: 'FilteredMultiSelect__button--active',
                            filter: 'FilteredMultiSelect__filter',
                            select: 'FilteredMultiSelect__select'
                        }}
                        style={{marginTop: 20}}
                    />
                </div>

                <div style={{marginTop: 20}}>
                    <RaisedButton label='Create' primary={true} onTouchTap={() => this.refs.form.submit()} style={{
                        position: 'fixed',
                        left: 20,
                    }}/>
                    <RaisedButton label='Cancel' secondary={true} href="/my-circles" style={{
                        position: 'fixed',
                        right: 20,
                    }} />
                </div>
                <RaisedButton 
                    primary label='Create'
                    onTouchTap={() => this.refs.form.submit()}
                    style={{position:"fixed",left:20,}}
                />
                <RaisedButton
                    secondary label='Cancel'
                    href="/"
                    style={{position:"fixed",right:20,}}
                />
            </div>
        );
    }
}

CreateCirclePage.PropTypes = {
    members: PropTypes.array,
    selectedMembers: PropTypes.array,
    CULTURE_SHIPS: PropTypes.array, 
    selectedShips: PropTypes.array,
}

export default createContainer(() => {
    Meteor.subscribe('userList');

    return {
        CULTURE_SHIPS: [
            {id: 1, name: '5*Gelish-Oplule'},
            {id: 2, name: '7*Uagren'},
            {id: 249, name: 'Zero Gravitas'},
            {id: 250, name: 'Zoologist'}
        ],
        selectedShips: []
    };
}, CreateCirclePage)