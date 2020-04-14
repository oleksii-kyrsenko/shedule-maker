import React, { useState } from 'react';
import XLSX from 'xlsx';
import { makeExelColumns } from '../../helpers/makeExelColumns';
import { SheetJSFT } from './types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
}));

export const ExelFileReader = (props) => {
	const classes = useStyles();

	const [state, setState] = useState({
		file: null,
		data: null,
		cols: [],
	});

	console.log(state.data);

	const handleChange = (e) => {
		const files = e.target.files;
		if (files && files[0])
			setState((prev) => {
				return { ...prev, file: files[0] };
			});
	};

	const handleFile = () => {
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
			const data = XLSX.utils.sheet_to_json(ws);
			/* Update state */
			setState((prev) => {
				return { ...prev, data: data, cols: makeExelColumns(ws['!ref']) };
			});
			console.log(state.data);
		};

		if (rABS) {
			reader.readAsBinaryString(state.file);
		} else {
			reader.readAsArrayBuffer(state.file);
		}
	};

	return (
		<div>
			<label htmlFor="file">Upload an excel to Process Triggers</label>
			<br />
			<TextField
				type="file"
				id="file"
				accept={SheetJSFT}
				onChange={handleChange}
				id="outlined-basic"
				// label="Outlined"
				variant="outlined"
			/>
			<br />
			<input
				type="submit"
				value="Process Triggers"
				onClick={() => {
					state.file ? handleFile() : console.log(null);
				}}
			/>
			{state.data && (
				<input
					type="submit"
					value="Process Triggers"
					onClick={() => {
						state.file ? handleFile() : console.log(null);
					}}
				/>
			)}
		</div>
	);
};
