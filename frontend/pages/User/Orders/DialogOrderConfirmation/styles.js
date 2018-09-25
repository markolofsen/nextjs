import {__} from '../../../../style/vars'

export const styles = theme => ({

	dialogWrapper: {
		'& code': {
			...__.code,
		},
		'& [data-link]': {
			...__.dataLink,
		}
	}

})
