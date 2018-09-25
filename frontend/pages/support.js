/*
 * SYSTEM
 */
import { Component } from 'react'
import withRoot from '../utils/withRoot';
import { withRouter } from 'next/router'
import { withI18next } from '../lib/withI18next'
import {deviceDetect} from 'react-device-detect';

/*
 * STORE
 */
import { observer } from 'mobx-react'
import store from '../data/store'

/*
 * CONFIG & FUNC.
 */
import {Link} from '../routes'
import {API} from '../data/config';

/*
 * COMPONENTS
 */
import NavWrapper from './NavWrapper/';
import BlockForm from '../components/BlockForm'
import FormField from '../components/BlockForm/FormField'
import FormSelect from '../components/BlockForm/FormSelect'
// import FormButton from '../components/BlockForm/FormButton'

/*
 * MATERIAL
 */
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './SupportPage/styles'


@withI18next(['common'])
@withStyles(styles, { withTheme: true })
@observer
class SupportPage extends Component {

  static async getInitialProps ({ req, query, pathname, isVirtualCall }) {
    const props = { query }
    return props
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      theme: '',
      message: '',
      errors: {},

      themes_arr: [],
      form_disabled: false,
      form_success: false,
    }
  }

  componentDidMount() {
    this.loadForm()
  }

  loadForm = () => {
    new API(`support/ticket/add/`).get().then(res => {
      if(!res.data.error) {
        this.setState({themes_arr: res.data.themes_arr})
      }
    })
  }


  handleChangeInput = (name, value) => {
    this.setState({[name]: value})
  }

  onChangeSelect = (selected, name) => {
		this.setState({[name]: selected})
	}

  submitForm = (event) => {
    try {
			event.preventDefault()
			event.stopPropagation()
		} catch(err){}

    const {email, theme, message} = this.state
    const post = {
      email, theme, message,
      system_data: deviceDetect(),
    }

    console.log(post)

    this.setState({form_disabled: true})

    new API(`support/ticket/add/`).post(post).then(res => {
      console.log(res.data)
      if(res.data.error) {
        this.setState({
          errors: res.data.errors,
        })
      } else {
        this.setState({
          form_success: true,
        })
      }

      this.setState({form_disabled: false})

    }).catch(err => {
      this.setState({form_disabled: false})
    })
  }

  renderForm = () => {
    const {query, t} = this.props
    const {errors, form_disabled} = this.state

    return (
      <form onSubmit={this.submitForm} action=''>
        <ul>
          <li>
            <FormSelect
              label={t('fields__theme')}
              options={this.state.themes_arr}
              onRef={ref => (this.refSelectSubject = ref)}
              onChange={(value) => this.onChangeSelect(value, 'theme')}
              defaultValue={['no', t('fields__choose')]}
              defaultSelected={this.state.theme}
              error={errors.theme}
              disabled={form_disabled}
            />
          </li>
          <li>
            <FormField
              label="Email"
              state_value={this.state.email}
              state_name="email"
              placeholder='Email'
              type="email"
              required={true}
              disabled={form_disabled}
              error={errors.email}
              noAutoComplete
              onChange={(event, name) => this.handleChangeInput('email', event.target.value)}/>
          </li>
          <li>
            <FormField
              label={t('fields__message')}
              state_value={this.state.message}
              state_name="message"
              placeholder={t('fields__message')}
              multiline={true}
              rows={8}
              type="text"
              required={true}
              disabled={form_disabled}
              error={errors.message}
              noAutoComplete
              onChange={(event, name) => this.handleChangeInput('message', event.target.value)}/>
          </li>
          <li>
            <Button
              onClick={this.submitForm}
              disabled={form_disabled}
              type="submit"
              color="primary"
							variant="raised"
              fullWidth>
              {t('buttons__send')}
            </Button>
          </li>
        </ul>
      </form>
    )
  }

  renderFormSuccess = () => {
    const {t, classes} = this.props

    return (
      <div>
        <ul className={classes.successWrapper}>
          <li data-li="icon">
            <Icon>check</Icon>
          </li>
          <li>
            <Typography variant="title" gutterBottom>
               {t('page-support__success-title')}
            </Typography>
            <p>
              {t('page-support__success-message')}
            </p>
          </li>
        </ul>
      </div>
    )
  }

  render () {
    const { classes, i18n, t, query, router } = this.props
    const {form_success} = this.state

    const custom_title = t('menu__support-service')


    return (
      <div>
        <NavWrapper
          query={query}
          url={router}
          t={t}
          i18n={i18n}
          title={custom_title}
          meta_description={false}
          meta_keywords={false}
          meta_preview={false}
          meta={false}
          jsonld={false} >

          <BlockForm bgid={15} title={custom_title}>
            {form_success ? this.renderFormSuccess() : this.renderForm()}
          </BlockForm>

        </NavWrapper>
      </div>
    )
  }
}



export default withRouter(withRoot(SupportPage));
