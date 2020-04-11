import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { fetchAllGroups, deleteGroup } from './routines';

import { DataTable } from '../../components';
import { GroupForm } from './GroupForm';

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

	const columns = [
		{ title: 'Group number', field: 'name' },
		{ title: 'Category', field: 'category' },
		{
			title: 'Start',
			field: 'start',
		},
		{
			title: 'End',
			field: 'end',
		},
		{
			title: 'Students',
			field: 'students',
			editable: 'never',
		},
		{
			title: 'Instructors',
			field: 'instructors',
			editable: 'never',
		},
		{
			title: 'Cars',
			field: 'cars',
			editable: 'never',
		},
	];

	const actions = {
		deleteItem: deleteGroup,
	};

	const title = 'Groups';

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
