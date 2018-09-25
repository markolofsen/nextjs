import React, {Component} from 'react';
import PropTypes from 'prop-types';

/*
 * LIBS
 */
import { translate } from 'react-i18next'

/*
 * MATERIAL
 */
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withWidth from '@material-ui/core/withWidth';

/*
 * COMPONENTS
 */


/*
 * LIBS
 */
import {
	FacebookShareCount,
	GooglePlusShareCount,
	LinkedinShareCount,
	PinterestShareCount,
	VKShareCount,
	OKShareCount,
	RedditShareCount,
	TumblrShareCount,

	FacebookShareButton,
	GooglePlusShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	PinterestShareButton,
	VKShareButton,
	OKShareButton,
	TelegramShareButton,
	WhatsappShareButton,
	RedditShareButton,
	EmailShareButton,
	TumblrShareButton,
	LivejournalShareButton,
	MailruShareButton,
	ViberShareButton,
	WorkplaceShareButton,

	FacebookIcon,
	TwitterIcon,
	GooglePlusIcon,
	LinkedinIcon,
	PinterestIcon,
	VKIcon,
	OKIcon,
	TelegramIcon,
	WhatsappIcon,
	RedditIcon,
	TumblrIcon,
	MailruIcon,
	EmailIcon,
	LivejournalIcon,
	ViberIcon,
	WorkplaceIcon,
} from 'react-share';

/*
 * STYLES
 */
import {withStyles} from '@material-ui/core/styles';
import {styles} from './styles'




class SharingList extends Component {

