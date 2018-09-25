import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  avatar: {
    // margin: 10,
  },
  bigAvatar: {
    // width: 50,
    // height: 50,
  },
};

function ImageAvatars(props) {
  const { classes, src, title, size } = props;

  if(!src || src.length == 0) return <div />

  return (
    <div>
      <Avatar
        alt={title}
        src={src}
        className={classNames(classes.avatar, classes.bigAvatar)}
        style={{
          width: size ? size : 50,
          height: size ? size : 50,
        }}
      />
    </div>
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
  // src: PropTypes.string.isRequired,
};

export default withStyles(styles)(ImageAvatars);
