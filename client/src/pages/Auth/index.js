import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { authUser, createUser } from './routines';
import { errorData, clearErrors } from '../../commons/routines';
import { useStyles } from './styles';
import { setErrorsArray } from '../../helpers/setErrorsArray';

const mapStateToProps = (state) => ({
	isAuth: state.authReducer.isAuth,
});

const actionCreators = {
	authUser,
	createUser,
	errorData,
	clearErrors,
};

export const Auth = connect(
	mapStateToProps,
	actionCreators
)(({ authUser, createUser, isAuth, errorData, clearErrors }) => {
	const classes = useStyles();
	const history = useHistory();
	const { register, errors, handleSubmit } = useForm();

	const [authMode, setAuthMode] = useState(true);

	useEffect(() => {
		isAuth && history.push('/');
	}, [isAuth, history]);

	useEffect(() => {
		clearErrors();
		const errorsArray = setErrorsArray(errors);
		errorsArray.length && errorData(errorsArray);
	}, [errors, clearErrors, errorData]);

	const changeAuthModeHahdle = () => {
		setAuthMode(!authMode);
	};

	const onSubmit = (data) => {
		authMode ? authUser(data) : createUser(data);
	};

	return (
		<Container component="main" maxWidth="xs" className={classes.root}>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					{!authMode ? 'Sign Up' : 'Sign In'}
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={2}>
						{!authMode && (
							<Grid item xs={12}>
								<TextField
									inputRef={register({
										required: true,
									})}
									variant="outlined"
									fullWidth
									id="name"
									name="name"
									type="text"
									label="Company name"
									error={!!errors.name}
								/>
							</Grid>
						)}
						<Grid item xs={12}>
							<TextField
								inputRef={register({
									// eslint-disable-next-line
									pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
									required: true,
								})}
								variant="outlined"
								fullWidth
								id="email"
								name="email"
								type="email"
								label="Email Address"
								error={!!errors.email}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								inputRef={register({
									required: true,
									minLength: 5,
								})}
								variant="outlined"
								fullWidth
								name="password"
								type="password"
								id="password"
								label="Password"
								error={!!errors.password}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}>
						{!authMode ? 'Sign Up' : 'Sign In'}
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="#" onClick={changeAuthModeHahdle}>
								{authMode ? "Don't have an account? Sign Up" : 'Already have an account?  Sign In'}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
});
