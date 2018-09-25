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
import {Link} from '../routes'
import {API} from '../data/config';

/*
 * COMPONENTS
 */
import NavWrapper from './NavWrapper/';
import Breadcrumbs from '../components/Breadcrumbs/';
import Button from '@material-ui/core/Button';
import CurrencyWidget from './PostsPage/CurrencyWidget/';

/*
 * MATERIAL
 */
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './PostsPage/styles'



@withWidth()
class WidthComponent extends Component {

  render() {
    const {width, title, data} = this.props
    return (
      <div>
        <img title={title} alt={title} src={width && (width == 'xs' || width == 'sm') ? data.background.small : data.background.large} />
      </div>
    )
  }

  // <img title={d.title} alt={d.title} src={width && (width == 'xs' || width == 'sm') ? data.background.small : data.background.large} />
}

@withI18next(['common'])
@withStyles(styles, { withTheme: true })
@observer
class PostsDetailPage extends Component {

  static async getInitialProps ({ req, query, pathname, isVirtualCall }) {

    const data = await new API(`${query.lang}/pages/${query.slug}/?crosslinks`).get().then(res => res.data)
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
      alternate: meta('alternate'),
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
          jsonld={false}
          canonical={`/${query.lang}/post/${data.slug}`}
          alternate={d.alternate}
          >
          <div>

            <div className={classes.breadcrumbs}>
              <Breadcrumbs
               lang={query.lang}
               t={t}
               data={[
                 {
      							 title: t('menu__blog'),
      							 router: "posts",
      							 params: {}
      					 },
                 {
      							 title: d.title,
      							 router: "posts_detail",
      							 params: {
                       slug: query.slug
                     }
      					 },
              ]} />
            </div>



            {data.background.small && data.background.large ?
              <div className={classes.backgroundWrapper}>
                 <WidthComponent title={d.title} data={data}/>
              </div> : ''}

            <div className={classes.contentWrapper}>

              <div>
                <div className={classes.detailsWrapper}>
                  <Typography variant="display1" gutterBottom>
                     {d.title}
                  </Typography>
                  <div data-pretty-text dangerouslySetInnerHTML={{__html: data.text_html}} />

                  <div className={classes.relatedWrapper}>
                    <ul>
                      {data.related.map((item, index) => {
                        return (
                          <li>
                            <Typography variant="headline" gutterBottom headlineMapping={{headline: 'h2'}} >
                              <Link route='posts_detail' params={{ lang: query.lang, slug: item.slug }}><a data-link>
                                {item.title}
                              </a></Link>
                            </Typography>
                            {item.text}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>

              </div>
              <div>
                <CurrencyWidget />
              </div>

            </div>

          </div>
        </NavWrapper>
      </div>
    )
  }
}



export default withRouter(withRoot(PostsDetailPage));
