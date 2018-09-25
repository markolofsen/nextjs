import {__} from '../../../../style/vars'

export const styles = theme => ({

	badge: {
		top: -1,
    right: -15,
		left: 11,
		width: 'auto',
		minWidth: 22,
		borderRadius: 50,
    // The border color match the background color.
    // border: `2px solid ${
    //   theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    // }`,
    border: 0,
	},

	orderWrapper: {
		display: 'flex',
		margin: '15px 0',
		padding: 15,

		[theme.breakpoints.down('md')]: {
			flexWrap: 'wrap',
		},
		[theme.breakpoints.up('md')]: {
			alignItems: 'center',
		},

		// STATUSES
		'&[data-status="completed"], &[data-status="canceled"]': {
			opacity: .5
		},

		'& > li': {
			flex: '1 1 auto',
			fontSize: __.fontSizeSmall,
			[theme.breakpoints.down('xs')]: {
				flex: '1 1 100%',
			}
		},
		'& [data-li="details"]': {
			[theme.breakpoints.up('md')]: {
				maxWidth: '25%',
				minWidth: '25%',
			}
		},
		'& [data-li="button"]': {
			'& > ul': {
				display: 'flex',
				alignItems: 'center',
				'& > li': {
					flex: '1 1 auto',
					marginRight: 5,
					'&:last-child': {
						marginRight: 0,
					}
				},
				'& [data-li="chat"]': {
					minWidth: 70,
					maxWidth: 70,
					'& > button': {
						paddingTop: 5,
						paddingBottom: 5,
					}
				},
			}
			// '& [data-el="fastmenu"]': {
			// 	maxWidth: 30,
			// 	minWidth: 30,
			// }
		},
		'& [data-li="menu"]': {
			minWidth: 50,
			maxWidth: 50,
		}
	},
	orderData: {
		'& > li': {
			display: 'flex',
			[theme.breakpoints.down('md')]: {
				flexWrap: 'nowrap',
				padding: '7px 0',
			},
			[theme.breakpoints.up('md')]: {
				flexWrap: 'wrap',
				padding: '3px 0',

				borderRight: `solid 1px ${__.colorDivider}`,
				marginRight: 20,
			},
			'& > label': {
				...__.textOverflow,
				minWidth: 100,
				maxWidth: 100,
				fontWeight: __.fontWeightSemiBold,
				color: __.colorTextMuted,
				marginRight: 20,
			},
			'& > span': {
				// ...__.textOverflow,
				maxWidth: 'calc(100% - 160px)',
			},
		},
		'& [data-li="orderNumber"]': {
			'& [data-el="orderDate"]': {
				marginLeft: 10,
				color: __.colorTextMuted,
			},
		},
		'& [data-li="status"]': {
			'& > span': {
				display: 'flex',
				alignItems: 'center',
				'& [data-el="preloader"]': {
					marginRight: 10,
				}
			},
		},
	},


})
