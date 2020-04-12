import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		borderRadius: 5,
		boxShadow: theme.shadows[10],
		outline: 'none',
		padding: theme.spacing(3, 1),
		position: 'relative',
	},
	close: {
		position: 'absolute',
		top: 5,
		right: 5,
		cursor: 'pointer',
		fontSize: 28,
	},
}));
