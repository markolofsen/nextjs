import React from 'react';

/*
 * MATERIAL
 */
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

/*
 * TRANSITIONS
 */
function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

class DirectionSnackbar extends React.Component {
  state = {
    open: false,
    Transition: null,
    text: '',
  };

  componentDidMount() {
    this.props.onRef(this)
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  loadSnackUp = (text) => {
    this.setState({
      text,
      open: true,
      Transition: TransitionUp
    });
  }


  handleClick = Transition => () => {
    this.setState({ open: true, Transition });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Snackbar
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={this.state.Transition}
          ContentProps={{
            // 'aria-describedby': 'message-id',
          }}
          message={<span>{this.state.text}</span>}
        />
      </div>
    );
  }
}

export default DirectionSnackbar;
