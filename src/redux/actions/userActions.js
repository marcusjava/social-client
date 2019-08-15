import {
	SET_USER,
	SET_ERRORS,
	CLEAR_ERRORS,
	LOADING_UI,
	SET_AUTHENTICATED,
	SET_UNAUTHENTICATED,
	LOADING_USER,
	MARK_NOTIFICATIONS_READ,
} from '../types';
import axios from 'axios';

const setAuthorizationToken = token => {
	const FBIdToken = `Bearer ${token}`;
	localStorage.setItem('FBIdToken', FBIdToken);
	axios.defaults.headers.common['Authorization'] = FBIdToken;
};

export const login = (userData, history) => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.post('/login', userData)
		.then(response => {
			setAuthorizationToken(response.data.token);
			dispatch(getUserData());
			dispatch({ type: CLEAR_ERRORS });
			history.push('/');
		})
		.catch(error => {
			console.info(error.response.data);
			dispatch({ type: SET_ERRORS, payload: error.response.data });
		});
};

export const getUserData = () => dispatch => {
	dispatch({ type: LOADING_USER });
	axios
		.get('/user')
		.then(response => {
			dispatch({ type: SET_USER, payload: response.data });
		})
		.catch(error => {
			//error
			console.log(error);
		});
};

export const signup = (userData, history) => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.post('/signup', userData)
		.then(response => {
			setAuthorizationToken(response.data.token);
			dispatch(getUserData());
			dispatch({ type: CLEAR_ERRORS });
			history.push('/');
		})
		.catch(error => {
			console.info(error.response.data);
			dispatch({ type: SET_ERRORS, payload: error.response.data });
		});
};

export const uploadImage = formData => dispatch => {
	dispatch({ type: LOADING_USER });
	axios
		.post('/user/image', formData)
		.then(response => dispatch(getUserData()))
		.catch(error => console.log(error));
};

export const editUserDetails = details => dispatch => {
	dispatch({ type: LOADING_USER });
	axios
		.post('/user', details)
		.then(() => {
			dispatch(getUserData());
		})
		.catch(error => console.log(error));
};

export const logout = () => dispatch => {
	localStorage.removeItem('FBIdToken');
	delete axios.defaults.headers.common['Authorization'];
	dispatch({ type: SET_UNAUTHENTICATED });
};

export const markNotificationsAsRead = notificationsIds => dispatch => {
	axios
		.post('/notifications', notificationsIds)
		.then(res => {
			dispatch({ type: MARK_NOTIFICATIONS_READ });
		})
		.catch(error => console.log(error));
};
