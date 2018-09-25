// https://material-ui.com/customization/themes/#palette
// 	// type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// 	// [theme.breakpoints.between('sm', 'md')]: {
// 	// [theme.breakpoints.only('md')]: {
// const { palette, shadows, transitions, breakpoints } = theme;
const _ = require('lodash')

import {isProduction, apiDomain} from '../data/config';

const __unit = '10px';
const __fontSize = `calc(1.6 * ${__unit})`;
const __fontFamily = 'Roboto, Helvetica, Arial, sans-serif';
const __borderRadius = 2
const __shadow2p = '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)'
const message = {
	padding: 15,
	borderLeft: 'solid 10px',
	borderRadius: 5,
	backgroundColor: '#fff',
	boxShadow: __shadow2p,
}
const __colorAccent = 'rgb(255, 64, 129)'
const __colorBg = 'rgb(250, 250, 250)'

const __colorPrimary = 'rgb(33, 150, 243)'
const __colorWarning = 'rgb(253, 216, 53)'
const __colorSuccess = 'rgb(67, 160, 71)'
const __colorDanger = __colorAccent
const __colorDivider = 'rgb(224, 224, 224)'

const __transition2 = 'all .2s ease-in-out !important'
const __transition5 = 'all .5s ease-in-out !important'

const __hr = {
	border: 0,
	height: 0,
	borderTop: '1px solid rgba(0, 0, 0, 0.1)',
	borderBottom: `1px solid rgba(255, 255, 255, 0.3)`,
	margin: '15px 0',
	padding: 0,
}

const bgUrl = isProduction ? '' : apiDomain
export function materialBg(url) { return `url('${bgUrl}/media/material-bgs/jpg/${url}.jpg')`}



function keyframesAnimator(style, arr) {
	let new_arr = {}
	arr.map(item => {
		let new_style = {}
		_.keys(style).map(key => {
			new_style[key] = style[key].replace('{value}', item[1])
		})
		new_arr[`${item[0]}%`] = new_style
	})
	return new_arr
}

export const mixins = {
	breath: {
		keyframes: {
			'@keyframes breath': keyframesAnimator({backgroundSize: `{value}% auto`}, [ [0, 100], [50, 130], [100, 100], ])
		},
		styles: {
			animation: 'breath 30s ease-out infinite',
			backgroundAttachment: 'fixed',
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'top center',
		}
	},
	breathIcon: {
		keyframes: {
			'@keyframes breathIcon': keyframesAnimator({transform: `scale({value})`}, [ [0, 1], [20, 1.1], [30, .8], [35, .9], [40, .8], ])
		},
		styles: {
			animation: 'breathIcon 4s ease-out infinite',
		}
	},
}



export const __ = {

	// headerHeight: () => { try { return document.getElementById('mainHeader').clientHeight } catch(err) { return 0 } },

	borderRadius: __borderRadius,
	fontSizeBig: 16,
	fontSizeSmall: 12,
	colorBg: __colorBg,
	colorPrimary: __colorPrimary,
	// colorPrimaryDark: 'rgb(0, 92, 158)',
	colorAccent: __colorAccent,
	colorTextMuted: 'rgb(97, 97, 97)',
	colorDivider: __colorDivider,

	colorDanger: __colorDanger,
	colorSuccess: __colorSuccess,
  colorWarning: __colorWarning,
  colorDark: 'rgb(33, 33, 33)',

	fontSizeTiny: `calc(1.2 * ${__unit})`,
	fontSizeSmall: `calc(1.4 * ${__unit})`,
	fontSizeNormal: __fontSize,
	fontSizeBig: `calc(1.8 * ${__unit})`,
	fontWeightThin: 300,
	fontWeightNormal: 400,
	fontWeightSemiBold: 500,
	fontWeightBold: 700,

	transition2: __transition2,
	transition5: __transition5,


	shadow2p: __shadow2p,
	shadow3p: '0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 1px 8px 0 rgba(0, 0, 0, 0.12)',
	shadow4p: '0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
	shadow6p: '0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.2)',
	shadow8p: '0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)',
	shadow16p: '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
	zdepthShadow1: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)',
  zdepthShadow2: '0 3px 10px rgba(0, 0, 0, 0.16), 0 3px 10px rgba(0, 0, 0, 0.23)',
  zdepthShadow3: '0 10px 30px rgba(0, 0, 0, 0.19), 0 6px 10px rgba(0, 0, 0, 0.23)',
  zdepthShadow4: '0 14px 45px rgba(0, 0, 0, 0.25), 0 10px 18px rgba(0, 0, 0, 0.22)',
  zdepthShadow5: '0 19px 60px rgba(0, 0, 0, 0.3), 0 15px 20px rgba(0, 0, 0, 0.22)',


	fontFamily: __fontFamily,
	listUnstyled: {
		fontFamily: __fontFamily,
		listStyle: 'none none',
		margin: 0,
		padding: 0
	},
	textOverflow: {
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	isEmptyBlock: {
		margin: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,.05)',
		borderRadius: __borderRadius,
		padding: '50px 30px',
		'& > div': {
			textAlign: 'center',
		},
	},

	messageSuccess: {
		...message,
		borderColor: __colorSuccess,
	},
	messageInfo: {
		...message,
		borderColor: __colorPrimary,
	},
	messageWarning: {
		...message,
		borderColor: __colorWarning,
	},
	messageDanger: {
		...message,
		borderColor: __colorDanger,
	},


	dataLink: {
		color: __colorPrimary,
		transition: __transition2,
		cursor: 'pointer',
		textDecoration: 'none',
		'&:hover': {
			opacity: .7
		},
	},
	code: {
		background: __colorBg,
		fontSize: __fontSize,
		color: __colorAccent,
		display: 'inline-block',
		padding: '1px 5px',
		borderRadius: __borderRadius,
		fontWeight: 500,
	},
	hr: __hr

}


