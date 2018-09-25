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
import Paginator from '../components/Paginator/';
import PostItem from './PostsPage/PostItem/';
import Breadcrumbs from '../components/Breadcrumbs/';
import CurrencyWidget from './PostsPage/CurrencyWidget/';

/*
 * MATERIAL
 */
import Typography from '@material-ui/core/Typography';

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './PostsPage/styles'



@withI18next(['common'])
@withStyles(styles, { withTheme: true })
@observer
class PostsPage extends Component {

  static async getInitialProps ({ req, query, pathname, isVirtualCall }) {

    const page = typeof query.pagination === 'string' ? query.pagination : 1;
    const data = await new API(`${query.lang}/pages/?page=${page}`).get().then(res => res.data)

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
      title: t('menu__blog'),
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


            <Breadcrumbs
             lang={query.lang}
             t={t}
             data={[
               {
    							 title: d.title,
    							 router: "posts",
    							 params: {}
    					 },
            ]} />

            <div className={classes.contentWrapper}>

              <div>
                {data.results.map((item, index) => {
                  return (
                    <PostItem key={index} t={t} data={item} query={query} />
                  )
                })}

                <Paginator
                  pagesTotal={data.page.pages}
                  pagesCurrent={data.page.current}
                  route='posts'
                  params={{ lang: query.lang }}
                />
                
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



export default withRouter(withRoot(PostsPage));
