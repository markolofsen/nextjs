import {__} from '../../style/vars'

export const styles = theme => ({

	contentWrapper: {
		display: 'flex',
		[theme.breakpoints.down('sm')]: {
			// padding: 20,
			// paddingTop: 10,
			flexDirection: 'column',
			'& > div': {
				'&:nth-child(1)': {
					order: 1,
				},
				'&:nth-child(2)': {
					order: 2,
					// marginTop: 15,
					padding: 20,
				},
			},
		},
		[theme.breakpoints.up('md')]: {
			padding: 30,
			paddingTop: 10,
			'& > div': {
				flex: '1 1 auto',
				'&:nth-child(1)': {
					paddingRight: 30,
				},
				'&:nth-child(2)': {
					minWidth: 300,
					maxWidth: 300,
				}
			}
		},
	},


	// DETAILS PAGE
	breadcrumbs: {
		position: 'relative',
		background: 'rgba(255,255,255, .9)',
	},
	backgroundWrapper: {
		[theme.breakpoints.up('md')]: {
			marginTop: -39,
			marginBottom: -80,
		},
		'& img': {
			width: '100%',
		},
	},
	detailsWrapper: {
		backgroundColor: '#fff',
		[theme.breakpoints.down('sm')]: {
			padding: 30,
		},
		[theme.breakpoints.up('md')]: {
			padding: 30,
			boxShadow: __.shadow2p,
			borderRadius: __.borderRadius,
		},
	},
	relatedWrapper: {
		borderTop: `solid 1px ${__.colorDivider}`,
		marginTop: 30,
		paddingTop: 30,
		// [theme.breakpoints.down('sm')]: {
		// 	padding: 20,
		// },
		'& > ul': {
			'& > li': {
				paddingBottom: 20,
				'&:last-child': {
					paddingBottom: 0,
				}
			}
		}
	}

})