export function prettyText(theme) {

	function headersSize(size) {
		return {
			fontWeight: __.fontWeightSemiBold,
			margin: 0,
			padding: 0,
			[theme.breakpoints.down('sm')]: {
				fontSize: size - 5,
			},
			[theme.breakpoints.up('sm')]: {
				fontSize: size,
			},
		}
	}


	return {
		textRendering: 'optimizeLegibility',
		// textAlign: 'justify',
		[theme.breakpoints.down('sm')]: {
			fontSize: 18,
			fontWeight: 300,
			lineHeight: '110%',
		},
		[theme.breakpoints.up('sm')]: {
			fontSize: 22,
			fontWeight: 300,
			lineHeight: '140%',
		},
		'& img': {
			borderRadius: 3,
			[theme.breakpoints.down('sm')]: {
				width: '100% !important',
				height: 'auto !important',
			},
		},
		'& hr': __hr,
		'& a': {
			color: __colorPrimary,
			transition: __transition2,
			textDecoration: 'none',
			'&:hover': {
				backgroundColor: __colorPrimary,
				color: '#fff',
				opacity: .7,
			},
		},
		'& ul': {
			listStyle: 'square outside',
			marginLeft: 40,
		},
		'& blockquote': {
			border: `solid 1px ${__colorDivider}`,
			borderLeft: 0,
			borderRight: 0,
			margin: '30px 0',
			padding: '15px 0 15px 60px',
			lineHeight: '140%',
			[theme.breakpoints.down('sm')]: {
				fontWeight: __.fontWeightThin,
				fontSize: 22,
			},
			[theme.breakpoints.up('sm')]: {
				fontWeight: __.fontWeightThin,
				fontSize: 30,
			}
		},
		'& h1': headersSize(40),
		'& h2': headersSize(30),
		'& h3': headersSize(25),
		'& h4': headersSize(20),
		'& fieldset': {
			border: `solid 2px ${__.colorPrimary}`,
			padding: 30,
			borderRadius: 5,
			margin: 0,
			marginBottom: 20,
			'& > legend': {
				border: `solid 2px ${__.colorPrimary}`,
				minWidth: 50,
				textAlign: 'center',
				boxShadow: __.shadow2p,
				backgroundColor: '#fff',
				fontSize: 30,
				fontWeight: __.fontWeightNormal,
				color: __.colorPrimary,
				minWidth: 47,
				padding: 4,
				borderRadius: 50,
				pointerEvents: 'none',
			}
		}

	} //end
}

export const tabStyles = {
	tabWrapper: {
		overflow: 'inherit',
		boxShadow: __.shadow2p,
		borderRadius: __.borderRadius,
		minHeight: 51,
		'& > * > * > *': {
			marginRight: -1,
		},
		'& > * > * > * > *': {
			marginRight: 1,
			'&:first-child': {
				borderRadius: __.borderRadius,
				borderTopRightRadius: 0,
				borderBottomRightRadius: 0,
			},
			'&:last-child': {
				borderRadius: __.borderRadius,
				borderTopLeftRadius: 0,
				borderBottomLeftRadius: 0,
			}
		}
	},
	tabRoot: {
		padding: '12px 5px',
		minWidth: 'inherit',
		maxWidth: 'inherit',
		// marginRight: 1,
    flex: '1 1 auto',
		height: 51,
		// backgroundColor: __.colorBg,
		backgroundColor: '#fff',
		transition: __.transition2,
		// border: `solid 1px ${__.colorDivider}`,
	},
	tabLabel: {
		...__.textOverflow,
	},
	tabSelected: {
		backgroundColor: '#d1ebfe',
		// boxShadow: `inset ${__.shadow2p}`,
	},
}
