import {__} from '../../../../style/vars'

export const styles = theme => ({

	dialogWrapper: {

	},
	tableList: {
		'& > ul': {
			display: 'flex',
			borderBottom: `solid 1px ${__.colorDivider}`,
			padding: '10px 5px',

			'& > li': {
				flex: '1 1 33%',
				'&:nth-child(1)': {
				},
				'&:nth-child(2)': {
				},
				'&:nth-child(3)': {
					color: __.colorTextMuted,
				},
			},
			'&:nth-child(even)': {
				backgroundColor: __.colorBg,
			},
			'&:last-child': {
				border: 0,
			},
		}
	}

})
