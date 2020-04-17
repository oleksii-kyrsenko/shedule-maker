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
					localization={{
						pagination: {
							labelDisplayedRows: 'Показано {from}-{to} з {count}',
							labelRowsSelect: 'рядків',
							firstAriaLabel: 'Перша сторінка',
							firstTooltip: 'Перша сторінка',
							previousAriaLabel: 'Попередня сторінка',
							previousTooltip: 'Попередня сторінка',
							nextAriaLabel: 'Наступна сторінка',
							nextTooltip: 'Наступна сторінка',
							lastAriaLabel: 'Остання сторінка',
							lastTooltip: 'Остання сторінка',
						},
						toolbar: {
							nRowsSelected: '{0} row(s) selected',
							searchPlaceholder: 'Знайти',
							searchTooltip: 'Знайти',
							exportTitle: 'Експорт',
							exportAriaLabel: 'Експорт',
							exportName: 'Експортувати як CSV',
						},
						header: {
							actions: 'Дії',
						},
						body: {
							emptyDataSourceMessage: 'Немає даних для відображення',
							filterRow: {
								filterTooltip: 'Фільтр',
							},
						},
						grouping: {
							placeholder: 'Перетягніть заголовки сюди для групування',
						},
					}}
					components={{
						Pagination: (props) => {
							return (
								<TablePagination
									{...props}
									rowsPerPageOptions={[
										5,
										10,
										30,
										{ label: 'Показати всі', value: props.count || '0' },
									]}
								/>
							);
						},
					}}
					options={{
						grouping: true,
						exportButton: true,
					}}
					actions={[
						{
							icon: 'visibility',
							tooltip: 'Детально',
							onClick: (event, rowData) => {
								history.push(`${history.location.pathname}/${rowData._id}`);
							},
						},
						{
							icon: 'edit',
							tooltip: 'Редагувати',
							onClick: (event, rowData) => {
								setModalData(rowData);
								setModalStatus(true);
							},
						},
						{
							icon: 'delete',
							tooltip: 'Видалити',
							onClick: (event, rowData) => {
								setDialogStatus(true);
								setDialogData({
									title: 'Видалення.',
									body: `Видалити групу № ${rowData.number}?
								`,
									id: rowData._id,
								});
							},
						},
					]}
					onRowClick={(evt, selectedRow) => {
						history.push(`${history.location.pathname}/${selectedRow._id}`);
					}}
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
