/*
 * SYSTEM
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

/*
 * MATERIAL
 */
import Button from '@material-ui/core/Button';

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'

/*
 * STORE
 */
import { observer } from 'mobx-react'
import {store} from '../../stores/storeGlobal'

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

/*
 * LIBS
 */
import {API, LOC} from '../../data/config'
import {auth, tokenAuth} from '../../data/auth'


@withStyles(styles, { withTheme: true })
@observer
class LoginBlock extends Component {

	state = {
		email: '',
		password: '',
		errors: {
				email: false,
				password: false,
				non_field_errors: false,
		},
		form_disabled: false,
	};

	componentDidMount() {
		const {query} = this.props
		if(store.logged) {

			if(query.return) {
				L.Router.push(query.return)
			} else {
				L.Router.pushRoute('user_orders', {lang: query.lang})
			}

		} else {
			const preload = new LOC().getLocal('user')
			if(preload && typeof preload.email !== 'undefined') this.setState({email: preload.email})
			this.userVerify()
		}
	}

	handleChangeInput = (state, value) => {
		this.setState({[state]: value});
	};

	submitForm = (e) => {
		try {
			e.preventDefault()
			e.stopPropagation()
		} catch(err) {}

		const {query} = this.props
		this.setState({form_disabled: true}, () => {})

		const {email, password} = this.state

		auth(email, password).then(res => {
			console.log(res.data)
			if(res.status == 400) {
				this.setState({errors: res.data})
			} else {
				L.Router.pushRoute('user_orders', {lang: query.lang})
				store.initLogin()
			}

			this.setState({form_disabled: false}, () => {})
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


	// Verification link from email
	userVerify() {
		const {query} = this.props
		if(typeof query.verify !== 'undefined') {
			new API(`accounts/verify/${query.verify}/`).get().then(res => {
				if(res.status == 200) {
					tokenAuth()
					L.Router.pushRoute('user_orders', {lang: query.lang, message: 'verified'})
				} else {
					alert('Not verified!')
				}
			})
		}
	}

	render() {

		const {classes, t, query} = this.props
		const {form_disabled, errors} = this.state

		return (
			<div>
        <BlockForm bgid={15} title={t('auth__authorization')}>

					{this.renderFormError()}

					<form onSubmit={this.submitForm}>
						<FormField
							state_value={this.state.email}
							state_name="email"
							placeholder="Email"
							type="email"
							required={true}
							disabled={form_disabled}
							error={errors.email ? t(errors.email): false}
							noAutoComplete
							onChange={(event, name) => this.handleChangeInput('email', event.target.value)}/>

						<FormField
							state_value={this.state.password}
							state_name="password"
							placeholder={t('auth__password')}
							type="password"
							required={true}
							disabled={form_disabled}
							error={errors.password ? t(errors.password): false}
							noAutoComplete
							onChange={(event, name) => this.handleChangeInput('password', event.target.value)}/>

						<Button
							data-button="large"
							disabled={form_disabled}
							type="submit"
							color="primary"
							variant="raised"
							fullWidth>
							{t('auth__sign-in')}
						</Button>

					</form>

					<ul className={classes.footerLinks}>
						<li>
							<Link route='auth' params={{ lang: query.lang, type: 'signup' }}><a data-link>
								{t('auth__create-an-account')}
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

LoginBlock.propTypes = {
	// classes: PropTypes.object.isRequired,
	// data: PropTypes.object.isRequired,
};

export default LoginBlock;
