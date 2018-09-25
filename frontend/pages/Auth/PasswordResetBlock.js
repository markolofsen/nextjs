/*
 * SYSTEM
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'

/*
 * MATERIAL
 */
import Button from '@material-ui/core/Button';


/*
 * COMPONENTS
 */
import BlockForm from '../../components/BlockForm'
import FormField from '../../components/BlockForm/FormField'
// import FormButton from '../../components/BlockForm/FormButton'

 /*
  * CONFIG & FUNC.
  */
import L,{Link} from '../../routes'
import {API} from '../../data/config'

/*
 * LIBS
 */
const _ = require('lodash')



@withStyles(styles, { withTheme: true })
class PasswordResetBlock extends Component {

	constructor(props) {
		super(props);
		this.state = {
			new_password: '',
      new_password_2: '',
			errors: {
				new_password: '',
	      new_password_2: '',
				non_field_errors: false,
			},
			form_disabled: false,
		};
	}

	handleChangeInput = (state, value) => {
		this.setState({[state]: value});
	};

	submitForm = (e) => {
		try {
			e.preventDefault()
			e.stopPropagation()
		} catch(err) {}

		this.setState({form_disabled: true}, () => {})

		const {query} = this.props
    const {new_password, new_password_2} = this.state

		if(typeof query.uid === 'undefined' || typeof query.token === 'undefined') {
			alert('Error: wrong link')
		}

    let post = {new_password, new_password_2}

    new API(`accounts/reset/${query.uid}/${query.token}/`).send(post).then(res => {
			if(res.status == 400) {
				let errors = {}
				_.keys(res.data).map((item, index) => {
					errors[item] = res.data[item][0]
				})
				this.setState({errors}, () => {})
			} else if(res.status == 200) {
				alert('Password changed!')

				L.Router.pushRoute('auth', {lang: query.lang})
			}
    })

		this.setState({form_disabled: false}, () => {})
	}

	renderFormError() {
		const {classes, t} = this.props
		const {errors} = this.state
		let e = errors.non_field_errors
		if(e) {
			if(typeof e === 'object') e = e[0]

			return <div className={classes.formError}>{t(e)}</div>
		}

		return ''
	}

	render() {

		const {classes, t, query} = this.props
		const {form_disabled} = this.state

		return (
			<div>
        <BlockForm bgid={17} title={t('auth__password-reset')}>

					{this.renderFormError()}

					<form onSubmit={this.submitForm}>

            <FormField
							state_value={this.state.new_password}
							state_name="new_password"
							placeholder={t('auth__password')}
							type="password"
							required={true}
							disabled={form_disabled}
							error={t(this.state.errors.new_password)}
							noAutoComplete
							onChange={(event, name) => this.handleChangeInput('new_password', event.target.value)}/>

            <FormField
							state_value={this.state.new_password_2}
							state_name="new_password_2"
							placeholder={t('auth__repeat-password')}
							type="password"
							required={true}
							disabled={form_disabled}
							error={t(this.state.errors.new_password_2)}
							noAutoComplete
							onChange={(event, name) => this.handleChangeInput('new_password_2', event.target.value)}/>

						<Button
							data-button="large"
							disabled={form_disabled}
							type="submit"
							color="primary"
							variant="raised"
							fullWidth>
							{t('auth__done')}
						</Button>

					</form>

					<ul className={classes.footerLinks}>
            <li>
							<Link route='auth' params={{ lang: query.lang, type: 'signup' }}><a data-link>
								{t('auth__create-an-account')}
							</a></Link>
						</li>
						<li>
							<Link route='auth' params={{ lang: query.lang, type: 'login' }}><a data-link>
								{t('auth__have-an-account')}
							</a></Link>
						</li>
					</ul>
        </BlockForm>
			</div>
		)
	}
}

PasswordResetBlock.propTypes = {
	// classes: PropTypes.object.isRequired,
	// data: PropTypes.object.isRequired,
};

export default PasswordResetBlock;
