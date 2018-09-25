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
 * LIBS
 */
import { translate } from 'react-i18next'

/*
 * FUNCS & CONFS
 */
import L,{Link} from '../../../../routes'
import {wordPostfixPreset} from '../../../../data/config'


function Transition(props) {
  return <Slide direction="down" {...props} />;
}

@translate('common')
@observer
class AlertDialogSlide extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  gototolink = () => {
    L.Router.pushRoute('user_affiliate', {lang: store.language})
    this.handleClose()
  }

  render() {
    const { fullScreen } = this.props;
    const {t, children} = this.props

    const header_text = t('notifications__message_affiliate')
    const text_price = `${wordPostfixPreset(t, 'customers', 1)} = ${wordPostfixPreset(t, 'points', store.bonuses.affiliate)}`



    return (
      <div style={{width: '100%'}}>

        <div onClick={this.handleClickOpen}>
          {this.props.children}
        </div>

        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          fullScreen={fullScreen}
        >
          <DialogTitle>
            {header_text}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t('affiliates__text_access')}
              <br />
              {t('affiliates__text_attract')}
              <Divider style={{margin: '15px 0'}} />
              <span dangerouslySetInnerHTML={{__html: text_price}} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>
              {t('buttons__cancel')}
            </Button>
            <Button onClick={this.gototolink} color="primary" variant="raised">
              {t('buttons__more')}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withMobileDialog()(AlertDialogSlide);
