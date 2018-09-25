import {__} from '../../style/vars'

export const styles = theme => ({


	groupWrapper: {
		padding: 30,
		// marginBottom: 30,
		'& > ul': {
			'& > li': {
				padding: '15px 0',
				borderBottom: `solid 1px ${__.colorDivider}`,
				fontSize: __.fontSizeBig,
				cursor: 'pointer',
				transition: __.transition2,
				'&:hover': {
					color: __.colorPrimary,
				},
				'&:last-child': {
					border: 0,
				},
			}
		}
	}

})
