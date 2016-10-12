import React from 'react';
import {FieldType} from 'simple-react-form';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import categories from './categories';

const propTypes = {
  ...FieldType.propTypes
}

const defaultProps = {
  ...FieldType.defaultProps
}

export default class Category extends FieldType {
	constructor(props) {
		super(props);
		this.state = {};
	}
    
    renderCategories() {
        return categories.map(category => {
            return <MenuItem key={category._id} value={category.name} primaryText={category.name}/>
        })
    }
	render() {
		return (
			<SelectField
                value={this.props.value}
                onChange={(event, key, value) => this.props.onChange(value)}
                fullWidth
                floatingLabelText='Category (optional)' >
                {this.renderCategories()}
            </SelectField>
		)
	}
}

Category.propTypes = propTypes
Category.defaultProps = defaultProps