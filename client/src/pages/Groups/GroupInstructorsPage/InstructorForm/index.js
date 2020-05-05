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
	atestat: yup.string().required('atestat is required'),
	fullName: yup.string().required('Name is required'),
	healthBook: yup.string().required('healthBook is required'),
	experience: yup.string().required('experience date is required'),
	dateOfBirth: yup.string().required('DateOfBirth is required'),
	drivingLicense: yup.string().required('drivingLicense is required'),
	skills: yup.string().required('skills is required'),
	education: yup.string().required('education is required'),
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

export const InstructorForm = connect(
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
				fullName: modalData.fullName,
				dateOfBirth: modalData.dateOfBirth.split('.').reverse().join('-'),
				atestat: modalData.atestat,
				healthBook: modalData.healthBook,
				experience: modalData.experience,
				drivingLicense: modalData.drivingLicense,
				skills: modalData.skills,
				education: modalData.education,
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
				{modalData ? 'Редагувати інструктора' : 'Додати інструктора'}
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
							multiline
							rows={2}
							id="atestat"
							name="atestat"
							type="text"
							label="Атестат"
							error={!!errors.atestat}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							inputRef={register}
							variant="outlined"
							fullWidth
							id="experience"
							name="experience"
							type="text"
							label="Досвід"
							error={!!errors.experience}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							inputRef={register}
							variant="outlined"
							fullWidth
							id="healthBook"
							name="healthBook"
							type="text"
							label="Медична книжка"
							error={!!errors.healthBook}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							inputRef={register}
							id="drivingLicense"
							name="drivingLicense"
							type="text"
							label="Посвідчення водія"
							fullWidth
							variant="outlined"
							error={!!errors.drivingLicense}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							inputRef={register}
							id="skills"
							name="skills"
							type="text"
							label="Вид підготовки"
							multiline
							fullWidth
							rows={2}
							variant="outlined"
							error={!!errors.skills}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							inputRef={register}
							id="education"
							name="education"
							type="text"
							label="Освіта"
							fullWidth
							variant="outlined"
							error={!!errors.education}
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
