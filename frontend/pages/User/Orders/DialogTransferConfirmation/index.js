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
import CountDown from '../../../../components/CountDown/'
import CopyToClipboard from '../../../../components/CopyToClipboard/'
import FormField from '../../../../components/BlockForm/FormField'
// import NumberFormat from '../../../../components/NumberFormat/'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

@withStyles(styles, { withTheme: true })
@translate('common')
@observer
class DialogTransferConfirmation extends React.Component {
  state = {
    open: false,
    wallet_receiver: '',
    errors: {},
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.refreshData()
  };

  handleChangeInput = (wallet_receiver) => {
    this.setState({ wallet_receiver });
  };

  submitForm = (event) => {
    try {
      event.preventDefault()
      event.stopPropagation()
    } catch(err) {}

    const {data} = this.props
    const {wallet_receiver} = this.state
    const post = {wallet_receiver}

    new API(`users/{token}/order/${data.id}/confirm_wallet_receiver/`).post(post).then(res => {
      console.log(res.data)
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
          {t('orders__dialog-transfer-title')}
        </DialogTitle>

        <DialogContent>

          <p dangerouslySetInnerHTML={{
            __html: t('orders__dialog-transfer-message', {
              income: `${numberFormatFunc(data.currencies.income.amount, data.currencies.income.decimal)} ${data.currencies.income.ticker}`,
              outcome: `${numberFormatFunc(data.currencies.outcome.amount, data.currencies.outcome.decimal)} ${data.currencies.outcome.ticker}`,
              name: data.details.users.sender.name,
              payment_method: data.details.payment_method,
            })
          }} />

          <p>
            {t('orders__cancel-message')}: <CountDown date={data.actions.deposited.countdown} />
          </p>

        </DialogContent>

        <DialogContent>
          <FormField
            state_value={this.state.wallet_receiver}
            state_name="wallet_receiver"
            placeholder={t('orders__dialog-placeholder-wallet', {ticker: data.currencies.income.ticker})}
            type="text"
            required={true}
            disabled={false}
            error={this.state.errors.wallet_receiver}
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

        <Button fullWidth variant="outlined" color="secondary" onClick={this.handleClickOpen}>
          {t('orders__dialog-transfer-button-action')}
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

export default withMobileDialog()(DialogTransferConfirmation);
