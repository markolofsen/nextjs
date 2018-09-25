import {__} from '../../style/vars'


const columnWidth = theme => ({
	[theme.breakpoints.up('md')]: {
		minWidth: '25%',
		maxWidth: '25%',
	}
})


export const styles = theme => ({

	isEmptyBlock: {
		...__.isEmptyBlock,
	},
	tableWrapper: {
		marginBottom: 30,
		'& > ul': {
			borderBottom: `solid 1px ${__.colorDivider}`,
			[theme.breakpoints.up('md')]: {
				display: 'flex',
				alignItems: 'space-between',
			},
			'& > li': {
				flex: '1 1 auto',
				padding: '10px',

				// Label for mobiles
				[theme.breakpoints.down('sm')]: {
					display: 'flex',
					flexWrap: 'nowrap',
					justifyContent: 'space-between',
					'& > label': {
						fontWeight: __.fontWeightSemiBold,
						maxWidth: 120,
						minWidth: 120,
						paddingRight: 10,
						...__.textOverflow,
					},
					'& > span': {
						minWidth: 'calc(100% - 100px)',
					}
				},
				[theme.breakpoints.up('md')]: {
					'& > label': {
						display: 'none',
					}
				},

			},

			// AFFILIATE
			'& > [data-li="confirmed"]': {
				...columnWidth(theme),
			},

			// BALANCE
			'& > [data-li="id"]': {
				...columnWidth(theme),
			},
			'& > [data-li="description"]': {
				...columnWidth(theme),
			},
			'& > [data-li="date"]': {
				...columnWidth(theme),
				'& [data-el="date-ago"]': {
					color: __.colorTextMuted,
					fontSize: __.fontSizeSmall,
				},
			},

		},
		'& > ul:last-child': {
			borderBottom: 0,
		},
		'& [data-list="header"]': {
			fontWeight: __.fontWeightSemiBold,
			color: __.colorTextMuted,
			fontSize: __.fontSizeSmall,
			[theme.breakpoints.down('sm')]: {
				display: 'none',
			}
		}
	},

})
