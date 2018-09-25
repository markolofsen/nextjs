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
import {API} from '../../../../data/config';
import {Link} from '../../../../routes'

/*
 * LIBS
 */
import { translate } from 'react-i18next'
import moment from 'moment'

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'



function Transition(props) {
  return <Slide direction="up" {...props} />;
}

@withStyles(styles, { withTheme: true })
@translate('common')
@observer
class DialogStatusHistory extends React.Component {
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

  renderHistory = () => {
    const {classes, t, data} = this.props

    return (
      <div className={classes.dialogWrapper}>
        <DialogTitle>
          {t('orders__dialog-history-title')}
        </DialogTitle>

        <DialogContent>

          <div className={classes.tableList}>
            {data.history.map((item, index) => {
              return (
                <ul key={index}>
                  <li>
                    {t(`orders__status-${item.name}`)}
                  </li>
                  <li>
                    {moment(item.date).format("YYYY-MM-DD HH:mm:ss")}
                  </li>
                  <li>
                    {item.author ? item.author : t('chats__system-message')}
                  </li>
                </ul>
              )
            })}
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

        <div onClick={this.handleClickOpen}>
          {this.props.children}
        </div>

        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted={false}
          onClose={this.handleClose}
          maxWidth="sm"
          fullWidth
          fullScreen={fullScreen}
        >

          {this.renderHistory()}

        </Dialog>
      </div>
    );
  }
}

export default withMobileDialog()(DialogStatusHistory);
