/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';


// theme, styles, langs, mobx
import { withRouter } from 'next/router'
import withRoot from '../lib/withRoot';
import { withI18next } from '../lib/withI18next'
import { inject, observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles';


/*
 * COMPONENTS
 */
import NavWrapper from './NavWrapper/'


const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});



@withStyles(styles)
@withI18next(['common'])
@inject('store') @observer
class IndexPage extends React.Component {

  static async getInitialProps () {
    return {}
  }

  render() {
    const { classes, t, store } = this.props;
    return (
      <div>
				<NavWrapper>
          <div>
            {store.hello ? 'true' : 'false'}
            <br />
            {this.props.t('buttons__done')}
            <br />
            <div onClick={store.check}>
              Children are here
            </div>
          </div>
        </NavWrapper>
      </div>
    );
  }
}

IndexPage.propTypes = {
  // classes: PropTypes.object.isRequired,
};

export default withRouter(withRoot(IndexPage));
