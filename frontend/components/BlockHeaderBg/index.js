import React, {Component} from 'react';
import PropTypes from 'prop-types';


/*
 * MATERIAL
 */
import Typography from '@material-ui/core/Typography';

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'
import {materialBg} from '../../style/vars'



@withStyles(styles)
class BlockHeaderBg extends Component {

	render() {

		const {classes, bgid, bgurl, title, description} = this.props

		let fontSize = 'normal'
		if(description) {
			if(description.length < 50) {
				fontSize = 'big'
			}
		}

		let bg_ = false
		if(bgid) bg_ = materialBg(bgid)
		if(bgurl) bg_ = `url(${bgurl})`

		return (
			<div>
				<div style={{
					backgroundImage: bg_
				}} className={classes.wrapper}>
					<ul>
						<li data-title>
							<Typography color="inherit" variant="display3" gutterBottom>
								{title}
							</Typography>
						</li>
						{description &&
							<li data-description={fontSize}
								dangerouslySetInnerHTML={{
									__html: description
								}}
							/>}
					</ul>
				</div>
				<div className={classes.contentWrapper}>
					<div data-content-inner>
						<div data-box>
							{this.props.children}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

BlockHeaderBg.propTypes = {
	bgurl: PropTypes.string,
	bgid: PropTypes.number,
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
};

export default BlockHeaderBg
