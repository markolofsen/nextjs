/*
 * SYSTEM
 */
import { Component } from 'react'

/*
 * STORE
 */
import { observer } from 'mobx-react'
import store from '../../../data/store'

/*
 * CONFIG & FUNC.
 */
// import L,{Link} from '../../../routes'
import {API, numberFormatFunc} from '../../../data/config';

/*
 * COMPONENTS
 */
import StickyDiv from '../../../components/StickyDiv/'
import Preloader from '../../../components/Preloader/'


/*
 * LIBS
 */
import { translate } from 'react-i18next'

/*
 * MATERIAL
 */
import Typography from '@material-ui/core/Typography';

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'



@withStyles(styles, { withTheme: true })
@observer
@translate('common')
export default class CurrencyWidget extends Component {

	state = {
		data: false
	}

	componentDidMount() {
		const {query} = this.props
		new API(`${store.language}/currencies/`).get().then(res => {
      this.setState({data: res.data.results})
		})
	}

  render () {
    const { classes, t, query } = this.props
		const {data} = this.state

    return (
      <div>
				<StickyDiv enabled={true} marginTop={15} disabledWidth={['xs','sm']}>
	        <div className={classes.stickyDiv}>

	          <h3>
	            {t('base__slogan')}
	          </h3>

						{!this.state.data ? <Preloader /> :
	          <div>

							{this.state.data.map((item, index) => {
	              return (
	                <ul key={index}>
	                  <li>{item.label}</li>
	                  <li>$ {numberFormatFunc(item.price_usd, 2)}</li>
	                </ul>
	              )
	            })}
	          </div>}

	        </div>
	      </StickyDiv>
      </div>
    )
  }
}
