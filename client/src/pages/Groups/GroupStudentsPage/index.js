import React from 'react';
import { useParams } from 'react-router-dom';
import { DataTable } from '../../../components';
import { ExelFileReader } from '../../../components';
import { columns, title, studentKeys } from './enums';

export const GroupStudentsPage = ({ addGroupStudentsFromFile, students, actions, ...rest }) => {
	let { id } = useParams();

	const { addFromFile } = actions;

	return (
		<DataTable columns={columns} data={students} actions={() => {}} title={title}>
			<ExelFileReader groupId={id} action={addFromFile} keys={studentKeys} />
		</DataTable>
	);
};
