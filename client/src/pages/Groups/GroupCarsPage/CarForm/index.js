import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { useStyles } from './styles';
import { setErrorsArray } from '../../../../helpers/setErrorsArray';
import { setModalStatus, errorData, clearMessages } from '../../../../commons/routines';
import { createGroup, editGroup } from '../../routines';

const schema = yup.object().shape({
	brand: yup.string().required('brand is required'),
	category: yup.string().required('category is required'),
	owner: yup.string().required('owner is required'),
	number: yup.string().required('number date is required'),
	protocol: yup.string().required('protocol is required'),
	year: yup.string().required('year is required'),
});

const mapStateToProps = (state) => ({
	errorMessages: state.commonsReducer.errorMessages,
	isModalOpen: state.commonsReducer.isModalOpen,
	isLoading: state.commonsReducer.isLoading,
});

const actionCreators = {
	createGroup,
	editGroup,
	errorData,
	clearMessages,
	setModalStatus,
};

export const CarForm = connect(
	mapStateToProps,
	actionCreators
)(({ modalData, createGroup, editGroup, errorData, clearMessages }) => {
	const classes = useStyles();
	const { register, errors, handleSubmit, reset } = useForm({
		validationSchema: schema,
	});

	useEffect(() => {
		modalData &&
			reset({
				brand: modalData.brand,
				category: modalData.category,
				owner: modalData.owner,
				number: modalData.number,
				protocol: modalData.protocol,
				year: modalData.year,
			});
	}, [reset, modalData]);

	useEffect(() => {
		const errorsArray = setErrorsArray(errors);
		errorsArray.length && errorData(errorsArray);
	}, [errors, errorData]);

	const onSubmit = (data) => {
		clearMessages();
		// modalData ? editGroup({ id: modalData._id, data }) : createGroup(data);
		console.log(data);
	};

	return (
		<div className={classes.paper}>
			<Typography component="h1" variant="h5" className={classes.title}>
				{modalData ? 'Редагувати автомобіль' : 'Додати автомобіль'}
			</Typography>
			<form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							inputRef={register}
							variant="outlined"
							fullWidth
							id="brand"
							name="brand"
							type="text"
							label="Марка автомобіля"
							error={!!errors.brand}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							inputRef={register}
							variant="outlined"
							fullWidth
							id="category"
							name="category"
							type="text"
							label="Категорія"
							error={!!errors.category}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							inputRef={register}
							variant="outlined"
							fullWidth
							multiline
							rows={2}
							id="owner"
							name="owner"
							type="text"
							label="Власник"
							error={!!errors.owner}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							inputRef={register}
							variant="outlined"
							fullWidth
							id="number"
							name="number"
							type="text"
							label="Номер"
							error={!!errors.number}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							inputRef={register}
							id="protocol"
							name="protocol"
							type="text"
							label="Протокол перевірки"
							fullWidth
							variant="outlined"
							error={!!errors.protocol}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							inputRef={register}
							id="year"
							name="year"
							type="text"
							label="Рік випуску"
							fullWidth
							variant="outlined"
							error={!!errors.year}
						/>
					</Grid>
				</Grid>
				<Button
					onClick={() => clearMessages()}
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}>
					Підтвердити
				</Button>
			</form>
		</div>
	);
});
