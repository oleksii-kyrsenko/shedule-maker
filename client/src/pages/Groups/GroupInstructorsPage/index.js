import React from 'react';
import { useParams } from 'react-router-dom';
import { DT } from '../../../components';
import { columns, title, instructorKeys } from './enums';
import { Multiform } from '../../../commons';
import { InstructorForm } from './InstructorForm';

export const GroupInstructorsPage = ({
	instructors,
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
			data={instructors}
			actions={() => {}}
			title={title}
			isLoading={isLoading}
			isDialogOpen={isDialogOpen}
			isModalOpen={isModalOpen}
			setModalStatus={setModalStatus}
			setDialogStatus={setDialogStatus}>
			<Multiform
				groupId={id}
				action={addFromFile}
				keys={instructorKeys}
				DefaultForm={InstructorForm}
			/>
		</DT>
	);
};
