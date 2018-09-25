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
import CopyToClipboard from '../../../../components/CopyToClipboard/'
// import NumberFormat from '../../../../components/NumberFormat/'
import CountDown from '../../../../components/CountDown/'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

@withStyles(styles, { withTheme: true })
@translate('common')
@observer
class DialogMoneyExpectation extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.refreshData()
  };


  renderOrderDetails = () => {
    const {classes, t, data} = this.props

    return (
      <div className={classes.dialogWrapper}>
        <DialogTitle>
          {t('orders__dialog-deposit-title')}
        </DialogTitle>

        <DialogContent>
          <p dangerouslySetInnerHTML={{
            __html: t('orders__dialog-deposit-message', {
              number: `${numberFormatFunc(data.currencies.outcome.amount, data.currencies.outcome.decimal)} ${data.currencies.outcome.ticker}`,
              wallet: data.actions.not_deposited.wallet_sender,
            })
          }} />

          <p>
            {t('orders__cancel-message')}: <CountDown date={data.actions.not_deposited.countdown} />
          </p>
          <p>
            <Link route='protection' params={{lang: store.language}}><a data-link>
              {t('menu__protection')}
            </a></Link>
          </p>

          <div>
            <CopyToClipboard
              label={t('orders__our-wallet')}
              text={store.getWalletByTicker(data.currencies.outcome.ticker)} />
          </div>

        </DialogContent>

        <DialogContent>
          <Button size="large" color="primary" variant="raised" fullWidth onClick={this.handleClose}>
            {t('buttons__close')}
          </Button>
        </DialogContent>
      </div>
    )
  }

  render() {
    const {classes, t} = this.props
    const { fullScreen } = this.props;

    return (
      <div style={{width: '100%'}}>

        <Button fullWidth variant="outlined" color="primary" onClick={this.handleClickOpen}>
          {t('orders__dialog-deposit-title-expectation')}
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

export default withMobileDialog()(DialogMoneyExpectation);
