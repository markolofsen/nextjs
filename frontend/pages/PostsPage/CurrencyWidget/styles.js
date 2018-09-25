import {__} from '../../../style/vars'

export const styles = theme => ({


	stickyDiv: {
		boxShadow: __.shadow2p,
		borderRadius: __.borderRadius,
		backgroundColor: '#fff',
		padding: 30,
		paddingBottom: 20,
		// [theme.breakpoints.down('sm')]: {
		// 	display: 'flex',
		// 	flexWrap: 'wrap',
		// },
		'& h3': {
			fontWeight: __.fontWeightSemiBold,
			fontSize: __.fontSizeBig,
			color: __.colorTextMuted,
			margin: 0,
			marginBottom: 20,
			padding: 0,
		},
		'& > div > ul': {
			[theme.breakpoints.down('xs')]: {
				display: 'flex',
				justifyContent: 'space-between',
				'& > li': {
					padding: '5px 0',
				}
			},
			[theme.breakpoints.only('sm')]: {
				display: 'inline-flex',
				justifyContent: 'space-between',
				minWidth: '50%',
				maxWidth: '50%',
				paddingRight: 20,
				'& > li': {
					'&:nth-child(1)': {
						// fontWeight: __.fontWeightSemiBold,
					},
					'&:nth-child(2)': {
						fontWeight: __.fontWeightSemiBold,
					}
				},

			},
			[theme.breakpoints.up('md')]: {
				display: 'flex',
				justifyContent: 'space-between',
				borderBottom: `solid 1px ${__.colorDivider}`,
				padding: '20px 0',
				'&:last-child': {
					borderBottom: 0,
				},
			},

			'& > li': {
				'&:nth-child(2)': {
					fontWeight: __.fontWeightSemiBold,
				}
			},

		}
	},

})
