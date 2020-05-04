import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { useStyles } from './styles';
import { fetchAllGroups, deleteGroup, fetchGroupById } from './routines';
import { DT } from '../../components';
import { GroupForm } from './GroupForm';
import { columns, title } from './enums';
import { normalizeDate } from '../../helpers/normalizeString';
import { setModalStatus, setDialogStatus } from '../../commons/routines';

const mapStateToProps = (state) => ({
	groups: state.groupsReducer.groups,
	isAuth: state.authReducer.isAuth,
	isLoading: state.commonsReducer.isLoading,
	isModalOpen: state.commonsReducer.isModalOpen,
	isDialogOpen: state.commonsReducer.isDialogOpen,
});

const actionCreators = {
	fetchAllGroups,
	deleteGroup,
	fetchGroupById,
	setModalStatus,
	setDialogStatus,
};
export const Groups = connect(
	mapStateToProps,
	actionCreators
)(
	({
		fetchAllGroups,
		deleteGroup,
		groups,
		isAuth,
		isLoading,
		isModalOpen,
		isDialogOpen,
		setModalStatus,
		setDialogStatus,
	}) => {
		const classes = useStyles();

		const [data, setData] = useState([]);
		const actions = {
			deleteItem: deleteGroup,
		};

		useEffect(() => {
			isAuth && fetchAllGroups();
		}, [fetchAllGroups, isAuth]);

		useEffect(() => {
			setData([]);
			groups &&
				groups.map((item) => {
					return setData((prev) => [
						...prev,
						{
							...item,
							students: item.students.length,
							instructors: item.instructors.length,
							cars: item.cars.length,
							start: normalizeDate(item.start),
							end: normalizeDate(item.end),
						},
					]);
				});
		}, [groups]);

		return (
			<Container maxWidth={false} className={classes.root}>
				<DT
					columns={columns}
					data={data}
					actions={actions}
					title={title}
					isLoading={isLoading}
					isDialogOpen={isDialogOpen}
					isModalOpen={isModalOpen}
					setModalStatus={setModalStatus}
					setDialogStatus={setDialogStatus}>
					<GroupForm />
				</DT>
			</Container>
		);
	}
);
