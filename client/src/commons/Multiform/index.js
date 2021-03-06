import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { ExelFileReader } from '../../components';

export const Multiform = ({ modalData, groupId, action, keys, DefaultForm }) => {
	const [mode, setMode] = useState(null);
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			{!mode && <DefaultForm modalData={modalData} />}
			{mode === 'fromFile' && <ExelFileReader groupId={groupId} action={action} keys={keys} />}
			{!modalData && (
				<Grid container justify="flex-end">
					{mode !== 'fromFile' && (
						<Grid item xs={12}>
							<Link href="#" onClick={() => setMode('fromFile')}>
								Додати з файлу
							</Link>
						</Grid>
					)}
					{mode !== 'fromExistings' && groupId && (
						<Grid item xs={12}>
							<Link href="#" onClick={() => setMode('fromExistings')}>
								Додати з існуючих
							</Link>
						</Grid>
					)}
					{mode && (
						<Grid item xs={12}>
							<Link href="#" onClick={() => setMode(null)}>
								Додати нового
							</Link>
						</Grid>
					)}
				</Grid>
			)}
		</Container>
	);
};
