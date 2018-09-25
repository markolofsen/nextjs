/*
 * SYSTEM
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';


/*
 * STORE
 */
import { observer } from 'mobx-react'
import store from '../../../data/store'


/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'

/*
 * MATERIAL
 */
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';


/*
 * COMPONENTS
 */
import Preloader from '../../../components/Preloader/'


/*
 * CONFIG & FUNC.
 */
// import L,{Link} from '../../../routes'
import {API} from '../../../data/config'



@withStyles(styles, { withTheme: true })
@observer
class ContentDrawer extends Component {

	state = {
		active: false,
		data: false,
	}

	componentDidMount() {
		this.props.onRef(this)
	}

	componentWillUnmount() {
		this.props.onRef(undefined)
	}

	loadData = (slug) => {
		this.setState({active: true})
		new API(`${store.language}/pages/${slug}`).get().then(res => {
			const data = {
				title: res.data.meta.title,
				text_html: res.data.text_html,
			}
			this.setState({data})
		})
	}

	toggleDrawer = (open) => () => {
    this.setState({
			active: open,
			data: false,
		})
  };

	renderInner = () => {
		const {data} = this.state

		if(!data) return <Preloader />

		return (
			<div>
				<Typography variant="display1" gutterBottom>
          {data.title}
        </Typography>

				<div data-content>
					<div dangerouslySetInnerHTML={{__html: data.text_html}} />
				</div>

			</div>
		)
	}

	render() {

		const {classes} = this.props

		return (
			<div>
				<Drawer anchor="right" open={this.state.active} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            <div className={classes.wrapper}>
							{this.renderInner()}
						</div>
          </div>
        </Drawer>
			</div>
		)
	}
}

ContentDrawer.propTypes = {
	// classes: PropTypes.object.isRequired,
	// data: PropTypes.object.isRequired,
};

export default ContentDrawer;
