import React from 'react';
import { useParams } from 'react-router-dom';
import { DT } from '../../../components';
import { StudentForm } from './StudentForm';
import { columns, title, studentKeys } from './enums';

export const GroupStudentsPage = ({
	students,
	actions,
	isLoading,
	isDialogOpen,
	isModalOpen,
	setModalStatus,
	setDialogStatus,
}) => {
	let { id } = useParams();

	const { addFromFile } = actions;

	return (
			<DT
				columns={columns}
				data={students}
				actions={() => {}}
				title={title}
				isLoading={isLoading}
				isDialogOpen={isDialogOpen}
				isModalOpen={isModalOpen}
				setModalStatus={setModalStatus}
				setDialogStatus={setDialogStatus}>
				{/* <ExelFileReader groupId={id} action={addFromFile} keys={studentKeys} /> */}
				<StudentForm groupId={id} action={addFromFile} keys={studentKeys}/>
			</DT>
	);
};
