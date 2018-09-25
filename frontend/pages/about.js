/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';



import { withRouter } from 'next/router'
import { withI18next } from '../utils/withI18next'
import withRoot from '../utils/withRoot';


import { inject, observer } from 'mobx-react'


const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});



@inject('store') @observer
@withStyles(styles)
@withI18next(['common'])
class About extends React.Component {

  static async getInitialProps () {
    await new Promise((resolve) => {
      setTimeout(resolve, 100)
    })
    return {}
  }

  render() {
    const { classes, t } = this.props;
    return (
      <div className={classes.root}>

        <h1>{t('buttons__done')}</h1>

        {this.props.store.hello ? 'true' : 'false'}
        <Typography variant="display1" gutterBottom>
          Material-UI
        </Typography>
        <Typography variant="subheading" gutterBottom>
          about page
        </Typography>
        <Typography gutterBottom>
          <Link href="/">
            <a>Go to the main page</a>
          </Link>
        </Typography>
        <Button variant="contained" color="primary">
          Do nothing button
        </Button>
      </div>
    );
  }
}

About.propTypes = {
  // classes: PropTypes.object.isRequired,
};

export default withRouter(withRoot(About));
