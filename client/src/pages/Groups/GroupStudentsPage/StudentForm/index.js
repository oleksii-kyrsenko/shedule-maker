import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { useStyles } from './styles';
import { setErrorsArray } from '../../../../helpers/setErrorsArray';
import { setModalStatus, errorData, clearMessages } from '../../../../commons/routines';
import { createGroup, editGroup } from '../../routines';
import { ExelFileReader } from '../../../../components';

const schema = yup.object().shape({
	adress: yup.string().required('Adress is required'),
	fullName: yup.string().required('Name is required'),
	medSertificate: yup.string().required('MedSertificate is required'),
	passport: yup.string().required('Passport date is required'),
	dateOfBirth: yup.string().required('DateOfBirth is required'),
	// personalTaxNumber: yup.string().required('PersonalTaxNumber is required'),
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

export const StudentForm = connect(
	mapStateToProps,
	actionCreators
)(({ modalData, createGroup, editGroup, errorData, clearMessages }) => {
	const classes = useStyles();
	const { register, errors, handleSubmit, reset } = useForm({
		validationSchema: schema,
	});

	const [mode, setMode] = useState(null);

	useEffect(() => {
		modalData &&
			reset({
				fullName: modalData.fullName,
				dateOfBirth: modalData.dateOfBirth.split('.').reverse().join('-'),
				passport: modalData.passport,
				personalTaxNumber: modalData.personalTaxNumber,
				medSertificate: modalData.medSertificate,
				adress: modalData.adress,
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
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			{!mode && (
				<div className={classes.paper}>
					<Typography component="h1" variant="h5" className={classes.title}>
						{modalData ? 'Редагувати студента' : 'Додати студента'}
					</Typography>
					<form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									inputRef={register}
									variant="outlined"
									fullWidth
									id="fullName"
									name="fullName"
									type="text"
									label="П.І.Б"
									error={!!errors.fullName}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									inputRef={register}
									fullWidth
									id="dateOfBirth"
									label="Дата народження"
									type="date"
									name="dateOfBirth"
									InputLabelProps={{
										shrink: true,
									}}
									variant="outlined"
									error={!!errors.dateOfBirth}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									inputRef={register}
									variant="outlined"
									fullWidth
									id="passport"
									name="passport"
									type="text"
									label="Серія та номер паспорту"
									error={!!errors.passport}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									inputRef={register}
									variant="outlined"
									fullWidth
									id="personalTaxNumber"
									name="personalTaxNumber"
									type="text"
									label="Ідентифікаційний номер"
									error={!!errors.personalTaxNumber}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									inputRef={register}
									variant="outlined"
									fullWidth
									id="medSertificate"
									name="medSertificate"
									type="text"
									label="Медична довідка"
									error={!!errors.medSertificate}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									inputRef={register}
									id="adress"
									name="adress"
									type="text"
									label="Адреса"
									multiline
									fullWidth
									rows={3}
									variant="outlined"
									error={!!errors.adress}
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
			)}
			{mode === 'fromFile' && (
				<ExelFileReader  />
			)}
			{!modalData && (
				<Grid container justify="flex-end">
					{mode !== 'fromFile' && (
						<Grid item xs={12}>
							<Link href="#" onClick={() => setMode('fromFile')}>
								Додати з файлу
							</Link>
						</Grid>
					)}
					{mode !== 'fromExistings' && (
						<Grid item xs={12}>
							<Link href="#" onClick={() => setMode('fromExistings')}>
								Додати з існуючих
							</Link>
						</Grid>
					)}
					{mode && (
						<Grid item xs={12}>
							<Link href="#" onClick={() => setMode(null)}>
								Додати нового
							</Link>
						</Grid>
					)}
				</Grid>
			)}
		</Container>
	);
});
