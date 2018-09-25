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
import {Link} from '../../../../routes'
import {numberFormatFunc, wordPostfixPreset} from '../../../../data/config'

/*
 * MATERIAL
 */
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';


/*
 * COMPONENTS
 */
import TimeAgo from '../../../../components/TimeAgo/'
import CountDown from '../../../../components/CountDown/'
// import NumberFormat from '../../../../components/NumberFormat/'
import DialogOrderConfirmation from '../DialogOrderConfirmation/'
import DialogMoneyExpectation from '../DialogMoneyExpectation/'
import DialogTransferConfirmation from '../DialogTransferConfirmation/'
import DialogTransferReceive from '../DialogTransferReceive/'
import DialogTransferReceiveAddFeedback from '../DialogTransferReceive/AddFeedback'

import DialogStatusHistory from '../DialogStatusHistory/'
import DialogDispute from '../DialogDispute/'



import Preloader from '../../../../components/Preloader/'
import ChatWindow from '../../../NavWrapper/ChatWindow/';

/*
 * LIBS
 */
import { translate } from 'react-i18next'



@translate('common')
@withStyles(styles, { withTheme: true })
@observer
class OrderItem extends Component {

	state = {
		anchorEl: null,
		openChat: false
	};

	handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };


	cancelThisOrder = () => {
		const {data} = this.props

		this.props.cancelOrder(data.id)
		this.handleClose()
	}

	openChat = () => {
		this.setState({openChat: true})
	}
	chatCallback = () => {
		this.setState({openChat: false}, () => {
			this.props.refreshData()
		})
	}

	refreshData = () => {
		this.handleClose()
		this.props.refreshData()
	}

	renderMenu = () => {
		const {anchorEl} = this.state
		const {t, data} = this.props

		return (
			<div>
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
          }}
        >
					<DialogStatusHistory data={this.props.data} refreshData={this.refreshData}>
						<MenuItem selected={false}>
							{t('orders__button-history')}
						</MenuItem>
					</DialogStatusHistory>


					{data.actions.dispute && <DialogDispute data={this.props.data} refreshData={this.refreshData}>
						<MenuItem selected={false}>
							{t('orders__button-complain')}
						</MenuItem>
					</DialogDispute>}


					{data.actions.cancel && <div>
						<Divider />
						<MenuItem selected={false} onClick={this.cancelThisOrder}>
							{t('orders__button-cancel-order')}
						</MenuItem>
					</div>}

        </Menu>
      </div>
		)
	}


	renderButtonChat() {
		const {classes, t, data} = this.props

		const messages_counter = data.messages_counter
		const iter = messages_counter.new > 0 ? `+${messages_counter.new}` : messages_counter.total
		const color = messages_counter.new ? 'secondary' : 'primary'
		return (
			<Button color={color} fullWidth variant="outlined" size="small" onClick={this.openChat}>
				<Badge badgeContent={iter} color={color} classes={{ badge: classes.badge }}>
					<Icon>chat_bubble_outline</Icon>
				</Badge>
			</Button>
		)
	}

	renderButtonConfirmation = () => {
		const {t, data} = this.props

		if(data.details.status == 'progress') {
			if(data.actions.progress) {
				return <DialogOrderConfirmation data={this.props.data} refreshData={this.refreshData} />
			} else {
				return (
					<div>
						{t(`orders__status-hint-${data.details.status}`, {name: data.details.users.sender.name})}
					</div>
				)
			}
		}
		return <div />
	}

	renderButtonNotDeposited = () => {
		const {t, data} = this.props

		if(data.details.status == 'not_deposited') {
			if(data.actions.not_deposited.active) {
				return <DialogMoneyExpectation data={this.props.data} refreshData={this.refreshData} />
			} else {
				return (
					<div>
						{t(`orders__status-hint-${data.details.status}`, {name: data.details.users.sender.name})}
						<br />
						{t('orders__cancel-message')}: <CountDown date={data.actions.not_deposited.countdown} />
					</div>
				)
			}
		}
		return <div />
	}


	renderButtonDeposited = () => {
		const {t, data} = this.props

		if(data.details.status == 'deposited') {
			if(data.actions.deposited.active) {
				return <DialogTransferConfirmation data={this.props.data} refreshData={this.refreshData} />
			} else {
				return (
					<div>
						{t(`orders__status-hint-${data.details.status}`, {name: data.details.users.receiver.name})}
						<br />
						{t('orders__cancel-message')}: <CountDown date={data.actions.deposited.countdown} />
					</div>
				)
			}
		}
		return <div />
	}

	renderButtonTransferProgress = () => {
		const {t, data} = this.props

		if(data.details.status == 'transfer_progress') {
			if(data.actions.transfer_progress.active) {
				return <DialogTransferReceive data={this.props.data} refreshData={this.refreshData} />
			} else {
				return (
					<div>
						{t(`orders__status-hint-${data.details.status}`, {name: data.details.users.sender.name})}
						<br />
						{t('orders__confirmation-message')}: <CountDown date={data.actions.transfer_progress.countdown} />
					</div>
				)
			}
		}
		return <div />
	}

	renderButtonTransferComplete = () => {
		const {t, data} = this.props

		if(data.details.status == 'transfer_complete') {
			if(data.actions.transfer_complete) {
				return <DialogTransferReceiveAddFeedback data={this.props.data} refreshData={this.refreshData} />
			} else {
				return (
					<div>
						{t(`orders__status-hint-${data.details.status}`, {name: data.details.users.receiver.name})}
					</div>
				)
			}
		}
		return <div />
	}

	render() {
		const {classes, t, data, itemType} = this.props
		const {openChat} = this.state

		return (
			<div>
				{openChat && <ChatWindow chatOrderId={data.id} callback={this.chatCallback} />}

				<ul className={classes.orderWrapper} data-box data-status={data.details.status}>
					<li>
						<ul className={classes.orderData}>
							<li data-li="orderNumber">
								<label>{t('orders__order')}:</label>
								<span>
									<span>#{data.id}</span>
									<span data-el="orderDate">
										<TimeAgo date={data.created} />
									</span>
								</span>
							</li>
							<li>
								<label>{t('order-form__field-outcome-label')}:</label>
								<span>
									{numberFormatFunc(data.currencies.outcome.amount, data.currencies.outcome.decimal)} {data.currencies.outcome.ticker}
								</span>
							</li>
							<li>
								<label>{t('order-form__field-income-label')}:</label>
								<span>
									{numberFormatFunc(data.currencies.income.amount, data.currencies.income.decimal)} {data.currencies.income.ticker}
								</span>
							</li>
							<li>
								<label>{t('orders__label-ad')}:</label>
								<span>
									<Link route='catalog_details' params={{ lang: store.language, slug: data.offer.id }}><a data-link>
										#{data.offer.id}
									</a></Link>
									{itemType == 'income' && <span>&nbsp;&nbsp;
										<Link route='user_ads_form' params={{ lang: store.language, id: data.offer.id }}><a data-link>
											{t('buttons__edit')}
										</a></Link>
									</span>}
								</span>
							</li>
						</ul>
					</li>
					<li data-li="details">
						<ul className={classes.orderData}>
							<li data-li="status">
								<label>{t('orders__status')}:</label>
								<span>
									{data.actions._IS_COMPLETE && <span data-el="preloader"><Preloader size={15} /></span>}
									{t(`orders__status-${data.details.status}`)}
								</span>
							</li>
							<li>
								<label>{t('orders__direction')}:</label>
								<span>
									{/* {t(`orders__direction-${data.details.direction_reverse}`)}  */}
									{t(`orders__direction-${data.details.direction_reverse}`)}
								</span>
							</li>
							<li>
								<label>{t('offer__label-payment-method')}</label>
								<span>
									{data.details.payment_method}
								</span>
							</li>
						</ul>
					</li>

					<li data-li="button">
						<ul>
							{data.actions._IS_COMPLETE && <li data-li="chat">
								{this.renderButtonChat()}
							</li>}
							<li>
								{this.renderButtonConfirmation()}
								{this.renderButtonNotDeposited()}
								{this.renderButtonDeposited()}
								{this.renderButtonTransferProgress()}
								{this.renderButtonTransferComplete()}
							</li>
						</ul>
					</li>

					<li data-li="menu">
						{this.renderMenu()}
					</li>
				</ul>
			</div>
		)
	}
}

OrderItem.propTypes = {
	// classes: PropTypes.object.isRequired,
	data: PropTypes.object.isRequired,
	itemType: PropTypes.string.isRequired,

};

export default OrderItem;
