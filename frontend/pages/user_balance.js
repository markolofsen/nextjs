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
import MessageBlock from './User/MessageBlock/'
import SmartTable from '../components/SmartTable/'
import TimeAgo from '../components/TimeAgo/'
import NumberFormat from '../components/NumberFormat/'
import AuthChecker from '../components/AuthChecker/';


/*
 * MATERIAL
 */
import Typography from '@material-ui/core/Typography';

/*
 * LIBS
 */
import moment from 'moment'

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './User/Balance/styles'


@withI18next(['common'])
@withStyles(styles, { withTheme: true })
@observer
class UserBalancePage extends Component {

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
    new API(`users/{token}/transactions/?page=${pageNumber}`).get().then(res => {
      this.setState({data: res.data}, () => {})
    })
  }

  renderInner = (custom_title) => {
    const {data} = this.state
    const {query, t} = this.props

    return (
      <div data-content>
        <Typography variant="display1" gutterBottom>
           {custom_title}
        </Typography>

        <MessageBlock />

        <SmartTable
          route='user_balance'
					params={{ lang: query.lang }}
          data={data}
          cols={[
      			{
      				name: 'ID',
      				class: 'id',
      				value: d => `#${d.id}`,
      			},
      			{
      				name: 'Amount',
      				class: 'amount',
      				value: d => <NumberFormat number={d.amount} plusMinus postfix={'points'} />,
      			},
      			{
      				name: 'Description',
      				class: 'description',
      				value: d => {
      					const ord = d.order ? `#${d.order}` : '';
      					return `${d.type} ${ord}`
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
      		]}
        />

      </div>
    )
  }

  render () {
    const { classes, i18n, t, query, router } = this.props

    const custom_title = t('menu__balance')

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



export default withRouter(withRoot(UserBalancePage));
