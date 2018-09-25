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
import {API, wordPostfixPreset} from '../data/config';

/*
 * COMPONENTS
 */
import NavWrapper from './NavWrapper/';
import SmartTable from '../components/SmartTable/'
import TimeAgo from '../components/TimeAgo/'
import NumberFormat from '../components/NumberFormat/'
import CopyToClipboard from '../components/CopyToClipboard/'
import AuthChecker from '../components/AuthChecker/';

/*
 * MATERIAL
 */
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';


/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './User/Affiliate/styles'


/*
 * LIBS
 */
import moment from 'moment'




@withI18next(['common'])
@withStyles(styles, { withTheme: true })
@observer
class UserAffiliatePage extends Component {

  static async getInitialProps ({ req, query, pathname, isVirtualCall }) {

    const props = { query }

    return props
  }

  state = {
    data: false,
  }


  componentDidMount() {

    const {query} = this.props
    const pageNumber = typeof query.pagination === 'string' ? query.pagination : 1;
    this.loadData(pageNumber)
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props.query.pagination != nextProps.query.pagination) {
      this.loadData(nextProps.query.pagination)
    }
  }

  loadData = (pageNumber) => {
    this.setState({data: false}, () => {})
    new API(`users/{token}/affiliates/?page=${pageNumber}`).get().then(res => {
      this.setState({data: res.data}, () => {})
    })
  }



  renderInner = (custom_title) => {
    const {data} = this.state
    const {query, t} = this.props
    const {classes} = this.props

    if(!store.logged) return <div />

    return (
      <div data-content>

        <ul className={classes.pageHeader}>
          <li>
            <Typography variant="display1" gutterBottom>
              {custom_title}
            </Typography>
          </li>
          <li>
            <CopyToClipboard
              label={'Your partner link:'}
              text={store.affiliate_link} />
          </li>
        </ul>

        <div className={classes.messageWrapper} data-message="warning">

          <div>
            {t('notifications__message_affiliate')}
          </div>
          <span dangerouslySetInnerHTML={{__html:
            `${wordPostfixPreset(t, 'customers', 1)} = ${wordPostfixPreset(t, 'points', store.bonuses.affiliate)}`
          }} />


          <Divider style={{margin: '10px 0'}} />

          <p>{t('affiliates__attention-text-confirmation')}</p>
          <p>{t('affiliates__attention-text-fake')}</p>

        </div>



        <SmartTable
          route='user_affiliate'
					params={{ lang: query.lang }}
          data={data}
          cols={[
      			{
      				name: 'Customer ID',
      				class: 'id',
      				value: d => d.customer ? `#${d.customer}` : 'New',
      			},
      			{
      				name: 'Confirmed',
      				class: 'confirmed',
      				value: d => {
                return d.customer_status ? 'Confirmed' : 'No'
              },
      			},
      			{
      				name: 'Date',
      				class: 'date',
              value: d => {
      					return (
      						<span>
      						{moment(d.created).format('MM/DD/YYYY')}
      						<div data-el="date-ago">
      							<TimeAgo date={d.created} />
      						</div>
      					</span>
      					)
      				}
      			},
            {
      				name: 'Earning',
      				class: 'earning',
      				value: d => <NumberFormat number={d.earning} plusMinus postfix={'points'} />,
      			},
      		]}
        />

      </div>
    )
  }

  render () {
    const { classes, i18n, t, query, router } = this.props


    const custom_title = t('menu__affiliate-program')


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
            {this.renderInner(custom_title)}
          </AuthChecker>

        </NavWrapper>
      </div>
    )
  }
}



export default withRouter(withRoot(UserAffiliatePage));
