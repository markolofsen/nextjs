import React, {Component} from 'react';
import PropTypes from 'prop-types';

/*
 * COMPONENTS
 */
import FormField from './FormField'



/*
 * LIBS
 */
import NumberFormat from 'react-number-format';




/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'



function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  const prefix = props.name ? `${props.name} ` : ''
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix={prefix}
    />
  );
}


@withStyles(styles)
class FormFieldNumber extends Component {


	render() {

		return (
			<div>
				<FormField
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
          {...this.props}
         />
			</div>
		)
	}
}

FormFieldNumber.propTypes = {
	// classes: PropTypes.object.isRequired,
};

export default FormFieldNumber;
