import React, {Component} from 'react';
import PropTypes from 'prop-types';


/*
 * MATERIAL
 */
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

/*
 * LIBS
 */
import PhoneInput from 'react-phone-number-input/react-responsive-ui'
import classnames from 'classnames'


/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'



@withStyles(styles)
class FormPhone extends Component {

  state = {
    phone: '+'
  }

  componentDidMount() {
    const {phone} = this.props
    if(phone.length > 0) {
      this.setState({phone})
      this.props.onChange(phone)
    }
  }

  onChangePhone(phone) {
    this.props.onChange(phone)

    this.setState({phone})

  }

	render() {

    const {classes, label, error} = this.props

		return (
      <FormControl className={classes.formControl} error={error ? true : false}>
        {label && <InputLabel className={classes.textFieldPhoneLabel}>{label}</InputLabel>}

  			<div className={classnames(classes.textFieldInput, classes.textFieldPhone)}>

          <PhoneInput
            placeholder="Phone"
            value={this.state.phone}
            onChange={ phone => this.onChangePhone(phone) } />
        </div>

        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
		)
	}
}

FormPhone.propTypes = {
  onChange: PropTypes.func.isRequired,
  phone: PropTypes.string.isRequired,
};

export default FormPhone
