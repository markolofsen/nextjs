/*
 * SYSTEM
 */
import { Component } from 'react'

/*
 * CONFIG & FUNC.
 */
import L,{Link} from '../../../routes'

/*
 * MATERIAL
 */
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

/*
 * COMPONENTS
 */
import TimeAgo from '../../../components/TimeAgo/';

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'


@withStyles(styles, { withTheme: true })
export default class PostItem extends Component {

  render() {
    const {classes, t, data, query} = this.props

    return (
      <ul className={classes.postItem}>
        <li data-li="header">
          <ul>
            <li>{data.type}</li>
            <li data-li="date">
              <TimeAgo prefix={false} date={data.created_at} />
            </li>
          </ul>
        </li>
        <li data-li="content">
          <Typography variant="headline" gutterBottom headlineMapping={{headline: 'h2'}} >
            <Link route='posts_detail' params={{ lang: query.lang, slug: data.slug }}><a data-link>
              {data.title}
            </a></Link>
          </Typography>
          {data.text}
        </li>
        {data.background_preview &&
          <li
            data-li="preview"
            onClick={() => {L.Router.pushRoute('posts_detail', {
              lang: query.lang,
              slug: data.slug
            })}}
            style={{
              backgroundImage: `url(${data.background_preview})`
            }} />}
        <li data-li="footer">
          <ul
            onClick={() => {L.Router.pushRoute('posts_detail', {
              lang: query.lang,
              slug: data.slug
            })}}
            >
            <li><Icon>chat_bubble_outline</Icon></li>
            <li>{t('buttons__discuss')}</li>
          </ul>
        </li>
      </ul>
    )
  }

}
