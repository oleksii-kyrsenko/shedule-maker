import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';
import TablePagination from '@material-ui/core/TablePagination';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { useStyles } from './styles';
import { ModalForm } from '../../commons';
import { connect } from 'react-redux';
import { setModalStatus } from '../../commons/routines';

const mapStateToProps = (state) => ({
	isModalOpen: state.commonsReducer.isModalOpen,
});

const actionCreators = {
	setModalStatus,
};

export const DataTable = connect(
	mapStateToProps,
	actionCreators
)(({ columns, data, actions, title, setModalStatus, children, isModalOpen }) => {
	const classes = useStyles();
	const { edit, create, deleteItem } = actions;

	const [state, setState] = useState({
		columns,
		data,
	});

	const [modalData, setModalData] = useState(null);

	useEffect(() => {
		setState({ ...state, data });
		// eslint-disable-next-line
	}, [data]);

	let history = useHistory();
	return (
		<>
			<MaterialTable
				components={{
					Pagination: (props) => {
						return (
							<>
								<TablePagination
									{...props}
									rowsPerPageOptions={[5, 10, 30, { label: 'All', value: props.count }]}
								/>
							</>
						);
					},
				}}
				options={{
					grouping: true,
				}}
				actions={[
					{
						icon: 'edit',
						tooltip: 'Edit',
						onClick: (event, rowData) => {
							setModalData(rowData._id);
							setModalStatus(true);
						},
					},
					{
						icon: 'delete',
						tooltip: 'Delete',
						onClick: async (event, rowData) => {
							await deleteItem(rowData._id);
							setState((prevState) => {
								const data = [...prevState.data];
								data.splice(data.indexOf(rowData), 1);
								return { ...prevState, data };
							});
						},
					},
				]}
				onRowClick={(evt, selectedRow) =>
					history.push(`${history.location.pathname}/${selectedRow._id}`)
				}
				title={title}
				columns={state.columns}
				data={state.data}
			/>
			<Tooltip title="Add" aria-label="add">
				<Fab
					color="default"
					className={classes.fab}
					onClick={() => {
						setModalData(null);
						setModalStatus(true);
					}}>
					<AddIcon />
				</Fab>
			</Tooltip>
			{isModalOpen && <ModalForm data={modalData}>{children}</ModalForm>}
		</>
	);
});
