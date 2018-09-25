import {__} from '../../style/vars'


export const styles = theme => ({

	drawerWrapper: {
		'& > [data-drawer="right"]': {
			width: 300,
		},
		'& > [data-drawer="bottom"]': {
			maxHeight: 'calc(100vh - 180px)',
			overflowY: 'auto',
		},
		'& [data-el="title"]': {
			padding: '20px 20px',
		}
	},


	shareWrapper: {
		'& [data-list-item]': {
			padding: 0,
			'& > div': {
				padding: 0,
			},
			'& ul': {
				padding: '7px 20px',
				display: 'flex',
				alignItems: 'center',
				'& > li': {
					flex: '1 1 auto',
					'&:nth-child(1)': {
						minWidth: 55,
						maxWidth: 55,
						'& > div': {
							borderRadius: __.borderRadius,
							overflow: 'hidden',
						}
					}
				}
			},
		}

	},

})
