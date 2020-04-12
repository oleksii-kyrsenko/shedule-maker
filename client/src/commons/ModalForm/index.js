import React, { Children, cloneElement } from 'react';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { connect } from 'react-redux';
import { setModalStatus } from '../routines';

import { useStyles } from './styles';

const mapStateToProps = (state) => ({
	isModalOpen: state.commonsReducer.isModalOpen,
});

const actionCreators = {
	setModalStatus,
};

export const ModalForm = connect(
	mapStateToProps,
	actionCreators
)(({ isModalOpen, setModalStatus, children, modalData }) => {
	const classes = useStyles();

	const childrenWithProps = Children.map(children, (child) => {
		return cloneElement(child, { modalData });
	});

	const handleClose = () => {
		setModalStatus(false);
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
						<CloseIcon
							className={classes.close}
							onClick={() => {
								setModalStatus(false);
							}}
						/>
						{childrenWithProps}
					</div>
				</Fade>
			</Modal>
		</div>
	);
});
