import React, {Component} from 'react';
import PropTypes from 'prop-types';

/*
 * LIBS
 */
import NumberFormat from 'react-number-format';


/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'



@withStyles(styles)
class NumberFormatBlock extends Component {

	render() {

		const {classes, number, plusMinus, postfix, decimalScale} = this.props

		if(!number) return <span />

		let number_ = parseFloat(number)

		let prefix_ = ''
		let extraClassName = classes.nothing

		if(plusMinus) {
			if(number < 0) {
				number_ = Math.abs(number)
				prefix_ = '— '
				extraClassName = classes.minus
			} else {
				prefix_ = '+ '
				extraClassName = classes.plus
			}
		}


		return (
			<span className={extraClassName}>
				<NumberFormat value={number_} displayType={'text'} decimalScale={decimalScale ? decimalScale : 0} fixedDecimalScale={true} thousandSeparator={true} prefix={prefix_} />
				{postfix ? ` ${postfix}` : ''}
			</span>
		)

	}
}

NumberFormatBlock.propTypes = {
	// number: PropTypes.number.isRequired
	number: PropTypes.oneOfType([
		PropTypes.number.isRequired,
		PropTypes.string.isRequired,
		PropTypes.bool.isRequired,
	])
};

export default NumberFormatBlock;
