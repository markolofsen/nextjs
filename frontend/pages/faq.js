/*
 * SYSTEM
 */
import { Component } from 'react'
import withRoot from '../utils/withRoot';
import { withRouter } from 'next/router'
import { withI18next } from '../lib/withI18next'
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
import BlockHeaderBg from '../components/BlockHeaderBg/';
import ContentDrawer from './FaqPage/ContentDrawer/';


/*
 * MATERIAL
 */
import Typography from '@material-ui/core/Typography';

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './FaqPage/styles'


@withStyles(styles, { withTheme: true })
class FaqGroup extends Component {


  render() {
    const {t, classes, group} = this.props

    return (
      <div className={classes.groupWrapper}>

        <ContentDrawer onRef={ref => (this.refContentDrawer = ref)} />

        <Typography variant="display2" gutterBottom>
          {t(`faq__title-${group.name}`)}
        </Typography>

        <ul>
          {group.data.map((item, index) => {
            return (
              <li key={index} onClick={() => this.refContentDrawer.loadData(item.id)}>
                {item.title}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

@withI18next(['common'])
@withStyles(styles, { withTheme: true })
@observer
class FaqPage extends Component {

  static async getInitialProps ({ req, query, pathname, isVirtualCall }) {
    const data = await new API(`${query.lang}/faq/`).get().then(res => res.data)
    const props = { query, data }
    return props
  }

  constructor(props) {
    super(props);
    this.state = {
    }

  }


  render () {
    const { classes, i18n, t, query, router } = this.props
    const {data} = this.props

    // if(data.error) {
    //   try { L.Router.pushRoute('index', {lang: query.lang}) } catch(err) {}
    //   return <div />
    // }

    function meta(name) { try { return data.meta[name] } catch(err) { return false } }
    const d = {
      title: t('menu__faq'),
      description: meta('description'),
      keywords: meta('keywords'),
      preview: meta('preview_src'),
    }

    return (
      <div>
        <NavWrapper
          query={query}
          url={router}
          t={t}
          i18n={i18n}
          title={d.title}
          meta_description={d.description}
          meta_keywords={d.keywords}
          meta_preview={d.preview}
          meta={false}
          jsonld={false} >

          <div>

            <BlockHeaderBg bgid={8} title={d.title}>
              <div>
                {data.results.map((group, index) => {
                  return (
                    <FaqGroup key={index} t={t} group={group} />
                  )
                })}
              </div>
            </BlockHeaderBg>

          </div>
        </NavWrapper>
      </div>
    )
  }
}



export default withRouter(withRoot(FaqPage));
