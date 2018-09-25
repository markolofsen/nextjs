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
import {API, wordPostfixPreset} from '../../../../data/config';
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

/*
 * COMPONENTS
 */
import FormField from '../../../../components/BlockForm/FormField'


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

@withStyles(styles, { withTheme: true })
@translate('common')
@observer
class DialogDispute extends React.Component {
  state = {
    open: false,
    message: '',
    errors: {},
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.refreshData()
  };



  submitForm = (event) => {
    try {
			event.preventDefault()
			event.stopPropagation()
		} catch(err) {}

    const {data} = this.props
    const {message} = this.state
    const post = {message}

    new API(`users/{token}/order/${data.id}/dispute/`).post(post).then(res => {

      // if(res.data.error && res.data.errors) {
      //   this.setState({errors: res.data.errors})
      // } else
      if(!res.data.error) {
        this.props.refreshData()
        this.handleClose()
      }
    })

  }

  renderBody = () => {
    const {classes, t, data} = this.props

    return (
      <form onSubmit={this.submitForm} action='' className={classes.dialogWrapper}>
        <DialogTitle>
          {t('orders__dialog-dispute-title')}
        </DialogTitle>

        <DialogContent>

          <div>

            <FormField
              state_value={this.state.message}
              state_name="message"
              placeholder={t('orders__dialog-dispute-placeholder')}
              type="text"
              multiline
              rows={10}
              required={true}
              disabled={false}
              error={this.state.errors.message}
              noAutoComplete
              onChange={(event, name) => this.setState({ message: event.target.value })}/>

          </div>

        </DialogContent>

        <DialogContent>
          <Button type="submit" size="large" color="primary" variant="raised" fullWidth>
            {t('buttons__done')}
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

          {this.renderBody()}

        </Dialog>
      </div>
    );
  }
}

export default withMobileDialog()(DialogDispute);
