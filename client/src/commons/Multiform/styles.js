import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => {
	return {
		title: {
			margin: theme.spacing(0, 0, 3),
		},
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
		formControl: {
			// margin: theme.spacing(1),
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
	};
});
