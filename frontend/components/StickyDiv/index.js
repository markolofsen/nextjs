// @flow weak

import React, {Component} from 'react';
import PropTypes from 'prop-types';


/*
 * MATERIAL
 */
import withWidth from '@material-ui/core/withWidth';

/*
 * LIBS
 */
import Sticky from 'react-stickynode';
import {isBrowser, isMobile} from 'react-device-detect';
import ReactTimeout from 'react-timeout'


/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';

const styles = {}

@withStyles(styles)
@ReactTimeout
@withWidth()
class StickDiv extends Component {

	state = {
		scrollHeight: 0,
		is_sticky: false,
	}


	componentDidMount() {
		this.scrollListener()
	}

	handleStateChange = (status) => {
    if (status.status === Sticky.STATUS_FIXED) {
      console.log('the component is sticky');
			this.setState({is_sticky: true})
    } else {
			this.setState({is_sticky: false})
		}
	}

	scrollListener() {
		this.props.setTimeout(() => {
			this.setState({scrollHeight: document.body.scrollHeight}, () => {
				this.scrollListener()
			})
		}, 1000)
	}

	render() {

		const {is_sticky} = this.state
		const {classes, width, enabled, marginTop, disabledWidth} = this.props

		let boundary_top = 0
		let boundary_bottom = 0
		try {
			boundary_top = document.getElementById('mainHeader').clientHeight
			if(marginTop) boundary_top += marginTop

			boundary_bottom = this.state.scrollHeight - document.getElementById('mainFooter').clientHeight
		} catch(err) {}

		let enabled_ = enabled
		if(disabledWidth) {
			disabledWidth.map(item => {
				if(width == item) {
					enabled_ = false
				}
			})
		}

		return (
			<div>
				{isBrowser ?
					<Sticky enabled={enabled_} top={boundary_top} bottomBoundary={boundary_bottom}  onStateChange={this.handleStateChange}>
						<div data-sticked={is_sticky}>
							{this.props.children}
						</div>

					</Sticky>
				: this.props.children }
			</div>
		)
	}
}

StickDiv.propTypes = {
	// classes: PropTypes.object.isRequired,
	disabledWidth: PropTypes.array, //disabledWidth={['xs','sm','md']}
	marginTop: PropTypes.number,
	enabled: PropTypes.bool,
};

export default StickDiv;
