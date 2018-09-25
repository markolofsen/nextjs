import {__} from '../../../style/vars'

export const styles = theme => ({

	pageHeader: {
		[theme.breakpoints.up('sm')]: {
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'space-between',
			alignItems: 'center',
			'& > li:first-child': {
				marginRight: 30,
			}
		}
	},
	messageWrapper: {
		marginBottom: 30,
	}


})
