import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Input, { InputLabel } from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NumberFormat from 'react-number-format';

import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'



function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix={props.prefix}
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};



@withStyles(styles)
class FormField extends Component {

    state = {}


	render() {

        const {classes, state_name, state_value, label, type, multiline=false, rowsMax=40, rows=6, required, disabled, error, placeholder=false, autoFocus, noAutoComplete, InputProps, prefix} = this.props
        const error_id = `field-${state_name}-error`
        const field_id = `field-${state_name}`

        let placeholder_ = placeholder ? placeholder : label


        let InputProps_ = {
          ...InputProps,
          disableUnderline: true,
          classes: {
            root: classes.textFieldRoot,
            input: classes.textFieldInput,
            multiline: classes.textAFieldTextareaRoot,
            inputMultiline: classes.textAFieldTextarea,
          },
        }


        let type_ = type
        if(type == 'money') {
            type_ = 'text'
            InputProps_['inputComponent'] = NumberFormatCustom
            InputProps_['autoComplete'] = 'off'

            InputProps_['inputProps'] = {
              'aria-label': '',
              // 'prefix': '',
            }
        }

		return (
			<div>
        <FormControl className={classes.formControl} error={error ? true : false} aria-describedby={error_id}>
          <TextField
              placeholder={placeholder_}
              defaultValue=""
              label={label}
              value={state_value}
              id={field_id}
              type={type_}
              required={required}
              disabled={disabled}
              multiline={multiline}
              rowsMax={rowsMax ? rowsMax : 1}
              rows={multiline ? rows : 1}
              name={prefix}
              InputProps={InputProps_}
              InputLabelProps={{
                shrink: true,
                className: classes.textFieldFormLabel,
              }}
              onChange={(event) => this.props.onChange(event, state_name)}
              onClick={this.props.onClick}
              autoFocus={autoFocus}
              autoComplete={noAutoComplete ? 'off' : 'on'}
            />
          {error && <FormHelperText className={classes.formHelper} id={error_id}>{error}</FormHelperText>}
        </FormControl>
      </div>
		)
	}
}

FormField.propTypes = {
  state_name: PropTypes.string.isRequired,
  state_value: PropTypes.any.isRequired,
  // label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  error: PropTypes.any.isRequired,
  // onChange: PropTypes.func.isRequired,
};

export default FormField
