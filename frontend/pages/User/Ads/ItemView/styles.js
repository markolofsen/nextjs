import {__} from '../../../../style/vars'

export const styles = theme => ({


	itemWrapper: {
		padding: 20,
		marginBottom: 10,
		display: 'flex',
		'& > li': {
			flex: '1 1 auto',
		},
		'& [data-list="ads"]': {
			marginTop: 15,
			'& > li': {
				marginTop: 5,
				display: 'flex',
				'& > label': {
					fontWeight: __.fontWeightBold,
					...__.textOverflow,
					minWidth: 100,
					maxWidth: 100,
				},
			},
		},
		'& [data-li="details"]': {
			minWidth: '30%',
			maxWidth: '30%',
			'& > ul': {
				'& > li': {
					display: 'flex',
					fontSize: __.fontSizeSmall,
					color: __.colorTextMuted,
					marginBottom: 5,
					'& > label': {
						fontWeight: __.fontWeightBold,
						...__.textOverflow,
						minWidth: 100,
						maxWidth: 100,

					},
				},
			},
		},
		'& [data-li="menu"]': {
			minWidth: 50,
			maxWidth: 50,
		}
	},

})
