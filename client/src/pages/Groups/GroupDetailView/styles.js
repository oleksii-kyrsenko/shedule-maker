import { makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	root: {
        backgroundColor: theme.palette.background.paper,
	},
	title: {
        padding: theme.spacing(2),
	},
	header: {
        boxShadow: theme.shadows[0],
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
	},
	
}));
