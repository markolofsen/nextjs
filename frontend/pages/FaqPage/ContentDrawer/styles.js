import {__, prettyText} from '../../../style/vars'

export const styles = theme => ({


	wrapper: {
		width: '80vw',
		[theme.breakpoints.down('md')]: {
			padding: 30,
		},
		[theme.breakpoints.up('md')]: {
			padding: 50,
		},
		'& [data-content]': {
			marginTop: 20,
			paddingTop: 10,
			borderTop: `solid 1px ${__.colorDivider}`,
			...prettyText(theme),
			// [theme.breakpoints.up('md')]: {
			// 	lineHeight: '170%',
			// 	fontSize: __.fontSizeBig,
			// }
		}
	}

})
