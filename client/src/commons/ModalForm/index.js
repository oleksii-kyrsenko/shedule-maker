import React, { Children, cloneElement, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { connect } from 'react-redux';
import { setModalStatus, clearMessages } from '../routines';

import { useStyles } from './styles';

const mapStateToProps = (state) => ({
	isModalOpen: state.commonsReducer.isModalOpen,
});

const actionCreators = {
	setModalStatus,
	clearMessages,
};

export const ModalForm = connect(
	mapStateToProps,
	actionCreators
)(({ isModalOpen, setModalStatus, children, modalData, clearMessages }) => {
	const classes = useStyles();

	const childrenWithProps = Children.map(children, (child) => {
		return cloneElement(child, { modalData });
	});

	useEffect(() => {
		clearMessages();
	}, [isModalOpen, clearMessages]);

	const handleClose = () => {
		setModalStatus(false);
		clearMessages();
	};

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={isModalOpen}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={isModalOpen}>
					<div id="transition-modal-description" className={classes.paper}>
						<CloseIcon className={classes.close} onClick={handleClose} />
						{childrenWithProps}
					</div>
				</Fade>
			</Modal>
		</div>
	);
});
