import {__, mixins} from '../../style/vars'


export const styles = theme => ({

	// FORM CONTAINER
	...mixins.breath.keyframes,
	formWrapper: {
		[theme.breakpoints.down('md')]: {
			backgroundImage: 'none !important',
		},
		[theme.breakpoints.up('md')]: {
			...mixins.breath.styles,
		},
		[theme.breakpoints.up('sm')]: {
			backgroundColor: __.colorPrimary,
			padding: '60px 20px',
			minHeight: 'calc(100vh - 40px)',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		'& [data-el="inner"]': {
			padding: 30,
			background: '#fff',
			[theme.breakpoints.up('sm')]: {
				boxShadow: '0px 0px 0px 4px rgba(0,0,0, .1)',
				borderRadius: __.borderRadius,
				width: 500,
			},
			'& [data-el="title"]': {
					marginBottom: 40,
					textAlign: 'center',
			},
		},

	},



	// FORM FIELD
	formControl: {
      width: '100%',
      marginBottom: 10,
  },
  textFieldRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  textFieldInput: {
    borderRadius: __.borderRadius,
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${__.colorDivider}`,
    fontSize: 18,
    padding: '15px 20px',
    // width: 'calc(100% - 24px)',
    width: '100%',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: 'rgba(33, 150, 243, .5)',
      boxShadow: '0 0 0 0.2rem rgba(33, 150, 243, .25)',
    },
  },
  textAFieldTextareaRoot: {
  },
  textAFieldTextarea: {
      boxSizing: 'border-box',
  },
  textFieldFormLabel: {
    fontSize: 18,
  },
  formHelper: {
      marginBottom: 10,
  },


	// PHONE
	textFieldPhone: {
		padding: '11px 20px 10px 20px',
		color: __.colorDark,
		marginTop: 24,
	},
	textFieldPhoneLabel: {
		fontSize: 14,
		display: 'block',
		marginTop: -22,
	},



	// SELECT
	formControlPadding: {
		width: '100%',
		marginBottom: 10,
		marginTop: 8,
	},
	fieldRoot: {
		padding: 0,
		'label + &': {
			marginTop: theme.spacing.unit * 3,
		},
		'& > svg': {
			margin: '0 15px 0 0',
		}
	},
	formControlLabel: {
		fontSize: 18,
		marginTop: -8,
	},
	fieldSelect: {
		boxSizing: 'inherit',
		borderRadius: 2,
		backgroundColor: theme.palette.common.white,
		border: '1px solid rgba(63, 81, 181, .2)',
		fontSize: 16,
		padding: '15px 35px 15px 20px',
		// width: 'calc(100% - 24px)',
		width: '100%',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		'&:focus': {
			borderColor: 'rgba(33, 150, 243, .5)',
      boxShadow: '0 0 0 0.2rem rgba(33, 150, 243, .25)',
			backgroundColor: theme.palette.common.white,
		}
	},
	menuItem: {
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		'& > ul': {
			display: 'flex',
			width: '100%',
			justifyContent: 'space-between',
			'& > li': {
				'&:nth-child(1)': {
					maxWidth: 200,
					whiteSpace: 'normal',
					...__.textOverflow,
				},
				'&:nth-child(2)': {
					marginLeft: 15,
					color: __.colorTextMuted,
				}
			}
		}
	},
	selectMenuItemIcon: {
		display: 'flex',
		justifyContent: 'center',
		width: 30,
	}
	// textFieldFormLabel: {
	//   fontSize: 18,
	// },
	// formHelper: {
	//     marginBottom: 10,
	// },
})
