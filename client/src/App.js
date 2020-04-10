import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { Routes } from './routing';
import { ToastContainer } from 'react-toastify';

import { fetchAuthUser } from './pages/Auth/routines';
import { setAuthToken } from './helpers/setAuthToken';
import { Preloader, Notify, Navbar } from './commons';

const App = () => {
	useEffect(() => {
		setAuthToken(localStorage.token);
		if (localStorage.token) {
			store.dispatch(fetchAuthUser());
		}
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<Preloader />
				<Notify />
				<Route component={Routes} />
				<ToastContainer
					position="top-right"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnVisibilityChange
					draggable
					pauseOnHover
				/>
			</Router>
		</Provider>
	);
};

export default App;
