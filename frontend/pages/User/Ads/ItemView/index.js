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
 * STORE
 */
import { observer } from 'mobx-react'
import store from '../../../../data/store'

/*
 * CONFS & UTILS
 */
import L,{Link} from '../../../../routes'
import {numberFormatFunc} from '../../../../data/config'

/*
 * MATERIAL
 */
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';


/*
 * COMPONENTS
 */
// import NumberFormat from '../../../../components/NumberFormat/'
import TimeAgo from '../../../../components/TimeAgo/';


/*
 * LIBS
 */
import { translate } from 'react-i18next'



@translate('common')
@withStyles(styles, { withTheme: true })
@observer
class ItemView extends Component {

	state = {
		anchorEl: null,
	};

	handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };


	deleteItem = () => {
		const {data} = this.props

		this.props.deleteItem(data.id)
		this.handleClose()
	}


	render() {

		const {classes, t, query, data} = this.props
		const {anchorEl} = this.state

		return (
			<ul data-box className={classes.itemWrapper}>

				<li>
					<Typography variant="title">
						<Link route='user_ads_form' params={{ lang: query.lang, id: data.id }}><a data-link>
							{t('ads-form__you-want', {
		            type: data.direction == 'sell' ? t('ads-form__sell').toLowerCase() : t('ads-form__buy').toLowerCase(),
		            currency: data.currencies.to.ticker,
		            payment: data.payment.name,
		            location: data.location.name,
		          })}
						</a></Link>
					</Typography>

					<ul data-list="ads">
						<li>
							<label>{t('offer__label-rate')}:</label>
							<span>
								{1} {data.currencies.to.ticker}

									&nbsp;=&nbsp;

								{numberFormatFunc(data.price, data.currencies.to.decimal)} {data.currencies.from.ticker}
							</span>
						</li>
						<li>
							<label>{t('offer__label-limits')}:</label>
							<span>
								{data.amount_min > 0 || data.amount_max > 0 ?
									<span>
										{!data.amount_max && <span>{t('ads-form__your-limits-from')}&nbsp;</span>}

										{data.amount_min ? data.amount_min : <span>0</span>}



										{data.amount_max > 0 &&
											<span>
												&nbsp;—&nbsp;
												{numberFormatFunc(data.amount_max, data.currencies.from.decimal)}
											</span>
										}

										&nbsp;
										{data.currencies.from.ticker}
									</span>
							 	: t('offer__no-limits')}
							</span>
						</li>
					</ul>

				</li>
				<li data-li="details">
					<ul>
						<li>
							<label>ID</label>
							<div>
								#{data.id}
							</div>
						</li>
						<li>
							<label>Status</label>
							<div>
								<Link route='catalog_details' params={{ lang: store.language, slug: data.id }}><a data-link>
									Public
								</a></Link>
							</div>
						</li>
						<li>
							<label>Created</label>
							<div>
								<TimeAgo date={data.created_at} />
							</div>
						</li>
						<li>
							<label>Updated</label>
							<div>
								<TimeAgo date={data.updated_at} />
							</div>
						</li>
					</ul>
				</li>
				<li data-li="menu">
					<IconButton
	          aria-label="More"
	          aria-owns={anchorEl ? 'long-menu' : null}
	          aria-haspopup="true"
	          onClick={this.handleClick}
	        >
	          <Icon>more_vert_icon</Icon>
	        </IconButton>
					<Menu
	          id="long-menu"
	          anchorEl={anchorEl}
	          open={Boolean(anchorEl)}
	          onClose={this.handleClose}
	          PaperProps={{
	            style: {
	              maxHeight: 48 * 4.5,
	              width: 200,
	            },
	          }} >

						<MenuItem selected={false}
							onClick={() => {
								L.Router.pushRoute('user_ads_form', {lang: query.lang, id: data.id})
							}}>
							{t('buttons__edit')}
						</MenuItem>
						<Divider />
						<MenuItem selected={false} onClick={this.deleteItem}>
							{t('buttons__delete')}
						</MenuItem>

					</Menu>
				</li>
			</ul>
		)
	}
}

ItemView.propTypes = {
	// classes: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired,
	query: PropTypes.object.isRequired,
	data: PropTypes.object.isRequired,
};

export default ItemView;
