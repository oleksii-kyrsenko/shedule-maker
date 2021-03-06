import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { useForm, Controller } from 'react-hook-form';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { useStyles } from './styles';
import { setErrorsArray } from '../../../helpers/setErrorsArray';
import { setModalStatus } from '../../../commons/routines';
import { createGroup, editGroup } from '../routines';
import { errorData, clearMessages } from '../../../commons/routines';
import { categories } from '../enums';

const schema = yup.object().shape({
	number: yup.string().required('Group number is required'),
	start: yup.string().required('Start date is required'),
	end: yup.string().required('End date is required'),
	category: yup.string().required('Group category is required'),
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

export const GroupForm = connect(
	mapStateToProps,
	actionCreators
)(({ modalData, createGroup, editGroup, errorData, clearMessages }) => {
	const classes = useStyles();
	const { register, errors, handleSubmit, reset, control } = useForm({
		validationSchema: schema,
	});

	useEffect(() => {
		modalData &&
			reset({
				number: modalData.number,
				start: modalData.start.split('.').reverse().join('-'),
				end: modalData.end.split('.').reverse().join('-'),
			});
	}, [reset, modalData]);

	useEffect(() => {
		const errorsArray = setErrorsArray(errors);
		errorsArray.length && errorData(errorsArray);
	}, [errors, errorData]);

	const onSubmit = (data) => {
		clearMessages();
		modalData ? editGroup({ id: modalData._id, data }) : createGroup(data);
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5" className={classes.title}>
					{modalData ? 'Редагувати групу' : 'Створити групу'}
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<TextField
								inputRef={register}
								variant="outlined"
								fullWidth
								id="number"
								name="number"
								type="text"
								label="Номер групи"
								error={!!errors.number}
							/>
						</Grid>
						<Grid item xs={6}>
							<FormControl variant="outlined" className={classes.formControl} fullWidth>
								<InputLabel id="category-label">Категорія</InputLabel>
								<Controller
									error={!!errors.category}
									as={Select}
									name="category"
									labelId="category-label"
									id="category"
									label="Категорія"
									control={control}
									onChange={([selected]) => {
										return selected;
									}}
									defaultValue={modalData ? modalData.category : ''}>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									{categories.map((category, i) => (
										<MenuItem key={i} value={category}>
											{category}
										</MenuItem>
									))}
								</Controller>
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<TextField
								inputRef={register}
								fullWidth
								id="start"
								label="Початок"
								type="date"
								name="start"
								InputLabelProps={{
									shrink: true,
								}}
								variant="outlined"
								error={!!errors.start}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								inputRef={register}
								fullWidth
								id="end"
								label="Кінець"
								type="date"
								name="end"
								InputLabelProps={{
									shrink: true,
								}}
								variant="outlined"
								error={!!errors.end}
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
		</Container>
	);
});
