import {__} from '../../../../style/vars'

export const styles = theme => ({

	dialogWrapper: {
		'& code': {
			...__.code,
		},
		'& [data-link]': {
			...__.dataLink,
		},
	},
	ratingWrapper: {
		borderTop: `solid 1px ${__.colorDivider}`,
		padding: '20px 0 20px 0',
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		'& > li': {
			'&:first-child': {
				fontWeight: __.fontWeightBold,
				marginRight: 10,
			}
		},
		'& [data-icon]': {

		},
		'& [data-icon="true"]': {
			color: __.colorAccent,
		},
		'& [data-icon="false"]': {
			color: __.colorDivider,
		},
	}

})