	render() {
		const {t, classes, title, shareUrl, previewUrl} = this.props

		const round = false
		const iconSize = 32

		const icons_arr = [
			{
				button: (<EmailShareButton url={shareUrl} subject={title} body="body">
					<ul>
						<li><EmailIcon size={iconSize} round={round} /></li>
						<li>{t('sharing__item-email')}</li>
					</ul>
				</EmailShareButton>),
				counter: false,
			},
			{
				button: (<FacebookShareButton url={shareUrl} quote={title}>
					<ul>
						<li><FacebookIcon size={iconSize} round={round} /></li>
						<li>Facebook</li>
					</ul>
				</FacebookShareButton>),
				counter: (<FacebookShareCount url={shareUrl}>{count => count}</FacebookShareCount>),
			},
			{
				button: (<TwitterShareButton url={shareUrl} title={title}>
					<ul>
						<li><TwitterIcon size={iconSize} round={round} /></li>
						<li>Twitter</li>
					</ul>
				</TwitterShareButton>),
				counter: false,
			},
			{
				button: (<TelegramShareButton url={shareUrl} title={title} >
					<ul>
						<li><TelegramIcon size={iconSize} round={round} /></li>
						<li>Telegram</li>
					</ul>
				</TelegramShareButton>),
				counter: false,
			},
			{
				label: 'WhatsApp',
				button: (<WhatsappShareButton url={shareUrl} title={title} separator=":: " >
					<ul>
						<li><WhatsappIcon size={iconSize} round={round} /></li>
						<li>WhatsApp</li>
					</ul>
				</WhatsappShareButton>),
				counter: false,
			},
			{
				button: (<ViberShareButton url={shareUrl} title={title} body="body">
					<ul>
						<li><ViberIcon size={iconSize} round={round} /></li>
						<li>Viber</li>
					</ul>
				</ViberShareButton>),
				counter: false,
			},
			{
				button: (<GooglePlusShareButton url={shareUrl} >
					<ul>
						<li><GooglePlusIcon size={iconSize} round={round} /></li>
						<li>Google Plus</li>
					</ul>
				</GooglePlusShareButton>),
				counter: (<GooglePlusShareCount url={shareUrl}>{count => count}</GooglePlusShareCount>),
			},
			{
				label: 'LinkedIn',
				button: (<LinkedinShareButton url={shareUrl} title={title} windowWidth={750} windowHeight={600}>
					<ul>
						<li><LinkedinIcon size={iconSize} round={round} /></li>
						<li>LinkedIn</li>
					</ul>
				</LinkedinShareButton>),
				counter: (<LinkedinShareCount url={shareUrl}>{count => count}</LinkedinShareCount>),
			},
			{
				button: (<PinterestShareButton url={shareUrl} media={previewUrl} windowWidth={1000} windowHeight={730}>
					<ul>
						<li><PinterestIcon size={iconSize} round={round} /></li>
						<li>Pinterest</li>
					</ul>
				</PinterestShareButton>),
				counter: (<PinterestShareCount url={shareUrl}>{count => count}</PinterestShareCount>),
			},
			{
				button: (<RedditShareButton url={shareUrl} title={title} windowWidth={660} windowHeight={460}>
					<ul>
						<li><RedditIcon size={iconSize} round={round} /></li>
						<li>Reddit</li>
					</ul>
				</RedditShareButton>),
				counter: (<RedditShareCount url={shareUrl}>{count => count}</RedditShareCount>),
			},
			{
				button: (<TumblrShareButton url={shareUrl} title={title} windowWidth={660} windowHeight={460}>
					<ul>
						<li><TumblrIcon size={iconSize} round={round} /></li>
						<li>Tumblr</li>
					</ul>
				</TumblrShareButton>),
				counter: (<TumblrShareCount url={shareUrl}>{count => count}</TumblrShareCount>),
			},
			{
				button: (<WorkplaceShareButton url={shareUrl} quote={title}>
					<ul>
						<li><WorkplaceIcon size={iconSize} round={round} /></li>
						<li>WorkPlace</li>
					</ul>
				</WorkplaceShareButton>),
				counter: false,
			},
			{
				button: (<VKShareButton url={shareUrl} image={previewUrl} windowWidth={660} windowHeight={460} >
					<ul>
						<li><VKIcon size={iconSize} round={round} /></li>
						<li>VK.com</li>
					</ul>
				</VKShareButton>),
				counter: (<VKShareCount url={shareUrl}>{count => count}</VKShareCount>),
			},
			{
				button: (<OKShareButton url={shareUrl} image={previewUrl} windowWidth={660} windowHeight={460} >
					<ul>
						<li><OKIcon size={iconSize} round={round} /></li>
						<li>Odnoklassniki</li>
					</ul>
				</OKShareButton>),
				counter: (<OKShareCount url={shareUrl}>{count => count}</OKShareCount>),
			},
			{
				button: (<MailruShareButton url={shareUrl} title={title}>
					<ul>
						<li><MailruIcon size={iconSize} round={round} /></li>
						<li>Mail.ru</li>
					</ul>
				</MailruShareButton>),
				counter: false,
			},
			{
				button: (<LivejournalShareButton url={shareUrl} title={title} description={shareUrl}>
					<ul>
						<li><LivejournalIcon size={iconSize} round={round} /></li>
						<li>LiveJournal</li>
					</ul>
				</LivejournalShareButton>),
				counter: false,
			},
		];

		return (
			<div className={classes.shareWrapper}>

				<List component="nav">
					{icons_arr.map((item, index) => {
						return (
							<ListItem button key={index} data-list-item>
								<ListItemText primary={item.button} />
							</ListItem>
						)
					})}
				</List>

			</div>
    );
	}
}


@withStyles(styles)
@translate('common')
class Sharing extends Component {

	state = {
    open: false,
  };

  toggleDrawer = (open) => () => {
    this.setState({
      open: open,
    });
  };

	render() {

		const {t, classes, width} = this.props

		return (
			<div className={classes.wrapper}>

				<div onClick={this.toggleDrawer(true)}>
					{this.props.children}
				</div>

        <Drawer anchor={width == 'xs' ? 'bottom' : 'right'} open={this.state.open} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onKeyDown={this.toggleDrawer(false)}
          >
            <div className={classes.drawerWrapper}>

							<Typography variant="title" data-el="title">
								{t('sharing__title')}
							</Typography>

							<div data-drawer={width == 'xs' ? 'bottom' : 'right'}>
								<SharingList {...this.props} />
							</div>

						</div>
          </div>
        </Drawer>

			</div>
		)
	}
}

Sharing.propTypes = {
	width: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	shareUrl: PropTypes.string.isRequired,
	previewUrl: PropTypes.string.isRequired,
};

export default withWidth()(Sharing);
