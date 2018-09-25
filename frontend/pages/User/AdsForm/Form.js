import React from 'react';


/*
 * MATERIAL
 */
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';


import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

/*
 * STORE
 */
import { observer } from 'mobx-react'
import store from '../../../data/store'

/*
 * CONFIG & FUNC.
 */
import {API, numberFormatFunc} from '../../../data/config';
import L, {Link} from '../../../routes'


/*
 * LIBS
 */
import { translate } from 'react-i18next'
const _ = require('lodash')


/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'

/*
 * COMPONENTS
 */
import Preloader from '../../../components/Preloader/'
import FormField from '../../../components/BlockForm/FormField'
import FormFieldNumber from '../../../components/BlockForm/FormFieldNumber'
import FormSelect from '../../../components/BlockForm/FormSelect'
// import FormButton from '../../../components/BlockForm/FormButton'
// import NumberFormat from '../../../components/NumberFormat/'
import StickyDiv from '../../../components/StickyDiv/'



function Transition(props) {
  return <Slide direction="up" {...props} />;
}





@withStyles(styles, { withTheme: true })
@translate('common')
@observer
class AlertDialogSlide extends React.Component {
  state = {

    direction_switcher: true,
    currency_from: '',
    currency_to: '',
    location: '',
    payment_methods: '',
    price: '',
    amount_min: '',
    amount_max: '',
    title: '',
    description: '',

    errors: {},

    form_disabled: false,
    edit_disabled: false,
    preloader: false,
  };

  componentDidMount() {
    const {query} = this.props
    const offer_id = query.id ? query.id : 0

    this.setState({preloader: true})
    if(offer_id) {
      new API(`users/{token}/ads/details/${offer_id}/`).get().then(res => {
        if(!res.data.error) {
          const d = res.data.data
          _.keys(d).map((item, index) => {
            try {
              this.setState({[item]: d[item]})
            } catch(err) {}
          })
        }
        this.setState({
          edit_disabled: true,
          preloader: false
        })
      })
    } else {
      this.setState({preloader: false})
    }
  }


  handleChangeInput = (name, value) => {
    this.setState({[name]: value})
  }

  onChangeSelect = (selected, name) => {
		this.setState({[name]: selected})
	}

  handleChangeRadio = name => event => {
    this.setState({ [name]: event.target.checked });
  };


  submitForm = (event) => {
    try {
			event.preventDefault()
			event.stopPropagation()
		} catch(err){}

    const {query} = this.props
    const offer_id = query.id ? query.id : 0


    const {
      direction_switcher,
      currency_from,
      currency_to,
      location,
      payment_methods,
      price,
      amount_min,
      amount_max,
      title,
      description,
    } = this.state



    const post = {
      direction: direction_switcher ? 'sell' : 'buy',
      currency_from,
      currency_to,
      location,
      payment_methods,
      price,
      amount_min: amount_min ? amount_min : false,
      amount_max: amount_max ? amount_max : false,
      title, description,
    }


    this.setState({form_disabled: true})

    new API(`users/{token}/ads/details/${offer_id}/`).post(post).then(res => {

      if(res.data.error) {
        this.setState({errors: res.data.errors,})
      } else
      if(res.status == 200 && !res.data.error) {
          L.Router.pushRoute('user_ads', {lang: query.lang})
      } else {
        alert('Error!')
      }

      this.setState({form_disabled: false})
    }).catch(err => {
      this.setState({form_disabled: false})
    })

  }


