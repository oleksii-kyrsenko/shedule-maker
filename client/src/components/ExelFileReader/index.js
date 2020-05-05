import React, { useState, useEffect } from 'react';
import XLSX from 'xlsx';
import { makeExelColumns } from '../../helpers/makeExelColumns';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import { useStyles } from './styles';

import { checkExtRegex, types, checkFileExtension } from '../../helpers/checkFileExtension';
import { renameObjectKeys } from '../../helpers/renameObjectKeys';

export const ExelFileReader = ({ groupId, action, keys }) => {
	const classes = useStyles();
	const { register, errors, handleSubmit } = useForm();

	const [state, setState] = useState({
		file: null,
		data: null,
		cols: null,
	});

	useEffect(() => {
		state.file && getFileData();
		// eslint-disable-next-line
	}, [state.file]);

	const handleChange = (e) => {
		try {
			const files = e.target.files;
			if (!files || !files[0] || !checkFileExtension(checkExtRegex, types, files[0].name)) {
				setState((prev) => {
					return { ...prev, file: null, data: null, cols: null };
				});
				throw new Error('No file or invalid extension');
			}
			setState((prev) => {
				return { ...prev, file: files[0] };
			});
		} catch (error) {
			console.error(error.message);
		}
	};

	const getFileData = () => {
		try {
			/* Boilerplate to set up FileReader */
			const reader = new FileReader();
			const rABS = !!reader.readAsBinaryString;

			reader.onload = (e) => {
				/* Parse data */
				const bstr = e.target.result;
				const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
				/* Get first worksheet */
				const wsname = wb.SheetNames[0];
				const ws = wb.Sheets[wsname];
				/* Convert array of arrays */
				let data = XLSX.utils.sheet_to_json(ws);
				/*Rename keys*/

				data = renameObjectKeys(data, keys);
				/* Update state */
				setState((prev) => {
					return { ...prev, data: data, cols: makeExelColumns(ws['!ref']) };
				});
			};

			if (rABS) {
				reader.readAsBinaryString(state.file);
			} else {
				reader.readAsArrayBuffer(state.file);
			}
		} catch (error) {
			console.error(error.message);
		}
	};

	const onSubmit = () => {
		let payload;
		groupId ? (payload = { groupId, data: state.data }) : (payload = { data: state.data });
		action(payload);
	};

	return (
		<div className={classes.paper}>
			<Typography component="h1" variant="h5">
				Завантажити з файлу
			</Typography>
			<form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							inputRef={register}
							variant="outlined"
							fullWidth
							id="file"
							name="file"
							type="file"
							error={!!errors.file}
							onChange={handleChange}
						/>
					</Grid>

					<Grid item xs={12}>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							disabled={!state.data}
							className={classes.submit}>
							Submit
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};
