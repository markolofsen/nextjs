import {__} from '../../../style/vars'

export const styles = theme => ({

	wrapper: {
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
		'& > li': {
			flex: '1 1 auto',
			'&:last-child': {
				[theme.breakpoints.down('md')]: {
					marginTop: 20,
				},
				[theme.breakpoints.up('md')]: {
					marginLeft: 30,
					minWidth: 300,
					maxWidth: 300,
				},
			},
		},
		'& [data-divider]': {
			margin: '20px 0',
		}
	},

	widgetWrapper: {
		padding: 30,

	},

	formWrapper: {
		'& [data-list]': {
			[theme.breakpoints.only('sm')]: {
				display: 'flex',
				justifyContent: 'space-between',
				'& > li': {
					flex: '1 1 50%',
					marginRight: 20,
					'&:last-child': {
						marginRight: 0,
					}
				},
				'& [data-li="switcher"]': {
					paddingTop: 25,
				}
			},
			[theme.breakpoints.only('lg')]: {
				display: 'flex',
				justifyContent: 'space-between',
				'& > li': {
					flex: '1 1 50%',
					marginRight: 20,
					'&:last-child': {
						marginRight: 0,
					}
				},
				'& [data-li="switcher"]': {
					paddingTop: 25,
				}
			},
		},
	},


	// Switch radio
	colorSwitchBase: {
    color: __.colorPrimary,
    '&$colorChecked': {
      color: __.colorPrimary,
      '& + $colorBar': {
        backgroundColor: __.colorPrimary,
      },
    },
  },
  colorBar: {
		backgroundColor: __.colorPrimary,
	},
  colorChecked: {},

})
