/*
 * SYSTEM
 */
import { Component } from 'react'
import withRoot from '../utils/withRoot';
import { withRouter } from 'next/router'
import { withI18next } from '../utils/withI18next'
import { Trans } from 'react-i18next'
import {isBrowser, isMobile} from 'react-device-detect';

/*
 * STORE
 */
// import { inject, observer } from 'mobx-react'

/*
 * CONFIG & FUNC.
 */
import {Link} from '../routes'
import {API} from '../data/config';

/*
 * COMPONENTS
 */
import NavWrapper from './NavWrapper/';
import LoginBlock from './Auth/LoginBlock'
import SignupBlock from './Auth/SignupBlock'
import PasswordResetBlock from './Auth/PasswordResetBlock'
import PasswordRecoveryBlock from './Auth/PasswordRecoveryBlock'

/*
 * MATERIAL
 */
import Typography from '@material-ui/core/Typography';

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './Auth/styles'


@withI18next(['common'])
@withStyles(styles, { withTheme: true })
class IndexPage extends Component {

  static async getInitialProps ({ req, query, pathname, isVirtualCall }) {

    const props = { query }

    return props
  }

  constructor(props) {
    super(props);
    this.state = {}
  }




  render () {
    const { classes, i18n, t, query, router } = this.props


    const custom_title = t('auth__authorization')


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

          <div>

            {query.type == 'reset' && <PasswordResetBlock query={query} t={t} />}
            {query.type == 'recovery' && <PasswordRecoveryBlock query={query} t={t} />}
            {query.type == 'signup' && <SignupBlock query={query} t={t} />}
            {(typeof query.type === 'undefined' || query.type == 'login') && <LoginBlock query={query} t={t} />}
          </div>
        </NavWrapper>
      </div>
    )
  }
}



export default withRouter(withRoot(IndexPage));
