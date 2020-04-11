import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		// border: '2px solid #000',
		borderRadius: 20,
		boxShadow: theme.shadows[10],
		outline: 'none',
		padding: theme.spacing(2, 4, 3),
	},
}));
