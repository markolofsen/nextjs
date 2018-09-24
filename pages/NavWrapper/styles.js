




const drawerWidth = 240;

export const styles = theme => ({
	root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
	drawerDocked: {
		height: '100%',
	},
  drawerPaper: {
    width: drawerWidth,

    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },




	ToolbarRoot: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		color: '#fff',
		'& > div': {
			display: 'flex',
			alignItems: 'center',
		}
	},



})
