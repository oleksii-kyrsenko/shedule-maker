import React from 'react';
import { useParams } from 'react-router-dom';
import { DataTable } from '../../../components';
import { ExelFileReader } from '../../../components';
import { columns, title, instructorKeys } from './enums';

export const GroupInstructorsPage = ({
	addGroupInstructorsFromFile,
	instructors,
	actions,
	...rest
}) => {
	let { id } = useParams();

	const { addFromFile } = actions;

	return (
		<DataTable columns={columns} data={instructors} actions={() => {}} title={title}>
			<ExelFileReader groupId={id} action={addFromFile} keys={instructorKeys} />
		</DataTable>
	);
};
