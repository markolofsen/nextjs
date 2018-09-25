import React from 'react';
import PropTypes from 'prop-types';

/*
 * MATERIAL
 */
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
// import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

/*
 * LIBS
 */
import FontAwesome from 'react-fontawesome';

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'



@withStyles(styles)
class ControlledOpenSelect extends React.Component {
	state = {
		value: false,
		open: false,
	};

	componentDidMount() {
		const {defaultValue, defaultSelected} = this.props

		if(defaultSelected) {
			this.setState({value: defaultSelected})
		} else if(defaultValue) this.setState({value: defaultValue[0]})

		if (this.props.onRef) {
			this.props.onRef(this)
		}
	}

	componentWillUnmount() {
		this.props.onRef(undefined)
	}

	getState() {
		return this.state.value
	}

	handleChange = e => {
    e.stopPropagation();
		this.setState({
			[e.target.name]: e.target.value
		});

		if(typeof this.props.onChange === 'function') {
			this.props.onChange(e.target.value)
		}
	};

	handleClose = (e) => {
		e.stopPropagation();
		this.setState({open: false});
	};

	handleOpen = (e) => {
		e.stopPropagation();
		this.setState({open: true});
	};


	renderIcon(item) {
		const {classes} = this.props
		if(typeof item.icon !== 'undefined' && typeof item.icon_font !== 'undefined') {

			return (
				<div className={classes.selectMenuItemIcon}>
					{item.icon_font == 'fontawesome' ? <FontAwesome name={item.icon} /> : <Icon>{item.icon}</Icon>}
				</div>
			)

		}

		return <div />
	}

	render() {
		const {classes, options, defaultValue, state_name, label, error, disabled} = this.props;
		const error_id = state_name ? `field-${state_name}-error` : false
		const field_id = state_name ? `field-${state_name}` : false

		return (
			<FormControl className={label ? classes.formControlPadding : classes.formControl} error={error ? true : false} aria-describedby={error_id}>
				{label && <InputLabel htmlFor={field_id}
					classes={{
						root: classes.formControlLabel,
					}} >{label}</InputLabel>}
				<Select
					disabled={disabled}
					open={this.state.open}
					onClose={this.handleClose}
					onOpen={this.handleOpen}
					value={this.state.value}
					onChange={this.handleChange}
					inputProps={{
						name: 'value',
						id: field_id
					}} classes={{
						root: classes.fieldRoot,
						select: classes.fieldSelect
					}}>
					{defaultValue &&
					<MenuItem value={defaultValue[0]} disabled={true}>
						<em>{defaultValue[1]}</em>
					</MenuItem>}
					{options.map((item, index) => {
						if(!item) return <Divider />
						return (
							<MenuItem key={index} value={item.value}>
								<div className={classes.menuItem}>
									{this.renderIcon(item)}
									<ul>
										<li>{item.label}</li>
										{item.hint && <li>{item.hint}</li>}
									</ul>
								</div>
							</MenuItem>
						)
					})}
				</Select>
				{error && <FormHelperText className={classes.formHelper} id={error_id}>{error}</FormHelperText>}
			</FormControl>
		);
	}
}

ControlledOpenSelect.propTypes = {
	// classes: PropTypes.object.isRequired,
	options: PropTypes.oneOfType([
		PropTypes.object.isRequired,
		PropTypes.array.isRequired
	]),
	defaultValue: PropTypes.array,
};

export default ControlledOpenSelect;
