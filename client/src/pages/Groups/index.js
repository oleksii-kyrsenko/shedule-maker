import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { useStyles } from './styles';
import { fetchAllGroups, deleteGroup, fetchGroupById } from './routines';
import { DataTable } from '../../components';
import { GroupForm } from './GroupForm';
import { columns, title } from './enums';
import {normalizeDate } from '../../helpers/normalizeString';


const mapStateToProps = (state) => ({
	groups: state.groupsReducer.groups,
	isAuth: state.authReducer.isAuth,
});

const actionCreators = {
	fetchAllGroups,
	deleteGroup,
	fetchGroupById,
};
export const Groups = connect(
	mapStateToProps,
	actionCreators
)(({ fetchAllGroups, deleteGroup, groups, isAuth, fetchGroupById }) => {
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
			<DataTable columns={columns} data={data} actions={actions} title={title}>
				<GroupForm />
			</DataTable>
		</Container>
	);
});
