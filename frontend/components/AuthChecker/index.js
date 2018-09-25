import React from 'react';
import PropTypes from 'prop-types';


/*
 * CONF & FUNCS
 */
import {LOC} from '../../data/config'
import L from '../../routes'

/*
 * COMPONENTS
 */
import Preloader from '../Preloader/'

class AuthChecker extends React.Component {

  state = {
    logged: false
  }

  componentDidMount() {
    this.checkAuthentication()
  }

  checkAuthentication = () => {
    const {query, router} = this.props
    if(!new LOC().getSession('auth')) {
      this.setState({logged: false})
      L.Router.pushRoute('auth', {
        lang: query.lang,
        return: router.asPath,
      })
    } else {
      this.setState({logged: true})
    }
  }

  render() {

    const {logged} = this.state

    return logged ? this.props.children : <Preloader />
  }
}

AuthChecker.propTypes = {
	query: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

export default AuthChecker;
