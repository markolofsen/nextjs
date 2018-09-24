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
@inject('storeGlobal') @inject('storeUser') @observer
class IndexPage extends React.Component {

  static async getInitialProps () {
    return {}
  }

  render() {
    const { classes, t, storeGlobal, storeUser } = this.props;
    return (
      <div>
				<NavWrapper>
          <div>
            {storeGlobal.light ? 'true' : 'false'}
            <br />
            {/* {this.props.t('buttons__done')} */}
            <br />
            <div onClick={storeGlobal.ch}>
              Children are here
            </div>

            <p>{storeGlobal.options}</p>
            <p>{storeGlobal.options2()}</p>
            <button onClick={() => { storeGlobal.x++; }}>x plus 1</button>


            <br />
            !{storeUser.username}!

            <button onClick={() => { storeUser.changeName('Lesly') }}>Lesly</button>

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
