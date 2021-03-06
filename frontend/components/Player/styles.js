import {__} from '../../style/vars'


const reactPlayer_ = {
	// background: 'rgba(0,0,0, 1)',
	// minHeight: 'calc(100vh / 2)',
	// marginBottom: -4,
}

export const styles = theme => ({

	buttonApproved: {
		width: '100%',
		display: 'block',
	},
	reactPlayer: {
		display: 'flex',
		...reactPlayer_,
		'& iframe': reactPlayer_
	},
	playerControls: {
		'& .playerControlsButtons': {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			flexWrap: 'nowrap',
			'& .playerControlsNoMobile': {
				[theme.breakpoints.down('sm')]: {
					display: 'none'
				}
			},

			'& [data-el="player-volume"]': {
				flex: '1 1 150px',
				minWidth: 150,
				maxWidth: 150
			},

			'& .playerControlsDuration': {
				padding: '0 15px',
				color: __.colorTextMuted
			}
		}
	}
})
