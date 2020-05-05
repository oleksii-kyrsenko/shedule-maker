import React from 'react';
import { useParams } from 'react-router-dom';
import { DT } from '../../../components';
import { columns, title, carKeys } from './enums';
import { Multiform } from '../../../commons';
import { CarForm } from './CarForm';


export const GroupCarsPage = ({
	cars,
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
			data={cars}
			actions={() => {}}
			title={title}
			isLoading={isLoading}
			isDialogOpen={isDialogOpen}
			isModalOpen={isModalOpen}
			setModalStatus={setModalStatus}
			setDialogStatus={setDialogStatus}>
			<Multiform groupId={id} action={addFromFile} keys={carKeys} DefaultForm={CarForm} />
		</DT>
	);
};
