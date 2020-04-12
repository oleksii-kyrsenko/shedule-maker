import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import '../../../node_modules/react-toastify/dist/ReactToastify.css';

const mapStateToProps = (state) => ({
	errorMessages: state.commonsReducer.errorMessages,
	successMessages: state.commonsReducer.successMessages,
});

export const Notify = connect(mapStateToProps)(({ errorMessages, successMessages }) => {
	const notify = (msg, type) => {
		return toast[type](msg, {
			toastId: msg,
		});
	};

	return (
		<>
			{errorMessages
				? errorMessages.map((item, i) => {
						const msg = item.message || item.msg;
						return (
							<span key={i} style={{ display: 'none' }}>
								{notify(msg, 'error')}
							</span>
						);
				  })
				: null}
			{successMessages
				? successMessages.map((item, i) => {
						const msg = item.message || item.msg;
						return (
							<span key={i} style={{ display: 'none' }}>
								{notify(msg, 'success')}
							</span>
						);
				  })
				: null}
		</>
	);
});
