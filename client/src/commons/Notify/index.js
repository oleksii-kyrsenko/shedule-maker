import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import '../../../node_modules/react-toastify/dist/ReactToastify.css';

const mapStateToProps = (state) => ({
	errors: state.commonsReducer.errors,
});

export const Notify = connect(mapStateToProps)(({ errors }) => {
	const notify = (msg) => {
		return toast['error'](msg, {
			toastId: msg,
		});
	};

	return (
		<>
			{errors
				? errors.map((item, i) => (
						<span key={i} style={{ display: 'none' }}>
							{notify(item.msg)}
						</span>
				  ))
				: null}
		</>
	);
});
