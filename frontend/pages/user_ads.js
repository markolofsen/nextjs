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
import L,{Link} from '../routes'
import {API} from '../data/config';

/*
 * COMPONENTS
 */
import NavWrapper from './NavWrapper/';
import AuthChecker from '../components/AuthChecker/';
import Preloader from '../components/Preloader/';
import Paginator from '../components/Paginator/';
import ItemView from './User/Ads/ItemView/';


/*
 * MATERIAL
 */
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './User/Ads/styles'


@withI18next(['common'])
@withStyles(styles, { withTheme: true })
@observer
class UserAdsPage extends Component {

  static async getInitialProps ({ req, query, pathname, isVirtualCall }) {

    const props = { query }

    return props
  }

  state = {
    data: false,
  }

  componentDidMount() {
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

    this.setState({data: false}, () => {})
    new API(`users/{token}/ads/list/?page=${pageNumber_}`).get().then(res => {
      this.setState({data: res.data}, () => {})
    })
  }

  deleteItem = (offer_id) => {
    new API(`users/{token}/ads/details/${offer_id}/`).delete().then(res => {
      this.loadData()
    })

  }

  renderInner = (d) => {
    const {data} = this.state
    const {query, t} = this.props

    if(!data) {
      return (
        <div style={{padding: 30}}>
          <Preloader />
        </div>
      )
    }


    if(data.results.length == 0) {
      return (
        <div data-cabinet="isEmptyBlock">
          <div>
            <Typography variant="display2">
              {t('ads__no-ads')}
            </Typography>
            <div data-el="buttons">
              <Button
                onClick={() => { L.Router.pushRoute('user_ads_form', {lang: query.lang}) }}
                variant="raised" color="secondary" fullWidth>
                {t('ads__add-ad')}
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div>

        {data.results.map((item, index) => <ItemView key={index} t={t} query={query} data={item} deleteItem={this.deleteItem} />)}

        <Paginator
          pagesTotal={data.page.pages}
          pagesCurrent={data.page.current}
          route='user_ads'
          params={{ lang: query.lang }}
         />

      </div>
    )
  }

  render () {
    const { classes, i18n, t, query, router } = this.props


    const custom_title = t('menu__my-ads')


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
                  <li>
                    <Button
                      onClick={() => { L.Router.pushRoute('user_ads_form', {lang: query.lang}) }}
                      variant="raised" color="secondary" fullWidth>
                      {t('ads__add-ad')}
                    </Button>
                  </li>
                </ul>

                {this.renderInner()}
              </div>
            </AuthChecker>


        </NavWrapper>
      </div>
    )
  }
}



export default withRouter(withRoot(UserAdsPage));
