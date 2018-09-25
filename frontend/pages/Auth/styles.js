import {__, mixins, materialBg} from '../../style/vars'

export const styles = theme => ({


	formError: {
		color: __.colorDanger,
		textAlign: 'center',
		padding: '0 0 30px 0',
	},
	formSuccess: {
		color: __.colorSuccess,
		textAlign: 'center',
		padding: '0 0 30px 0',
	},

	footerLinks: {
		marginTop: 30,
		'& > li': {
			margin: '3px 0',
		}
	}


})
