import {__} from '../../style/vars'

export const styles = theme => ({

	textWrapper: {
		backgroundColor: __.colorBg,
		borderRadius: __.borderRadius,
		display: 'inline-flex',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-between',
		boxShadow: `inset 2px 2px 4px 1px rgba(0,0,0,.05), inset 1px 1px 1px 1px rgba(0,0,0,.1)`,
		padding: 0,
		margin: '10px 0',
		[theme.breakpoints.down('xs')]: {
			width: '100%',
		}
	},
	valueList: {
		padding: '0 15px',
		'& > li:nth-child(1)': {
			fontSize: __.fontSizeTiny,
			color: __.colorPrimary,
			pointerEvents: 'none',
		},
		'& > li:nth-child(2)': {
			...__.textOverflow,
			fontSize: __.fontSizeBig,
		},
	},
	button: {
		margin: 3,
	}
})
