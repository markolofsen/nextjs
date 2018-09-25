import React, {Component} from 'react';
import PropTypes from 'prop-types';

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'

/*
 * COMPONENTS
 */
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

/*
 * LIBS
 */
import {CopyToClipboard as Clipboard} from 'react-copy-to-clipboard';



@withStyles(styles)
class CopyToClipboard extends Component {

	state = {
    copied: false,
  };

  render() {
		const {classes, text, label} = this.props

    return (
      <div className={classes.textWrapper}>
        <ul className={classes.valueList}>
					<li>{label}</li>
					<li>{text}</li>
				</ul>
        <Clipboard text={text}
          onCopy={() => this.setState({copied: true})}>

					{this.state.copied ?
						<IconButton component="span" className={classes.button}>
		          <Icon>check</Icon>
		        </IconButton>
					:
						<IconButton color="primary" component="span" className={classes.button}>
							<Tooltip title="Copy to clipboard">
								<Icon>file_copy</Icon>
							</Tooltip>
						</IconButton>

					}
        </Clipboard>


      </div>
    );
  }
}

CopyToClipboard.propTypes = {
	text: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
};

export default CopyToClipboard;
