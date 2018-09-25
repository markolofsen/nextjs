/*
 * SYSTEM
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'

/*
 * MATERIAL
 */
import Typography from '@material-ui/core/Typography';


/*
 * COMPONENTS
 */
import Paginator from '../Paginator/';
import Preloader from '../Preloader/';


/*
 * LIBS
 */
import { translate } from 'react-i18next'


@translate('common')
@withStyles(styles)
class SmartTable extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}



	render() {

		const {classes, t} = this.props
		const {cols, data, params, route} = this.props

		if(!data) return <Preloader />
		if(data.results.length == 0) return (
			<div className={classes.isEmptyBlock}>
				<div>
					<Typography variant="display2">
	           No data
	        </Typography>
				</div>
			</div>
		)

		return (
			<div>
				<div data-box className={classes.tableWrapper}>
					<ul data-list="header">
						{cols.map((item, index) => {
							return (
								<li key={index} data-li={item.class}>{item.name}</li>
							)
						})}
					</ul>

					{data.results.map((row, i) => {
						return (
							<ul key={i}>
								{cols.map((item, index) => {
									return (
										<li key={index} data-li={item.class}>
											<label>{item.name}</label>
											<span>
												{item.value(row)}
											</span>
										</li>
									)
								})}
							</ul>
						)
					})}

				</div>
				<Paginator
					pagesTotal={Number(data.page.pages)}
					pagesCurrent={Number(data.page.current)}
					route={route}
					params={params}
				 />
		 	</div>
		)
	}
}

SmartTable.propTypes = {
	// classes: PropTypes.object.isRequired,
	data: PropTypes.object.isRequired,
	cols: PropTypes.array.isRequired,
	route: PropTypes.string.isRequired,
	params: PropTypes.array.isRequired,
};

export default SmartTable;
