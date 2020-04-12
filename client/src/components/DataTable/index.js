import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';
import TablePagination from '@material-ui/core/TablePagination';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { useStyles } from './styles';
import { ModalForm, DialogForm } from '../../commons';
import { connect } from 'react-redux';
import { setModalStatus } from '../../commons/routines';
import { setDialogStatus } from '../../commons/routines';

const mapStateToProps = (state) => ({
	isModalOpen: state.commonsReducer.isModalOpen,
	isDialogOpen: state.commonsReducer.isDialogOpen,
});

const actionCreators = {
	setModalStatus,
	setDialogStatus,
};

export const DataTable = connect(
	mapStateToProps,
	actionCreators
)(
	({
		columns,
		data,
		actions,
		title,
		setModalStatus,
		children,
		isModalOpen,
		setDialogStatus,
		isDialogOpen,
	}) => {
		const classes = useStyles();
		const { deleteItem } = actions;

		const [state, setState] = useState({
			columns,
			data,
		});

		const [modalData, setModalData] = useState(null);
		const [dialogData, setDialogData] = useState(null);

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
								<TablePagination
									{...props}
									rowsPerPageOptions={[5, 10, 30, { label: 'All', value: props.count }]}
								/>
							);
						},
					}}
					options={{
						grouping: true,
					}}
					actions={[
						{
							icon: 'visibility',
							tooltip: 'Details',
							onClick: (event, rowData) => {
								history.push(`${history.location.pathname}/${rowData._id}`);
							},
						},
						{
							icon: 'edit',
							tooltip: 'Edit',
							onClick: (event, rowData) => {
								setModalData(rowData);
								setModalStatus(true);
							},
						},
						{
							icon: 'delete',
							tooltip: 'Delete',
							onClick: (event, rowData) => {
								setDialogStatus(true);
								setDialogData({
									title: 'Deletion.',
									body: `Are you sure that you want to delete group № ${rowData.number}?
								`,
									id: rowData._id,
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
				{isModalOpen && <ModalForm modalData={modalData}>{children}</ModalForm>}
				{isDialogOpen && <DialogForm action={deleteItem} dialogData={dialogData} />}
			</>
		);
	}
);
