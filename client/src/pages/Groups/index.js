import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { fetchAllGroups, createGroup, editGroup, deleteGroup } from './routines';

import { DataTable } from '../../components';

const mapStateToProps = (state) => ({
	groups: state.groupsReducer.groups,
	isAuth: state.authReducer.isAuth,
});

const actionCreators = {
	fetchAllGroups,
	createGroup,
	editGroup,
	deleteGroup,
};
export const Groups = connect(
	mapStateToProps,
	actionCreators
)(({ fetchAllGroups, createGroup, editGroup, deleteGroup, groups, isAuth }) => {
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
		edit: editGroup,
		create: createGroup,
		deleteItem: deleteGroup,
	};

	const title = 'Groups';

	useEffect(() => {
		isAuth && fetchAllGroups();
	}, [fetchAllGroups, isAuth]);

	useEffect(() => {
		groups &&
			groups.map((item) => {
				typeof item.students === 'object' && (item.students = item.students.length);
				typeof item.cars === 'object' && (item.cars = item.cars.length);
				typeof item.instructors === 'object' && (item.instructors = item.instructors.length);
				item.start.length === 24 && (item.start = new Date(item.start).toLocaleDateString());
				item.end.length === 24 && (item.end = new Date(item.end).toLocaleDateString());
				return item;
			}) &&
			setData(groups);
	}, [groups]);

	return <DataTable columns={columns} data={data} actions={actions} title={title} />;
});
