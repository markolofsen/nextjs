import React, {Component} from 'react';
import PropTypes from 'prop-types';

/*
 * COMPONENTS
 */
import Typography from '@material-ui/core/Typography';

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'
import {materialBg} from '../../style/vars'



@withStyles(styles)
class BlockForm extends Component {

	render() {

		const {classes, bgid, title} = this.props

		return (
			<div>
				<div className={classes.formWrapper} style={{
					backgroundImage: materialBg(bgid)
				}}>
					<div data-el="inner">
						<Typography variant="title" data-el="title">
							{title}
						</Typography>

						{this.props.children}
					</div>
				</div>
			</div>
		)
	}
}

BlockForm.propTypes = {
	bgid: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired
};

export default BlockForm
