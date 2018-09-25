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
import {Link} from '../../routes'
import {API} from '../../data/config'

/*
 * LIBS
 */



@withStyles(styles, { withTheme: true })
class PasswordRecoveryBlock extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			errors: {
					email: false,
					non_field_errors: false,
			},
			form_disabled: false,
			form_complete: false,
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

		this.setState({form_disabled: true})

    const {email} = this.state
    new API('accounts/password_reset/').post(email).then(res => {

			if(res.status == 200) {
				this.setState({form_complete: true})
			} else {
				alert('Strange error!')
			}

			this.setState({form_disabled: false})
    })

	}



	render() {

		const {classes, t, query} = this.props
		const {form_disabled, form_complete, email} = this.state


		return (
			<div>
        <BlockForm bgid={16} title={t('auth__password-recovery')}>

					{form_complete && <div className={classes.formSuccess}>{t('auth__recovery_message')}</div>}

					<form onSubmit={this.submitForm}>

						<FormField
							state_value={this.state.email}
							state_name="email"
							placeholder="Email"
							type="email"
							required={true}
							disabled={form_disabled}
							error={false}
							noAutoComplete
							onChange={(event, name) => this.handleChangeInput('email', event.target.value)}/>

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

PasswordRecoveryBlock.propTypes = {
	// classes: PropTypes.object.isRequired,
	// data: PropTypes.object.isRequired,
};

export default PasswordRecoveryBlock;
