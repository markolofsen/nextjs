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
import Divider from '@material-ui/core/Divider';
import withMobileDialog from '@material-ui/core/withMobileDialog';

/*
 * STORE
 */
import { observer } from 'mobx-react'
import store from '../../../../data/store'

/*
 * FUNCS & CONFS
 */
import {API} from '../../../../data/config'
import L,{Link} from '../../../../routes'

/*
 * LIBS
 */
import { translate } from 'react-i18next'




function Transition(props) {
  return <Slide direction="down" {...props} />;
}

@translate('common')
@observer
class AlertDialogSlide extends React.Component {
  state = {
    open: false,
    complete: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
    this.sendActivationLink()
  };

  handleClose = () => {
    this.setState({
      open: false,
      complete: true,
    }, () => {
      // store.logged.has_email_verified = true
    });
  };

  sendActivationLink = () => {
    const email = store.logged.user.email
    new API(`accounts/verify-resend/${email}`).get().then(res => {
      // alert(res.data.message)
    })
  }

  gotoSupport = () => {
    this.setState({ open: false }, () => {
      L.Router.pushRoute('support', {lang: store.language})
    })
  }

  render() {
    const { fullScreen } = this.props;
    const {t} = this.props
    const {complete} = this.state
    const user = store.logged.user

    const message_first = t('notifications__message_email_confirmation_text_2')
    let link_was_send = t('notifications__message_email_confirmation_text_1', {email: `<strong>${user.email}</strong>`})
        link_was_send = <span dangerouslySetInnerHTML={{__html: link_was_send}} />

    return (
      <div>

        <a data-link onClick={this.handleClickOpen}>
          {complete ? link_was_send : message_first}
        </a>

        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          fullScreen={fullScreen}
        >
          <DialogTitle>
            {t('notifications__message_email_confirmation_header')}
          </DialogTitle>
          <DialogContent>

            <p>{message_first}</p>

            <Divider style={{margin: '15px 0'}} />
            <DialogContentText>
              {link_was_send}
              <br /><br />
              {t('notifications__message_email_confirmation_text_3')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.gotoSupport} color="primary">
              {t('menu__support-service')}
            </Button>
            <Button onClick={this.handleClose} color="primary" variant="raised">
              {t('buttons__done')}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withMobileDialog()(AlertDialogSlide);
