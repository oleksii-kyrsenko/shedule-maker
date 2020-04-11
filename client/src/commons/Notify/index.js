import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import '../../../node_modules/react-toastify/dist/ReactToastify.css';

const mapStateToProps = (state) => ({
	errorMessages: state.commonsReducer.errorMessages,
});

export const Notify = connect(mapStateToProps)(({ errorMessages }) => {
	const notify = (msg) => {
		return toast['error'](msg, {
			toastId: msg,
		});
	};

	return (
		<>
			{errorMessages
				? errorMessages.map((item, i) => (
						<span key={i} style={{ display: 'none' }}>
							{notify(item.msg)}
						</span>
				  ))
				: null}
		</>
	);
});
