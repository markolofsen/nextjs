/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';




import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';


import { withRouter } from 'next/router'
import withRoot from '../lib/withRoot';

import Helmet from 'react-helmet'
import dynamic from 'next/dynamic'
import { inject, observer } from 'mobx-react'


const Page = dynamic({
  loader: () => import('../components/Page'),
  loading: () => (<p>Loading caused by client page transition ...</p>),
  ssr: false
})
const DynamicBundle = dynamic({
  modules: () => {
    const components = {
      Hello6: import('../components/Page'),
      Hello7: import('../components/Page')
    }
    return components
  },
  render: (props, { Hello6, Hello7 }) => (
    <div style={{padding: 10, border: '1px solid #888'}}>
      <Hello6 title='Index Page' linkTo='/about' />
      <Hello7 title='Index Page' linkTo='/about' />
    </div>
  )
})


const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});


@inject('store') @observer
class Index extends React.Component {
  static async getInitialProps ({ req }) {
    if (req) {
      Helmet.renderStatic()
    }
    return { title: 'About' }
  }


  state = {
  };


  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>

        <Helmet
          title={`OK | Hello next.js!`}
          meta={[{ property: 'og:title', content: 'OK' }]}
        />

        <Page title='Index Page' linkTo='/about' />
        {this.props.store.hello ? 'true' : 'false'}

        <DynamicBundle />

        <div onClick={this.props.store.check}>Click</div>

      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withRoot(withStyles(styles)(Index)));
