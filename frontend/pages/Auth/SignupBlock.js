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
import L, {Link} from '../../routes'
import {API, LOC} from '../../data/config'
import {auth} from '../../data/auth'

/*
 * LIBS
 */
const _ = require('lodash')


@withStyles(styles, { withTheme: true })
class SignupBlock extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			errors: {
					username: false,
					email: false,
					password: false,
					non_field_errors: false,
			},
			form_disabled: false,
		};
	}

	handleChangeInput = (state, value) => {
		this.setState({[state]: value});
	};

	submitForm = async (e) => {
		try {
			e.preventDefault()
			e.stopPropagation()
		} catch(err) {}

		const {query} = this.props

		this.setState({form_disabled: true})

    const {username, email, password, password_2} = this.state
    let post = {
        username, email, password,
        password_2: password,
        first_name: username,
        last_name: username,
        // invite_code: '',
        affiliate_code: new LOC().getLocal('affiliate').code,
				lang: query.lang,
    }
		// console.log(post)
    await new API('accounts/register/').post(post).then(res => {

			// console.log(res.data)

			if(res.status == 400) {
				let errors = {}
				_.keys(res.data).map((item, index) => {
					errors[item] = res.data[item][0]
				})
				this.setState({errors}, () => {})
			} else if(res.status == 201) { // SUCCESS
				auth(email, password).then(res => { //authorization
					if(query.return) {
						L.Router.back()
					} else {
						L.Router.pushRoute('user_orders', {lang: query.lang})
					}
				})


			} else {
				alert('Strange error')
			}

			this.setState({form_disabled: false})

    })

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
		const {errors, form_disabled} = this.state

		return (
			<div>
        <BlockForm bgid={18} title={t('auth__registration')}>

					{this.renderFormError()}

					<form onSubmit={this.submitForm}>
            <FormField
							state_value={this.state.username}
							state_name="username"
							placeholder={t('auth__username')}
							type="text"
							required={true}
							disabled={form_disabled}
							error={errors.username ? t(errors.username) : false}
							noAutoComplete
							onChange={(event, name) => this.handleChangeInput('username', event.target.value)}/>

						<FormField
							state_value={this.state.email}
							state_name="email"
							placeholder="Email"
							type="email"
							required={true}
							disabled={form_disabled}
							error={errors.email ? t(errors.email) : false}
							noAutoComplete
							onChange={(event, name) => this.handleChangeInput('email', event.target.value)}/>

						<FormField
							state_value={this.state.password}
							state_name="password"
							placeholder={t('auth__password')}
							type="text"
							required={true}
							disabled={form_disabled}
							error={errors.password ? t(errors.password) : false}
							noAutoComplete
							onChange={(event, name) => this.handleChangeInput('password', event.target.value)}/>

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
							<Link route='auth' params={{ lang: query.lang, type: 'login' }}><a data-link>
								{t('auth__have-an-account')}
							</a></Link>
						</li>
						<li>
							<Link route='auth' params={{ lang: query.lang, type: 'recovery' }}><a data-link>
								{t('auth__password-recovery')}
							</a></Link>
						</li>
					</ul>
        </BlockForm>
			</div>
		)
	}
}

SignupBlock.propTypes = {
	// classes: PropTypes.object.isRequired,
	// data: PropTypes.object.isRequired,
};

export default SignupBlock;
