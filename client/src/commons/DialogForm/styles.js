import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => {
	return {
		root: {
			padding: theme.spacing(1, 1, 0),
			width: 320,
		},
		title: {
			padding: theme.spacing(0, 0, 0),
		},
		body: {
			padding: theme.spacing(0, 0, 0),
		},
	};
});
