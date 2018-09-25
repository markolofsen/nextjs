// @flow weak

import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import {withStyles} from '@material-ui/core/styles';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';

// import ReactMomentCountDown from 'react-moment-countdown';
import Countdown from 'react-countdown-now';

import moment from 'moment';


class CountDownComponent extends Component {

	render() {

		const {
			date,
			...other
		} = this.props

		if(!date) return <span>Error</span>

		const dateInFuture = moment(date);

		return (
			<span {...other}>

				<Countdown date={dateInFuture} intervalDelay={0} precision={3} zeroPadLength={3}
					renderer={
						props => `${props.hours}:${props.minutes}:${props.seconds}`
					} />
				{/* <Countdown date={dateInFuture} intervalDelay={0} precision={3} zeroPadLength={3} renderer={props => <pre>{JSON.stringify(props, null, 2)}</pre>} /> */}
			</span>
		)
	}
}

CountDownComponent.propTypes = {
	classes: PropTypes.object.isRequired,
	date: PropTypes.oneOfType([
		PropTypes.string.isRequired,
		PropTypes.bool.isRequired
	]),
};

export default CountDownComponent;
