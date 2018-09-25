import React from 'react';


/*
 * MATERIAL
 */
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import withMobileDialog from '@material-ui/core/withMobileDialog';

/*
 * STORE
 */
import { observer } from 'mobx-react'
import store from '../../../../data/store'

/*
 * CONFIG & FUNC.
 */
import {API, numberFormatFunc} from '../../../../data/config';
import {Link} from '../../../../routes'


/*
 * LIBS
 */
import { translate } from 'react-i18next'

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'

/*
 * COMPONENTS
 */
import FormField from '../../../../components/BlockForm/FormField'
import CopyToClipboard from '../../../../components/CopyToClipboard/'
// import NumberFormat from '../../../../components/NumberFormat/'


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

@withStyles(styles, { withTheme: true })
@translate('common')
@observer
class DialogOrderConfirmation extends React.Component {
  state = {
    open: false,
    wallet_sender: '',
    errors: {},
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChangeInput = (wallet_sender) => {
    this.setState({ wallet_sender });
  };

  submitForm = (event) => {
    try {
			event.preventDefault()
			event.stopPropagation()
		} catch(err) {}

    const {data} = this.props
    const {wallet_sender} = this.state
    const post = {wallet_sender}

    new API(`users/{token}/order/${data.id}/confirm_wallet_sender/`).post(post).then(res => {
      if(res.data.error && res.data.errors) {
        this.setState({errors: res.data.errors})
      } else if(!res.data.error) {
        this.props.refreshData()
        this.handleClose()
      }
    })

  }

  renderOrderDetails = () => {
    const {classes, t, data} = this.props

    return (
      <form onSubmit={this.submitForm} action='' className={classes.dialogWrapper}>
        <DialogTitle>
          {t('orders__dialog-deposit-title')}
        </DialogTitle>

        <DialogContent>
          <p dangerouslySetInnerHTML={{
            __html: t('orders__dialog-deposit-message-proceed', {
              number: `${numberFormatFunc(data.currencies.outcome.amount, data.currencies.outcome.decimal)} ${data.currencies.outcome.ticker}`,
            })
          }} />

          <p dangerouslySetInnerHTML={{
            __html: t('orders__dialog-deposit-message-proceed-2', {
              number: `${numberFormatFunc(data.currencies.income.amount, data.currencies.income.decimal)} ${data.currencies.income.ticker}`,
              name: data.details.users.receiver.name,
              payment_method: data.details.payment_method,
            })
          }} />

          <p>
            <Link route='protection' params={{lang: store.language}}><a data-link>
              {t('menu__protection')}
            </a></Link>
          </p>

        </DialogContent>

        <DialogContent>

          <div>
            <CopyToClipboard
              label={t('orders__our-wallet')}
              text={store.getWalletByTicker(data.currencies.outcome.ticker)} />
          </div>

          <FormField
            state_value={this.state.wallet_sender}
            state_name="wallet_sender"
            placeholder={t('orders__dialog-placeholder-wallet', {ticker: data.currencies.outcome.ticker})}
            type="text"
            required={true}
            disabled={false}
            error={this.state.errors.wallet_sender}
            noAutoComplete
            onChange={(event, name) => this.handleChangeInput(event.target.value)}/>

          <Button type="submit" size="large" color="primary" variant="raised" fullWidth>
            {t('orders__button-confirm')}
          </Button>
        </DialogContent>
      </form>
    )
  }

  render() {
    const {classes, t} = this.props
    const { fullScreen } = this.props;

    return (
      <div style={{width: '100%'}}>

        <Button fullWidth variant="contained" color="primary" onClick={this.handleClickOpen}>
          {t('orders__button-confirm')}
        </Button>

        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted={false}
          onClose={this.handleClose}
          maxWidth="sm"
          fullWidth
          fullScreen={fullScreen}
        >

          {this.renderOrderDetails()}

        </Dialog>
      </div>
    );
  }
}

export default withMobileDialog()(DialogOrderConfirmation);