  renderForm() {

    const {classes, t} = this.props
    const {errors, form_disabled, edit_disabled} = this.state

		const direction_from = !this.state.direction_switcher ? t('ads-form__sell') : t('ads-form__buy')
		const direction_to = this.state.direction_switcher ? t('ads-form__sell') : t('ads-form__buy')



    return (
      <form onSubmit={this.submitForm} action=''>
        <div className={classes.formWrapper}>


          <ul data-list>
            <li>
              <FormSelect
                label={direction_to}
                options={_.filter(store.currencies_arr, { crypto: true })}
                onRef={ref => (this.refSelectCurrencyTo = ref)}
                onChange={(value) => this.onChangeSelect(value, 'currency_to')}
                defaultValue={['caption', t('ads-form__i-want', {type: direction_to.toLowerCase()})]}
                defaultSelected={this.state.currency_to}
                error={errors.currency_to}
                disabled={form_disabled || edit_disabled}
              />
            </li>
            <li data-li="switcher">
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.direction_switcher}
                    onChange={this.handleChangeRadio('direction_switcher')}
                    disabled={form_disabled || edit_disabled}
                    value='direction'
                    classes={{
                      switchBase: classes.colorSwitchBase,
                      checked: classes.colorChecked,
                      bar: classes.colorBar,
                    }}
                  />
                }
                label={`${t('ads-form__i-want', {type: direction_to.toLowerCase()})} ${this.state.currency_to}`}
              />
            </li>
          </ul>

          <ul data-list>
            <li>
              <FormSelect
                label={direction_from}
                options={_.filter(store.currencies_arr, { crypto: false })}
                onRef={ref => (this.refSelectCurrencyFrom = ref)}
                onChange={(value) => this.onChangeSelect(value, 'currency_from')}
                defaultValue={['caption', t('ads-form__i-want', {type: direction_from.toLowerCase()})]}
                defaultSelected={this.state.currency_from}
                error={errors.currency_from}
                disabled={form_disabled || edit_disabled}
              />
            </li>
            <li>
              <FormFieldNumber
                label={t('ads-form__your-price')}
                state_value={this.state.price}
                state_name="price"
                placeholder={t('ads-form__your-price')}
                type="text"
                prefix={this.state.currency_from}
                required={true}
                disabled={form_disabled}
                error={errors.price}
                noAutoComplete
                onChange={(event, name) => this.handleChangeInput('price', event.target.value)}/>
            </li>
          </ul>


          <ul data-list>
            <li>
              <FormFieldNumber
                label={`${t('ads-form__amount-min')}: ${this.state.currency_from}`}
                state_value={this.state.amount_min}
                state_name="amount_min"
                placeholder={t('ads-form__amount-min')}
                type="text"
                prefix={this.state.currency_from}
                required={false}
                disabled={form_disabled}
                error={errors.amount_min}
                noAutoComplete
                onChange={(event, name) => this.handleChangeInput('amount_min', event.target.value)}/>
            </li>
            <li>
              <FormFieldNumber
                label={`${t('ads-form__amount-max')}: ${this.state.currency_from}`}
                state_value={this.state.amount_max}
                state_name="amount_max"
                placeholder={t('ads-form__amount-max')}
                type="text"
                prefix={this.state.currency_from}
                required={false}
                disabled={form_disabled}
                error={errors.amount_max}
                noAutoComplete
                onChange={(event, name) => this.handleChangeInput('amount_max', event.target.value)}/>
            </li>
          </ul>
          <ul data-list>
            <li>
              <FormSelect
                label={t('ads-form__location')}
                options={store.locationsTranslate(t)}
                onRef={ref => (this.refSelectLocation = ref)}
                onChange={(value) => this.onChangeSelect(value, 'location')}
                defaultValue={['no', t('ads-form__choose')]}
                defaultSelected={this.state.location}
                error={errors.location}
                disabled={form_disabled || edit_disabled}
              />
            </li>
            <li>
              <FormSelect
                label={t('ads-form__payment-method')}
                options={store.payment_methods_arr}
                onRef={ref => (this.refSelectPaymentMethods = ref)}
                onChange={(value) => this.onChangeSelect(value, 'payment_methods')}
                defaultValue={['no', t('ads-form__choose')]}
                defaultSelected={this.state.payment_methods}
                error={errors.payment_methods}
                disabled={form_disabled || edit_disabled}
              />
            </li>
          </ul>


          <Divider data-divider />


          <Typography variant="display1" gutterBottom>
             {t('ads-form__field-description')}
          </Typography>

