import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Auth } from '../pages';
import { PrivateRoute } from './PrivateRoute';
import { Groups, NotFound, GroupDetailView } from '../pages';

export const Routes = () => {
	return (
		<Switch>
			<Route exact path="/">
				<Redirect to="/groups" />
			</Route>
			<Route exact path="/login" component={Auth} />

			<PrivateRoute exact path="/groups" component={Groups} />
			<PrivateRoute exact path="/groups/:id" component={GroupDetailView} />
			<PrivateRoute exact path="*" component={NotFound} />
		</Switch>
	);
};
