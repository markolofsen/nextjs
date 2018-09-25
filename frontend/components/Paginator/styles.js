import {__} from '../../style/vars'

export const styles = theme => ({

	pagination: {
		width: '100%',
		boxSizing: 'border-box',
		// position: 'fixed',
		display: 'flex',
		flexWrap: 'wrap',
		// flexDirection: 'column',
		justifyContent: 'center',
		// bottom: 0,
		// left: 0,
		// [theme.breakpoints.down('sm')]: {
		// 	display: 'none',
		// },

		'& > ul': {
			display: 'inline-flex',
			flexWrap: 'wrap',
			justifyContent: 'center',
			// boxShadow: __.zdepthShadow2,

			'& > li': {

				border: `solid 1px ${__.colorDivider}`,
				backgroundColor: '#fff',
				marginRight: -1,
				marginBottom: -1,
				'& > a': {
					display: 'inline-block',
					padding: '10px 15px'
				}
			},
			'& > li:first-child': {
				borderTopLeftRadius: 2,
				borderBottomLeftRadius: 2
			},
			'& > li:last-child': {
				borderTopRightRadius: 2,
				borderBottomRightRadius: 2
			},
			'& > li[data-selected="true"]': {
				fontWeight: __.fontWeightBold,
				backgroundColor: __.colorPrimary,
				borderColor: __.colorPrimary,
				'& > a': {
					color: '#fff'
				}
			}
		}
	}
})