          <FormField
            state_value={this.state.title}
            state_name="title"
            placeholder={t('ads-form__field-title')}
            type="text"
            required={true}
            disabled={form_disabled}
            error={errors.title}
            noAutoComplete
            onChange={(event, name) => this.handleChangeInput('title', event.target.value)}/>

          <FormField
            state_value={this.state.description}
            state_name="text"
            placeholder={t('ads-form__field-description')}
            type="text"
            multiline
            required={true}
            disabled={form_disabled}
            error={errors.description}
            noAutoComplete
            onChange={(event, name) => this.handleChangeInput('description', event.target.value)}/>

          <button type="submit" style={{display: 'none'}} />

        </div>
      </form>
    )
  }

  renderWidget() {
    const {classes, t} = this.props
    const {form_disabled, direction_switcher, payment_methods, price, location, currency_from, currency_to, amount_min, amount_max} = this.state

    let payment_label = false
		if(payment_methods) {
			try {
				payment_label = _.filter(store.payment_methods_arr, { value: payment_methods })[0].label
			} catch(err) {}
		}

    let location_label = false
		if(location) {
			try {
				location_label = _.filter(store.locations_arr, { value: location })[0].label
			} catch(err) {}
		}


    let price_comission_percent = (parseFloat(price) / 100) * parseFloat(store.system_commission)
    const price_comission = parseFloat(price) + price_comission_percent

    // if(direction_switcher) {
    //   price_comission = parseFloat(price) + price_comission_percent
    // } else {
    //   price_comission = parseFloat(price) - price_comission_percent
    // }

    let decimal_from = 0
    store.currencies_arr.map(item => {
      if(item.value == currency_from) {
        decimal_from = item.decimal
      }
    })

    return (
      <div data-box className={classes.widgetWrapper}>
        <Typography variant="title" gutterBottom>
           {t('ads-form__widget-header')}
        </Typography>

        <div>
          {t('ads-form__you-want', {
            type: direction_switcher ? t('ads-form__sell').toLowerCase() : t('ads-form__buy').toLowerCase(),
            currency: currency_to ? currency_to : '***',
            payment: payment_label ? payment_label : '***',
            location: location_label ? location_label : '***',
          })}
        </div>



        <div>
          <Divider data-divider />

          <Typography variant="title" gutterBottom>
             {t('ads-form__your-limits')}
          </Typography>

          {!amount_max && <span>{t('ads-form__your-limits-from')}&nbsp;</span>}
          {amount_min ? <span>
            {amount_min}&nbsp;
          </span> : 0}

          {amount_max && <span>
            &nbsp;— {amount_max}
          </span>}

          &nbsp;{currency_from}
        </div>



        {currency_from && currency_to && price && <div>
          <Divider data-divider />
          <Typography variant="title" gutterBottom>
             {t('ads-form__your-price')}
          </Typography>
          1 {currency_to} = {numberFormatFunc(price, decimal_from)} {currency_from}

          <Divider data-divider />
          <Typography variant="title" gutterBottom>
             {t('ads-form__commission-price')} {store.system_commission}%
          </Typography>

          1 {currency_to} = {numberFormatFunc(price_comission, decimal_from)} {currency_from}

        </div>}

        <Divider data-divider />

        <Button
          data-button="large"
          onClick={this.submitForm}
          disabled={form_disabled}
          type="submit"
          color="primary"
          variant="raised"
          fullWidth>
          {t('buttons__save')}
        </Button>
      </div>
    )
  }


  render() {
    const {classes, t, query} = this.props
    const {preloader} = this.state


    if(preloader) {
      return (
        <div style={{padding: 30}}>
          <Preloader />
        </div>
      )
    }

    return (
      <div>

        <ul className={classes.wrapper}>
          <li>

            <Typography variant="display1" gutterBottom>
               {t('menu__my-ads-form')} {query.id && `#${query.id}`}
            </Typography>

            {this.renderForm()}
          </li>
          <li>
            <StickyDiv
              disabledWidth={['xs','sm']}
              enabled={true} marginTop={15}>
              {this.renderWidget()}
            </StickyDiv>
          </li>
        </ul>

      </div>
    );
  }
}

export default AlertDialogSlide;
