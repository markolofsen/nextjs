import React, {Component} from 'react';
import PropTypes from 'prop-types';

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'

/*
 * COMPONENTS
 */
import Icon from '@material-ui/core/Icon';

/*
 * LIBS
 */
import FontAwesome from 'react-fontawesome';


@withStyles(styles)
class SmartIcon extends Component {


	render() {

		const {classes} = this.props
		const {icon, font, className} = this.props

		// console.log( this.props.children )
		// <Icon>{this.props.icon}</Icon>
		return (
			<div className={classes.iconWrapper}>
				{font == 'fontawesome' && <FontAwesome name={icon} className={className} />}
				{!font && <Icon className={className}>{icon}</Icon>}
			</div>
		)
	}
}

SmartIcon.propTypes = {
	// classes: PropTypes.object.isRequired,
	icon: PropTypes.string.isRequired
};

export default SmartIcon;
