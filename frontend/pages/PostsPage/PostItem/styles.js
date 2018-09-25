import {__} from '../../../style/vars'

export const styles = theme => ({


	postItem: {

		backgroundColor: '#fff',

		[theme.breakpoints.down('sm')]: {
			borderBottom: `solid 1px ${__.colorDivider}`,
		},
		[theme.breakpoints.up('md')]: {
			boxShadow: __.shadow2p,
			borderRadius: __.borderRadius,
			marginBottom: 15,
		},
		'& > li': {
			padding: '0 30px',
		},
		'& [data-li="header"]': {
			paddingTop: 20,
			'& > ul': {
				display: 'flex',
				alignItems: 'center',
				'& > li': {
					fontSize: __.fontSizeSmall,
					marginRight: 30,
					'&:nth-child(1)': {
						fontWeight: __.fontWeightBold,
					},
					'&[data-li="date"]': {
						color: __.colorTextMuted,
					}
				},

			},
		},
		'& [data-li="content"]': {
			paddingTop: 15,
			paddingBottom: 20,
		},
		'& [data-li="preview"]': {
			height: 200,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			cursor: 'pointer',
			transition: __.transition2,
			'&:hover': {
				opacity: .7,
			}
		},
		'& [data-li="footer"]': {
			padding: '15px 30px',
			'& > ul': {
				display: 'flex',
				alignItems: 'center',
				color: __.colorTextMuted,
				cursor: 'pointer',
				'& > li': {
					'&:nth-child(1)': {
						marginRight: 15,
					},
				},
			},
		},
		// padding: 20,
		// '& [data-li="preview"] img': {
		// 	borderRadius: __.borderRadius,
		// },
		// [theme.breakpoints.down('sm')]: {
		// 	display: 'flex',
		// 	flexDirection: 'column',
		// 	'& [data-li="preview"]': {
		// 		order: 1,
		// 		marginBottom: 10,
		// 		'& img': {
		// 			width: '100%',
		// 			maxWidth: 500,
		// 		}
		// 	},
		// 	'& [data-li="content"]': {
		// 		order: 2,
		// 		fontSize: __.fontSizeSmall,
		// 	},
		// },
		// [theme.breakpoints.up('md')]: {
		// 	display: 'flex',
		// 	justifyContent: 'space-between',
		// 	'& [data-li="preview"]': {
		// 		marginLeft: 30,
		// 		'& img': {
		// 			width: 150,
		// 		}
		// 	},
		// }
	}

})
