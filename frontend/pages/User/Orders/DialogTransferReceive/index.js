import React from 'react';


/*
 * MATERIAL
 */
import Icon from '@material-ui/core/Icon';
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
import Rating from 'react-rating'

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'

/*
 * COMPONENTS
 */
// import NumberFormat from '../../../../components/NumberFormat/'
import CountDown from '../../../../components/CountDown/'
import FormField from '../../../../components/BlockForm/FormField'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

@withStyles(styles, { withTheme: true })
@translate('common')
@observer
class DialogTransferReceive extends React.Component {
  state = {
    open: false,
    feedback: '',
    rating: 5,
    errors: {}
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.refreshData()
  };

  handleChangeInput = (feedback) => {
    this.setState({ feedback });
  };

  submitForm = (event) => {
    try {
      event.preventDefault()
      event.stopPropagation()
    } catch(err) {}

    const {data} = this.props
    const {feedback, rating} = this.state
    const post = {feedback, rating}

    new API(`users/{token}/order/${data.id}/confirm_transfer_receiving/`).post(post).then(res => {
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
            __html: t('orders__dialog-transfer-confirmation-message', {
              outcome: `${numberFormatFunc(data.currencies.outcome.amount, data.currencies.outcome.decimal)} ${data.currencies.outcome.ticker}`,
              name: data.details.users.receiver.name,
            })
          }} />

          <p>
            {t('orders__confirmation-message')}: <CountDown date={data.actions.transfer_progress.countdown} />
          </p>

        </DialogContent>

        <DialogContent>

          <ul className={classes.ratingWrapper}>
            <li>
              {t('orders__dialog-confirmation-rating-label')}:
            </li>
            <li>
              <Rating
                emptySymbol={<Icon data-icon="false">star_border</Icon>}
                fullSymbol={<Icon data-icon="true">star</Icon>}
                onChange={(rate) => this.setState({rating: rate})}
                initialRating={this.state.rating} />
            </li>
          </ul>

          <FormField
            state_value={this.state.feedback}
            state_name="feedback"
            placeholder={t('orders__dialog-transfer-placeholder-feedback')}
            type="text"
            multiline
            rows={8}
            required={true}
            disabled={false}
            error={this.state.errors.feedback}
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

        <Button fullWidth variant="raised" color="secondary" onClick={this.handleClickOpen}>
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

export default withMobileDialog()(DialogTransferReceive);
