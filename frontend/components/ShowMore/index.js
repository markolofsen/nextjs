// @flow weak

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'
// import { withRouter } from 'react-router-dom'
import Collapse from '@material-ui/core/Collapse';
import { translate } from 'react-i18next'




@withStyles(styles)
@translate('common')
class ShowMore extends Component {

	state = {
		open: true
	}

	switcher = () => {
		this.setState({
			open: !this.state.open
		})
	}

  componentDidMount() {
    this.setState({open: false})
  }

	render() {

		const {open} = this.state
		const {t, classes, text, height} = this.props

		let height_ = height
			? height
			: 120

		if(!text) return <div />

		if (text.length < 300) {
			return (
				<div className={classes.contentFormat}>
					<div data-element="showmore">
						<div dangerouslySetInnerHTML={{__html: text}}/>
					</div>
				</div>
			)
		}
		return (
			<div>
				<div className={classes.contentFormat}>
					<div data-element="showmore" data-collapase={open}>
						<Collapse in={open} collapsedHeight={`${height_}px`}>
							<div className={classes.contentFormat} dangerouslySetInnerHTML={{
								__html: text
							}}/>
						</Collapse>
					</div>

					<div data-el="more">
						<span onClick={this.switcher}>
							{t('buttons__more')}
						</span>
					</div>
				</div>
			</div>
		)
	}
}

ShowMore.propTypes = {
	// classes: PropTypes.object.isRequired,
	text: PropTypes.string.isRequired,
	height: PropTypes.number
};

export default ShowMore;
