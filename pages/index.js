/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';


// theme, styles, langs, mobx
import { withRouter } from 'next/router'
import withRoot from '../lib/withRoot';
import { withI18next } from '../lib/withI18next'
import { inject, observer } from 'mobx-react'



import { withStyles } from '@material-ui/core/styles';
import {styles} from './IndexPage/styles'


/*
 * COMPONENTS
 */
import NavWrapper from './NavWrapper/'



@withStyles(styles)
@withI18next(['common'])
@inject('store') @inject('storeUser') @observer
class IndexPage extends React.Component {

  static async getInitialProps () {
    return {}
  }

  render() {
    const { classes, t, store, storeUser } = this.props;
    return (
      <div>
				<NavWrapper>
          <div>
            {store.light ? 'true' : 'false'}
            <br />
            {/* {this.props.t('buttons__done')} */}
            <br />
            <div onClick={store.ch}>
              Children are here
            </div>

            <p>{store.options}</p>
            <p>{store.options2()}</p>
            <button onClick={() => { store.x++; }}>x plus 1</button>

            !{storeUser.username}!

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
