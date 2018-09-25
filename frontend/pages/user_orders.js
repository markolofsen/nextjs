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
import L, {Link} from '../routes'
import {API} from '../data/config';

/*
 * COMPONENTS
 */
import NavWrapper from './NavWrapper/';
import MessageBlock from './User/MessageBlock/'
import OrderItem from './User/Orders/OrderItem/'
import Preloader from '../components/Preloader/'
import Paginator from '../components/Paginator/';
import Button from '@material-ui/core/Button';
import AuthChecker from '../components/AuthChecker/';


/*
 * MATERIAL
 */
import Typography from '@material-ui/core/Typography';

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './User/Orders/styles'

/*
 * LIBS
 */
// import ReactTimeout from 'react-timeout'



@withI18next(['common'])
@withStyles(styles, { withTheme: true })
@observer
class UserOrdersPage extends Component {

  static async getInitialProps ({ req, query, pathname, isVirtualCall }) {
    const props = { query }
    return props
  }

  state = {
    data: false,
  }

  componentDidMount() {
    this.refreshData()
  }

  refreshData = (full=false) => {
    if(full) this.setState({data: false})
    this.loadData()
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props.query.pagination != nextProps.query.pagination) {
      this.loadData(nextProps.query.pagination)
    }
  }



  loadData = (pageNumber=false) => {
    const {query} = this.props
    const pageNumber_ = pageNumber ? pageNumber : ( typeof query.pagination !== 'undefined' ? query.pagination : 1 )
    new API(`users/{token}/orders/outcome/?page=${pageNumber_}`).get().then(res => {
      if(typeof res.data.results !== 'undefined') {
        this.setState({data: res.data}, () => {})
      }
    }).catch(err => {
      setTimeout(() => {
        this.loadData(this.props.pagination)
      }, 10*1000)
    })
  }

  cancelOrder = (order_id) => {
    new API(`users/{token}/order/${order_id}/cancel/`).post().then(res => {
      this.loadData(this.props.query.pagination)
    })
	}

  renderItems() {
    const {data} = this.state
    const {query, classes, t} = this.props

    if(data.results.length == 0) {
      return (
        <div data-cabinet="isEmptyBlock">
          <div>
            <Typography variant="display2">
              {t('orders__no-orders')}
            </Typography>
            <div data-el="buttons">
              <Link route='index' params={{ lang: query.lang }}><a data-link="button">
                <Button variant="contained" color="secondary">
                  {t('orders__add-order')}
                </Button>
              </a></Link>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        {data.results.map((item, index) => (<OrderItem key={index} data={item} cancelOrder={this.cancelOrder} refreshData={this.refreshData} itemType='outcome' />))}

        <Paginator
          pagesTotal={data.page.pages}
          pagesCurrent={data.page.current}
          route='user_orders'
          params={{ lang: query.lang }}
         />
      </div>
    )
  }


  render () {
    const { classes, i18n, t, query, router } = this.props
    const {data} = this.state

    const custom_title = t('menu__orders-outcome')

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
            <div data-content>
              <ul data-cabinet="cabinerHeader">
                <li>
                  <Typography variant="display1" gutterBottom>
                     {custom_title}
                  </Typography>
                </li>
                <li data-li="buttons">
                  <Button variant="outlined" color="primary" onClick={() => { this.refreshData(true) }}>
                    {t('buttons__refresh')}
                  </Button>

                  <Button variant="raised" color="secondary" onClick={() => { L.Router.pushRoute('index', {lang: query.lang}) }}>
                    {t('orders__add-order')}
                  </Button>
                </li>
              </ul>


              <MessageBlock />
              {data ? this.renderItems() : <Preloader />}

            </div>
          </AuthChecker>
        </NavWrapper>
      </div>
    )
  }
}



export default withRouter(withRoot(UserOrdersPage));
