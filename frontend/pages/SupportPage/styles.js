import {__} from '../../style/vars'

export const styles = theme => ({

	successWrapper: {
		textAlign: 'center',
		'& [data-li="icon"]': {
			marginBottom: 20,
			'& > span': {
				fontSize: 100,
				color: __.colorSuccess,
			}
		}
	}

})
