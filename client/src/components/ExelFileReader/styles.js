import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => {
	return {
		paper: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},

		form: {
			width: '100%', // Fix IE 11 issue.
		},
		submit: {
			margin: theme.spacing(2, 0, 1),
		},
	};
});
