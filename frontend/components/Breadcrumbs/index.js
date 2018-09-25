import React, {Component} from 'react';
import PropTypes from 'prop-types';

/*
 * UTILS & CONFS
 */
import {Link} from '../../routes'

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'




@withStyles(styles)
class Breadcrumbs extends Component {

	render() {

		const {classes, t, data, lang} = this.props
		let home_title = t('base__slogan')

		// DATA EXAMPLE
		/*
		data: [
					 {
							 "title": "Boat trips",
							 "router": "catalog",
							 "params": {
									 "folder": "boat-trips"
							 }
					 },
					 {
							 "title": "Speed boats",
							 "router": "catalog",
							 "params": {
									 "folder": "speed-boats"
							 }
					 }
			 ]
		 */

		return (
			<div>

				<div itemScope="" itemType="http://schema.org/BreadcrumbList" id="breadcrumbs" className={classes.breadcrumbs}>
					<span itemScope="" itemProp="itemListElement" itemType="http://schema.org/ListItem">
						<Link route='index' params={{
							lang
						}}>
							<a data-link rel="nofollow" itemProp="item" title={home_title}>
								<span itemProp="name">{home_title}</span>
								<meta itemProp="position" content="1"/>
							</a>
						</Link>
					</span>

					{data.map((item, index) => {
						return (
							<span key={index} itemScope="" itemProp="itemListElement" itemType="http://schema.org/ListItem">
								<Link route={item.router} params={{
									lang,
									...item.params
								}}>
									<a data-link itemProp="item" title={item.title}>
										<span itemProp="name">{item.title}</span>
										<meta itemProp="position" content={index + 2}/>
									</a>
								</Link>
							</span>
						)
					})}

				</div>
			</div>
		)
	}
}

Breadcrumbs.propTypes = {
	// classes: PropTypes.object.isRequired,
	data: PropTypes.array.isRequired,
	lang: PropTypes.string.isRequired,
	// t: PropTypes.func.isRequired,

};

export default Breadcrumbs;
