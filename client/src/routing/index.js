import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Auth } from '../pages';
import { PrivateRoute } from './PrivateRoute';
import { Groups, NotFound, GroupDetailView, Cars, Instructors, Students } from '../pages';

export const Routes = () => {
	return (
		<Switch>
			<Route exact path="/">
				<Redirect exact to="/groups" />
			</Route>
			<Route exact path="/login" component={Auth} />

			<PrivateRoute exact path="/groups" component={Groups} />
			<PrivateRoute exact path="/groups/:id" component={GroupDetailView} />

			<PrivateRoute exact path="/cars" component={Cars} />

			<PrivateRoute exact path="/instructors" component={Instructors} />

			<PrivateRoute exact path="/students" component={Students} />

			<PrivateRoute exact path="*" component={NotFound} />
		</Switch>
	);
};
