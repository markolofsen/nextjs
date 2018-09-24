import React from 'react';
import App, { Container } from 'next/app';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from '../lib/getPageContext';

/*
 * STORE
 */
import { Provider } from 'mobx-react'
import withMobxStore from '../stores/mobx'
import storeUser from '../stores/storeUser'


/*
 * LOADING
 */
import NProgress from 'nprogress'
import Router from 'next/router'

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())




class MyApp extends App {
  static async getInitialProps ({ Component, router, req, ctx }) {
    let pageProps = {}
    // const isServer = !!req
    // const store = initStore(isServer)

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    // return { pageProps, initialState: getSnapshot(store), isServer }
    return { pageProps }
  }


  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
    // this.store = initStore(props.isServer, props.initialState)
  }

  pageContext = null;

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, mobxStore } = this.props;
    return (
      <Container>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
            <Provider storeGlobal={mobxStore} storeUser={storeUser()}>
              <Component pageContext={this.pageContext} {...pageProps} />
            </Provider>

          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}

export default withMobxStore(MyApp);
