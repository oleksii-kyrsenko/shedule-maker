import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DataTable } from '../../../components';
import { ExelFileReader } from '../../../components';
import { columns, title, instructorKeys } from './enums';
import { connect } from 'react-redux';
import { addGroupInstructorsFromFile } from '../routines';

const mapStateToProps = (state) => ({
	group: state.groupsReducer.group,
});

const actionCreators = { addGroupInstructorsFromFile };

export const GroupInstructorsPage = connect(
	mapStateToProps,
	actionCreators
)(({ addGroupInstructorsFromFile, group, ...rest }) => {
	let { id } = useParams();

	const [data, setData] = useState([]);

	console.log(data);

	useEffect(() => {
		group && setData(group.instructors.sort((a, b) => a.sequenceNumber - b.sequenceNumber));
	}, [group]);

	return (
		<DataTable columns={columns} data={data} actions={() => {}} title={title}>
			<ExelFileReader groupId={id} action={addGroupInstructorsFromFile} keys={instructorKeys} />
		</DataTable>
	);
});
