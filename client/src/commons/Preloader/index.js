import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './styles';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
	isLoading: state.commonsReducer.isLoading,
});

export const Preloader = connect(mapStateToProps)(({ isLoading }) => {
	const classes = useStyles();

	return (
		<Backdrop className={classes.backdrop} open={isLoading}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
});
