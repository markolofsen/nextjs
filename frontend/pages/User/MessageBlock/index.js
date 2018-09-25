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
import store from '../../../data/store'

/*
 * MATERIAL
 */
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import Icon from '@material-ui/core/Icon';

/*
 * COMPONENTS
 */
import DialogEmail from './DialogEmail/'
import DialogAffiliate from './DialogAffiliate/'

/*
 * LIBS
 */
import { translate } from 'react-i18next'



@translate('common')
@withStyles(styles, { withTheme: true })
@observer
class MessageBlock extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	messageEmailConfirmation() {

		const {t, classes} = this.props

    if(store.logged && typeof store.logged.has_email_verified !== 'undefined') {
      if(!store.logged.has_email_verified) {
				return (
					<div>
						<div className={classes.message} data-message="success">
							<DialogEmail />
						</div>
					</div>
				)
			} else {
				return (
					<DialogAffiliate>
						<div className={classes.message} data-message="warning">
							<span data-link>
								{t('notifications__message_affiliate')}
							</span>
						</div>
					</DialogAffiliate>
				)
			}
    }
    return <div />
  }



	render() {

		const {classes, t} = this.props

		return (
			<div>
				{this.messageEmailConfirmation()}
			</div>
		)
	}
}

MessageBlock.propTypes = {
	// classes: PropTypes.object.isRequired,
	// data: PropTypes.object.isRequired,
};

export default MessageBlock;
