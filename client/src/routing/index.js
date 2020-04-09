import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Auth } from '../pages';
import { PrivateRoute } from './PrivateRoute';
import { PrivatePage } from '../pages';

export const Routes = () => {
	return (
		<Switch>
			<PrivateRoute exact path="/" component={PrivatePage} />
			<Route exact path="/login" component={Auth} />
		</Switch>
	);
};
