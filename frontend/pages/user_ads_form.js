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
import AdsForm from './User/AdsForm/Form'


/*
 * MATERIAL
 */
import Typography from '@material-ui/core/Typography';

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './User/Ads/styles'


@withI18next(['common'])
@withStyles(styles, { withTheme: true })
@observer
class UserAdsFormPage extends Component {

  static async getInitialProps ({ req, query, pathname, isVirtualCall }) {
    const props = { query }
    return props
  }

  constructor(props) {
    super(props);
    this.state = {}
  }

  renderInner = () => {
    const {query, t} = this.props

    return (
      <div data-content>

        <AdsForm query={query} />

      </div>
    )
  }

  render () {
    const { classes, i18n, t, query, router } = this.props

    const custom_title = t('menu__my-ads-form')

    return (
      <div>
        <NavWrapper
          query={query}
          url={router}
          t={t}
          i18n={i18n}
          title={custom_title}
          >

            <AuthChecker query={query} router={router}>
              {this.renderInner()}
            </AuthChecker>

        </NavWrapper>
      </div>
    )
  }
}



export default withRouter(withRoot(UserAdsFormPage));
