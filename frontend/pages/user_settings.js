/*
 * SYSTEM
 */
import { Component } from 'react'
import withRoot from '../utils/withRoot';
import { withRouter } from 'next/router'
import { withI18next } from '../lib/withI18next'
import { Trans } from 'react-i18next'
import {isBrowser, isMobile} from 'react-device-detect';

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
import AuthChecker from '../components/AuthChecker/';
import BlockForm from '../components/BlockForm'
import FormField from '../components/BlockForm/FormField'
import FormPhone from '../components/BlockForm/FormPhone'
import FormSelect from '../components/BlockForm/FormSelect'
// import FormButton from '../components/BlockForm/FormButton'
import Preloader from '../components/Preloader/'
import SnackBottom from '../components/SnackBar/SnackBottom'


/*
 * MATERIAL
 */
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

/*
 * LIBS
 */
import moment from 'moment'

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './User/Settings/styles'


@withI18next(['common'])
@withStyles(styles, { withTheme: true })
@observer
class UserSettingsPage extends Component {

  static async getInitialProps ({ req, query, pathname, isVirtualCall }) {
    const props = { query }
    return props
  }

  state = {
    username: '',
    name: '',
    email: '',
    phone: '',
    location: '',
    language: '',
    errors: {},

    form_disabled: false,
    form_loaded: false,
  }

  componentDidMount() {
    this.loadSettings()
  }

  loadSettings = () => {
    new API('users/{token}/settings/').get().then(res => {

      if(!res.data.error) {
        const d = res.data.data
        this.setState({
          form_loaded: true,
          username: d.username,
          name: d.name,
          email: d.email,
          phone: d.phone,
          location: d.location,
          language: d.language,
        })
      }

    })
  }

  onChangeSelect = (selected, name) => {
		this.setState({[name]: selected})
	}

  handleChangeInput = (name, value) => {
    this.setState({[name]: value})
  }

  submitForm = (event) => {
    try {
			event.preventDefault()
			event.stopPropagation()
		} catch(err){}

    const {t} = this.props

    const {
      email,
      name,
      phone,
      location,
      language
    } = this.state

    const post = {
      email,
      name,
      phone,
      location,
      language
    }
    // console.log(post)

    this.setState({form_disabled: true})
    new API('users/{token}/settings/').post(post).then(res => {

      if(res.data.error) {
        this.setState({errors: res.data.errors,})
      } else {
        this.refSnackBar.loadSnackUp(t('system-messages__saved-successfully'))
        this.setState({errors: {}})
      }

      this.setState({form_disabled: false})
    }).catch(err => {
      this.setState({form_disabled: false})
    })
  }

  renderInner = () => {
    const {query, t} = this.props
    const {errors, form_loaded, form_disabled} = this.state


    if(!form_loaded) return <Preloader  />

    return (
      <div data-content>
        <form onSubmit={this.submitForm} action=''>
          <ul>
            <li>
              <FormField
                label={t('fields__username')}
                state_name="username"
                state_value={this.state.username}
                type="text"
                disabled={true} />
            </li>
            <li>
              <FormField
                state_value={this.state.name}
                state_name="title"
                label={t('fields__name')}
                placeholder={t('fields__name')}
                type="text"
                required={true}
                disabled={form_disabled}
                error={errors.name}
                noAutoComplete
                onChange={(event, name) => this.handleChangeInput('name', event.target.value)}/>
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
              <FormSelect
                label={t('ads-form__location')}
                options={store.locations_arr}
                onRef={ref => (this.refSelectLocation = ref)}
                onChange={(value) => this.onChangeSelect(value, 'location')}
                defaultValue={['no', t('ads-form__choose')]}
                defaultSelected={this.state.location}
                error={errors.location}
                disabled={form_disabled}
              />
            </li>
            <li>
              <FormSelect
                label={t('fields__language')}
                options={store.languages_arr}
                onRef={ref => (this.refSelectLanguage = ref)}
                onChange={(value) => this.onChangeSelect(value, 'language')}
                defaultValue={['no', t('ads-form__choose')]}
                defaultSelected={this.state.language}
                error={errors.language}
                disabled={form_disabled}
              />
            </li>
            <li>
              <FormPhone
                error={errors.phone}
                label={t('fields__phone')}
                onChange={(value) => this.handleChangeInput('phone', value)}
                phone={this.state.phone} />
            </li>

            <li>
              <Button
                onClick={this.submitForm}
                disabled={form_disabled}
                type="submit"
                color="primary"
  							variant="raised"
                fullWidth>
                {t('buttons__save')}
              </Button>
            </li>
          </ul>
        </form>

        <SnackBottom
          onRef={ref => (this.refSnackBar = ref)}
         />

      </div>
    )
  }

  render () {
    const { classes, i18n, t, query, router } = this.props

    const custom_title = t('menu__my-settings')


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


            <AuthChecker query={query} router={router}>
              <BlockForm bgid={11} title={custom_title}>
                {this.renderInner()}
              </BlockForm>
            </AuthChecker>

        </NavWrapper>
      </div>
    )
  }
}



export default withRouter(withRoot(UserSettingsPage));
