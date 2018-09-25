import {__, mixins} from '../../style/vars'

export const styles = theme => ({

	...mixins.breath.keyframes,
	wrapper: {
		backgroundColor: __.colorPrimary,
		color: '#fff',
		[theme.breakpoints.down('md')]: {
			padding: 20,
			backgroundImage: 'none !important',
			marginBottom: 0
		},
		[theme.breakpoints.up('md')]: {
			...mixins.breath.styles,

			height: 400,
			// marginBottom: -100,
			// paddingBottom: 100,

			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			paddingBottom: 50
		},
		'& > ul': {
			cursor: 'default',
			'& > li': {
				textAlign: 'center'
			},
			'& [data-title]': {
				'& > h1': {
					[theme.breakpoints.down('sm')]: {
						fontSize: 30,
						fontWeight: __.fontWeightSemiBold
					}
				},
			},
			'& [data-description]': {
				// display: 'flex',
				// justifyContent: 'center',
				'& span': {
					maxWidth: 500,
					fontWeight: __.fontWeightThin,
					fontSize: __.fontSizeNormal
					// [theme.breakpoints.down('md')]: {
					// 	fontSize: __.fontSizeTiny,
					// },
					// [theme.breakpoints.up('sm')]: {
					// 	fontSize: __.fontSizeBig,
					// },
				}
			},
			'& [data-description="big"]': {
				fontSize: 25,
			}
		}
	},
	contentWrapper: {
		[theme.breakpoints.up('md')]: {
			marginTop: -100,
			marginBottom: 30
		}
	}
})
