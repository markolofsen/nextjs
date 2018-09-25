// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
// import purple from '@material-ui/core/colors/purple';

const styles = theme => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
	},
	progress: {
		// margin: `0 auto`,
	},
	colorWhite: {
		color: '#fff',
	}
});

function Preloader(props) {
	const {classes, size, padding, color} = props;

	let setClasses = {}
	if(color == 'white') {
		setClasses = {
			colorPrimary: classes.colorWhite
		}
	}

	const padding_ = padding ? padding : 0

	return (
		<div className={classes.root} style={{padding: padding_}}>
			<CircularProgress
				className={classes.progress}
				size={size ? size : 50}
				classes={setClasses}
				/>
		</div>
	);
}

Preloader.propTypes = {
	classes: PropTypes.object.isRequired,
	size: PropTypes.number,
	color: PropTypes.string,
	padding: PropTypes.number,
};

export default withStyles(styles)(Preloader);
