import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DataTable } from '../../../components';
import { ExelFileReader } from '../../../components';
import { columns, title, carKeys } from './enums';
import { connect } from 'react-redux';
import { addGroupCarsFromFile } from '../routines';

const mapStateToProps = (state) => ({
	group: state.groupsReducer.group,
});

const actionCreators = { addGroupCarsFromFile };

export const GroupCarsPage = connect(
	mapStateToProps,
	actionCreators
)(({ addGroupCarsFromFile, group, ...rest }) => {
	let { id } = useParams();

	const [data, setData] = useState([]);

	console.log(data);

	useEffect(() => {
		group && setData(group.cars.sort((a, b) => a.sequenceNumber - b.sequenceNumber));
	}, [group]);

	return (
		<DataTable columns={columns} data={data} actions={() => {}} title={title}>
			<ExelFileReader groupId={id} action={addGroupCarsFromFile} keys={carKeys} />
		</DataTable>
	);
});
