import React from 'react';
import { useParams } from 'react-router-dom';
import { DataTable } from '../../../components';
import { ExelFileReader } from '../../../components';
import { columns, title, carKeys } from './enums';

export const GroupCarsPage = ({ addGroupCarsFromFile, cars, actions, ...rest }) => {
	let { id } = useParams();
	const { addFromFile } = actions;
	return (
		<DataTable columns={columns} data={cars} actions={() => {}} title={title}>
			<ExelFileReader groupId={id} action={addFromFile} keys={carKeys} />
		</DataTable>
	);
};
