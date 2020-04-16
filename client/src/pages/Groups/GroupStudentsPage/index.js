import React from 'react';
import { useParams } from 'react-router-dom';
import { DataTable } from '../../../components';
import { ExelFileReader } from '../../../components';
import { columns, title, studentKeys } from './enums';
import { connect } from 'react-redux';
import { addGroupStudentsFromFile } from '../routines';

const mapStateToProps = (state) => ({});

const actionCreators = { addGroupStudentsFromFile };

export const GroupStudentsPage = connect(
	null,
	actionCreators
)(({ addGroupStudentsFromFile, ...rest }) => {
	let { id } = useParams();
	return (
		<DataTable columns={columns} data={[]} actions={() => {}} title={title}>
			<ExelFileReader groupId={id} action={addGroupStudentsFromFile} keys={studentKeys}/>
		</DataTable>
	);
});
