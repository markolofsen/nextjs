import {__} from '../../style/vars'

export const styles = theme => ({

	contentFormat: {

		'& [data-element="showmore"]': {
			wordBreak: 'break-word',
		},

		'& [data-collapase]': {
			// position: 'relative',
			// '&:after': {
			// 	position: 'absolute',
			// 	bottom: 0,
			// 	height: '100%',
			// 	width: '100%',
			// 	content: "",
			// 	background: 'linear-gradient(to top, rgba(255,255,255, 1) 20%, rgba(255,255,255, 0) 80%)',
			// 	pointerEvents: 'none', /* so the text is still selectable */
			// }
		},
		// '& ul': {
		// 	listStyle: 'none none',
		// 	padding: 0,
		// 	margin: '15px 0',
		// },
		// '& li': {
		// 	padding: '0 0 15px',
		// 	display: 'flex',
		// },
		// '& li:last-child': {
		// 	paddingBottom: 0
		// },
		// '& li:before': {
		// 	content: "★ ",
		// 	fontSize: 12,
		// 	minWidth: 30,
		// 	maxWidth: 30,
		// 	color: __.colorPrimary,
		// },

		'& [data-el="more"]': {
			marginTop: 25,
			[theme.breakpoints.up('sm')]: {
				textAlign: 'center',
			},
			'& > span': {
				padding: '5px 20px',
				border: `solid 2px ${__.colorPrimary}`,
				borderRadius: 50,
				cursor: 'pointer',
				transition: __.transition2,
				background: '#fff',
				color: __.colorPrimary,
				fontWeight: __.fontWeightSemiBold,
				textAlign: 'center',
				display: 'block',
				[theme.breakpoints.up('sm')]: {
					display: 'inline-block',
				}
			},
			'& > span:hover': {
				background: __.colorPrimary,
				color: '#fff',
			}
		}
	}
})
