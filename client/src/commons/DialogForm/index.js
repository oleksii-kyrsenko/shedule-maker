import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useStyles } from './styles';
import { connect } from 'react-redux';
import { setDialogStatus } from '../routines';

const mapStateToProps = (state) => ({
	isDialogOpen: state.commonsReducer.isDialogOpen,
});

const actionCreators = {
	setDialogStatus,
};

export const DialogForm = connect(
	mapStateToProps,
	actionCreators
)(({ isDialogOpen, setDialogStatus, dialogData, action }) => {
	const classes = useStyles();
	const handleClose = () => {
		setDialogStatus(false);
	};

	return (
		<>
			<Dialog open={isDialogOpen} onClose={handleClose}>
				<div className={classes.root}>
					<DialogTitle className={classes.title}>{dialogData.title}</DialogTitle>

					<DialogActions>
						<Button autoFocus onClick={handleClose} color="primary">
							Ні
						</Button>
						<Button
							onClick={() => {
								action(dialogData.id);
								handleClose();
							}}
							color="primary">
							Так
						</Button>
					</DialogActions>
				</div>
			</Dialog>
		</>
	);
});
