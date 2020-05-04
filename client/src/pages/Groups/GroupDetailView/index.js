import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useStyles } from './styles';
import { connect } from 'react-redux';
import { GroupStudentsPage, GroupInstructorsPage, GroupCarsPage } from '../../';
import { setModalStatus, setDialogStatus } from '../../../commons/routines';

import {
	fetchGroupById,
	addGroupCarsFromFile,
	addGroupInstructorsFromFile,
	addGroupStudentsFromFile,
} from '../routines';

const mapStateToProps = (state) => ({
	group: state.groupsReducer.group,
	isLoading: state.commonsReducer.isLoading,
	isModalOpen: state.commonsReducer.isModalOpen,
	isDialogOpen: state.commonsReducer.isDialogOpen,
});

const actionCreators = {
	fetchGroupById,
	addGroupCarsFromFile,
	addGroupInstructorsFromFile,
	addGroupStudentsFromFile,
	setModalStatus,
	setDialogStatus,
};

function TabPanel(props) {
	const { children, value, index, ...other } = props;
	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}>
			{value === index && <Box p={3}>{children}</Box>}
		</Typography>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}

export const GroupDetailView = connect(
	mapStateToProps,
	actionCreators
)(
	({
		fetchGroupById,
		group,
		addGroupCarsFromFile,
		addGroupInstructorsFromFile,
		addGroupStudentsFromFile,
		setModalStatus,
		setDialogStatus,
		isLoading,
		isModalOpen,
		isDialogOpen,
	}) => {
		const classes = useStyles();
		const theme = useTheme();
		let { id } = useParams();
		const [value, setValue] = useState(0);
		const [data, setData] = useState({
			students: [],
			instructors: [],
			cars: [],
		});

		useEffect(() => {
			fetchGroupById(id);
		}, [id, fetchGroupById]);

		useEffect(() => {
			group &&
				setData((prev) => {
					return {
						...prev,
						cars: group.cars.sort((a, b) => a.sequenceNumber - b.sequenceNumber),
						instructors: group.instructors.sort((a, b) => a.sequenceNumber - b.sequenceNumber),
						students: group.students.sort((a, b) => a.sequenceNumber - b.sequenceNumber),
					};
				});
		}, [group]);

		const handleChange = (event, newValue) => {
			setValue(newValue);
		};

		return (
			<div className={classes.root}>
				<Typography className={classes.title} component="h1" variant="h5" align="center">
					{group && `Група № ${group.number}`}
				</Typography>
				<AppBar className={classes.header} position="static" color="default">
					<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth"
						aria-label="full width tabs example">
						<Tab label="Розклад" {...a11yProps(0)} />
						<Tab label="Студенти" {...a11yProps(1)} />
						<Tab label="Інтруктори" {...a11yProps(2)} />
						<Tab label="Автомобілі" {...a11yProps(3)} />
					</Tabs>
				</AppBar>
				<div>
					<TabPanel value={value} index={0} dir={theme.direction}>
						Shedule
					</TabPanel>
					<TabPanel value={value} index={1} dir={theme.direction}>
						<GroupStudentsPage
							students={data.students}
							actions={{ addFromFile: addGroupStudentsFromFile }}
							isLoading={isLoading}
							isDialogOpen={isDialogOpen}
							isModalOpen={isModalOpen}
							setModalStatus={setModalStatus}
							setDialogStatus={setDialogStatus}
						/>
					</TabPanel>
					<TabPanel value={value} index={2} dir={theme.direction}>
						<GroupInstructorsPage
							instructors={data.instructors}
							actions={{ addFromFile: addGroupInstructorsFromFile }}
							isLoading={isLoading}
							isDialogOpen={isDialogOpen}
							isModalOpen={isModalOpen}
							setModalStatus={setModalStatus}
							setDialogStatus={setDialogStatus}
						/>
					</TabPanel>
					<TabPanel value={value} index={3} dir={theme.direction}>
						<GroupCarsPage
							cars={data.cars}
							actions={{ addFromFile: addGroupCarsFromFile }}
							isLoading={isLoading}
							isDialogOpen={isDialogOpen}
							isModalOpen={isModalOpen}
							setModalStatus={setModalStatus}
							setDialogStatus={setDialogStatus}
						/>
					</TabPanel>
				</div>
			</div>
		);
	}
);
