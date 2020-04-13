import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
	const handleClose = () => {
		setDialogStatus(false);
	};

	return (
		<>
			<Dialog fullWidth open={isDialogOpen} onClose={handleClose}>
				<DialogTitle>{dialogData.title}</DialogTitle>
				<DialogContent>
					<DialogContentText>{dialogData.body}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose} color="primary">
						No
					</Button>
					<Button
						onClick={() => {
							action(dialogData.id);
							handleClose();
						}}
						color="primary">
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
});
