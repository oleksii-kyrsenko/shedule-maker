import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DataTable } from '../../../components';
import { ExelFileReader } from '../../../components';
import { columns, title, studentKeys } from './enums';
import { connect } from 'react-redux';
import { addGroupStudentsFromFile } from '../routines';

const mapStateToProps = (state) => ({
	group: state.groupsReducer.group,
});

const actionCreators = { addGroupStudentsFromFile };

export const GroupStudentsPage = connect(
	mapStateToProps,
	actionCreators
)(({ addGroupStudentsFromFile, group, ...rest }) => {
	let { id } = useParams();

	const [data, setData] = useState([]);

	useEffect(() => {
		group && setData(group.students.sort((a, b) => a.sequenceNumber - b.sequenceNumber));
	}, [group]);

	return (
		<DataTable columns={columns} data={data} actions={() => {}} title={title}>
			<ExelFileReader groupId={id} action={addGroupStudentsFromFile} keys={studentKeys} />
		</DataTable>
	);
});
