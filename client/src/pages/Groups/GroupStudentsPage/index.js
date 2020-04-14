import React from 'react';
import { DataTable } from '../../../components';
import { columns, title } from './enums';

export const GroupStudentsPage = (props) => {
	return <DataTable columns={columns} data={[]} actions={() => {}} title={title} />;
};
