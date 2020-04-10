import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';

export const DataTable = ({ columns, data, actions, title }) => {
	const { edit, create, deleteItem } = actions;
	let history = useHistory();

	const [state, setState] = useState({
		columns,
		data,
		actions,
	});
	useEffect(() => {
		setState({ ...state, data });
		// eslint-disable-next-line
	}, [data]);

	return (
		<MaterialTable
			title={title}
			columns={state.columns}
			data={state.data}
			options={{
				grouping: true,
			}}
			components={{
				OverlayLoading: () => <div />,
			}}
			onRowClick={(evt, selectedRow) =>
				history.push(`${history.location.pathname}/${selectedRow._id}`)
			}
			editable={{
				onRowAdd: (newData) =>
					new Promise(async (resolve) => {
						resolve();
						await create(newData);
					}),
				onRowUpdate: (newData, oldData) =>
					new Promise(async (resolve) => {
						resolve();
						if (oldData) {
							const { _id } = oldData;
							const payload = { _id, newData };
							await edit(payload);
						}
					}),
				onRowDelete: (oldData) =>
					new Promise(async (resolve) => {
						resolve();
						await deleteItem(oldData._id);
						setState((prevState) => {
							const data = [...prevState.data];
							data.splice(data.indexOf(oldData), 1);
							return { ...prevState, data };
						});
					}),
			}}
		/>
	);
};
