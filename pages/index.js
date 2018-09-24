/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
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
    open: false,
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

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

        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>Super Secret Password</DialogTitle>
          <DialogContent>
            <DialogContentText>1-2-3-4-5</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Typography variant="display1" gutterBottom>
          Material-UI
        </Typography>
        <Typography variant="subheading" gutterBottom>
          example project
        </Typography>
        <Typography gutterBottom>
          <Link href="/about">
            <a>Go to the about page</a>
          </Link>
        </Typography>
        <Button variant="contained" color="secondary" onClick={this.handleClick}>
          Super Secret Password
        </Button>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withRoot(withStyles(styles)(Index)));
