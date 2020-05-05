import React from 'react';
import { useParams } from 'react-router-dom';
import { DT } from '../../../components';
import { StudentForm } from './StudentForm';
import { Multiform } from '../../../commons';
import { columns, title, studentKeys } from './enums';
import { normalizeDate } from '../../../helpers/normalizeString';

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

	students.map((item) => (item.dateOfBirth = normalizeDate(item.dateOfBirth)))

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
			<Multiform groupId={id} action={addFromFile} keys={studentKeys} DefaultForm={StudentForm} />
		</DT>
	);
};
