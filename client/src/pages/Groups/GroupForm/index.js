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
import { useStyles } from './styles';
import { setErrorsArray } from '../../../helpers/setErrorsArray';
import { setModalStatus } from '../../../commons/routines';

import { createGroup, editGroup } from '../routines';
import { errorData, clearErrors } from '../../../commons/routines';

const mapStateToProps = (state) => ({
	errorMessages: state.commonsReducer.errorMessages,
});

const actionCreators = {
	createGroup,
	editGroup,
	errorData,
	clearErrors,
	setModalStatus,
};

export const GroupForm = connect(
	mapStateToProps,
	actionCreators
)(
	({
		modalData,
		createGroup,
		editGroup,
		errorData,
		clearErrors,
		setModalStatus,
		errorMessages,
	}) => {
		const classes = useStyles();
		const { register, errors, handleSubmit, reset, control } = useForm();

		useEffect(() => {
			modalData &&
				reset({
					name: modalData.name,
					start: modalData.start.split('.').reverse().join('-'),
					end: modalData.end.split('.').reverse().join('-'),
				});
		}, [reset, modalData]);

		useEffect(() => {
			clearErrors();
			const errorsArray = setErrorsArray(errors);
			errorsArray.length && errorData(errorsArray);
		}, [errors, clearErrors, errorData]);

		const onSubmit = (data) => {
			console.log(data);
			modalData ? editGroup({ id: modalData._id, data }) : createGroup(data);
			!errorMessages && setModalStatus(false);
			return;
		};

		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Typography component="h1" variant="h5" className={classes.title}>
						{modalData ? 'Edit group' : 'Create group'}
					</Typography>
					<form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<TextField
									inputRef={register({
										required: true,
									})}
									variant="outlined"
									fullWidth
									id="name"
									name="name"
									type="text"
									label="Group number"
									error={!!errors.name}
								/>
							</Grid>
							<Grid item xs={6}>
								<FormControl variant="outlined" className={classes.formControl} fullWidth>
									<InputLabel id="category-label">Group category</InputLabel>
									<Controller
										error={!!errors.category}
										inputRef={(e) => {
											return register(
												{ name: 'category' },
												// { required: true }
												{
													validate: (value) => {
														// need to validate if it is undefined or empty array
														console.log(value);
														return Array.isArray(value) ? value.length > 0 : !!value;
													},
												}
											);
										}}
										as={Select}
										name="category"
										labelId="category-label"
										id="category"
										label="Group category"
										control={control}
										onChange={([selected]) => {
											return selected;
										}}
										defaultValue={modalData ? modalData.category : ''}>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										<MenuItem value="A">A</MenuItem>
										<MenuItem value="B">B</MenuItem>
										<MenuItem value="C">C</MenuItem>
										<MenuItem value="D">D</MenuItem>
										<MenuItem value="E">E</MenuItem>
									</Controller>
								</FormControl>
							</Grid>
							<Grid item xs={6}>
								<TextField
									inputRef={register({
										required: true,
									})}
									id="start"
									label="Start"
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
									inputRef={register({
										required: true,
									})}
									id="end"
									label="End"
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
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}>
							Submit
						</Button>
					</form>
				</div>
			</Container>
		);
	}
);
