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

/*
 * MATERIAL
 */
import Typography from '@material-ui/core/Typography';

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';


// import {withStyles} from '@material-ui/core/styles';
// import {styles} from './Contacts/styles'



@withI18next(['common'])
class TermsPage extends Component {
  static async getInitialProps ({ req, query, pathname, isVirtualCall }) {

    const data = await new API(`${query.lang}/pages/terms/`).get().then(res => res.data)

    const props = { query, data }
    return props
  }


  render () {
    const { i18n, t, query, router } = this.props
    const { data } = this.props

    if(data.error) {
      try { L.Router.pushRoute('index', {lang: query.lang}) } catch(err) {}
      return <div />
    }

    function meta(name) { try { return data.meta[name] } catch(err) { return false } }
    const d = {
      title: meta('title'),
      description: meta('description'),
      keywords: meta('keywords'),
      preview: meta('preview_src'),
    }

    return (
      <div>
        <NavWrapper
          query={query}
          url={router}
          query={query}
          t={t}
          i18n={i18n}
          title={d.title}
          meta_description={d.description}
          meta_keywords={d.keywords}
          meta_preview={d.preview}
          meta={false}
          jsonld={false} >

          <div data-content>

            <Typography variant="display1" gutterBottom>
              {d.title}
            </Typography>

            <div dangerouslySetInnerHTML={{__html: data.text_html}} />

          </div>
        </NavWrapper>
      </div>
    )
  }
}



export default withRouter(withRoot(TermsPage));
