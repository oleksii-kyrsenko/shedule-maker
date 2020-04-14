import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useStyles } from './styles';

import { GroupStudentsPage } from '../../';

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

export const GroupDetailView = () => {
	const classes = useStyles();
	const theme = useTheme();
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<Typography className={classes.title} component="h1" variant="h5" align="center">
				Group №1
			</Typography>
			<AppBar className={classes.header} position="static" color="default">
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
					aria-label="full width tabs example">
					<Tab label="Shedule" {...a11yProps(0)} />
					<Tab label="Students" {...a11yProps(1)} />
					<Tab label="Instructors" {...a11yProps(2)} />
					<Tab label="Cars" {...a11yProps(3)} />
				</Tabs>
			</AppBar>
			<div>
				<TabPanel value={value} index={0} dir={theme.direction}>
					Shedule
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					<GroupStudentsPage />
				</TabPanel>
				<TabPanel value={value} index={2} dir={theme.direction}>
					Instructors
				</TabPanel>
				<TabPanel value={value} index={3} dir={theme.direction}>
					Cars
				</TabPanel>
			</div>
		</div>
	);
};
