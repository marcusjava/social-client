import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';
import User from './pages/user';
import NavBar from './components/layout/NavBar';
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute';

import { Provider } from 'react-redux';
import store from './redux/store';

import axios from 'axios';

import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './redux/types';
import { logout, getUserData } from './redux/actions/userActions';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeObject from './util/theme';

import './App.css';

const theme = createMuiTheme(themeObject);

axios.defaults.baseURl = 'https://us-central1-socialapi-92b96.cloudfunctions.net/api';

const token = localStorage.getItem('FBIdToken');

if (token) {
	const decodedToken = jwtDecode(token);
	if (decodedToken.exp * 1000 < Date.now()) {
		store.dispatch(logout());
		window.location.href = '/login';
	} else {
		store.dispatch({ type: SET_AUTHENTICATED });
		axios.defaults.headers.common['Authorization'] = token;
		store.dispatch(getUserData());
	}
}

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<Provider store={store}>
				<div className="App">
					<Router>
						<NavBar />
						<div className="container">
							<Switch>
								<Route exact path="/" component={Home} />
								<AuthRoute exact path="/login" component={Login} />
								<AuthRoute exact path="/signup" component={SignUp} />
								<Route exact path="/user/:handle" component={User} />
								<Route exact path="/user/:handle/scream/:screamId" component={User} />
							</Switch>
						</div>
					</Router>
				</div>
			</Provider>
		</MuiThemeProvider>
	);
}

export default App;
