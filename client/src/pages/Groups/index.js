import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAllGroups, deleteGroup } from './routines';
import { DataTable } from '../../components';
import { GroupForm } from './GroupForm';
import { columns, title } from './enums';

const mapStateToProps = (state) => ({
	groups: state.groupsReducer.groups,
	isAuth: state.authReducer.isAuth,
});

const actionCreators = {
	fetchAllGroups,
	deleteGroup,
};
export const Groups = connect(
	mapStateToProps,
	actionCreators
)(({ fetchAllGroups, deleteGroup, groups, isAuth }) => {
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
						start: new Date(item.start).toLocaleDateString(),
						end: new Date(item.end).toLocaleDateString(),
					},
				]);
			});
	}, [groups]);

	return (
		<DataTable columns={columns} data={data} actions={actions} title={title}>
			<GroupForm />
		</DataTable>
	);
});
