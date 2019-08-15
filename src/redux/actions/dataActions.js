import {
	SET_SCREAMS,
	LOADING_DATA,
	LIKE_SCREAM,
	UNLIKE_SCREAM,
	DELETE_SCREAM,
	SET_ERRORS,
	LOADING_UI,
	POST_SCREAM,
	CLEAR_ERRORS,
	SET_SCREAM,
	STOP_LOADING_UI,
	SUBMIT_COMMENT,
	SET_USER,
} from '../types';
import axios from 'axios';

export const getScreams = () => dispatch => {
	dispatch({ type: LOADING_DATA });
	axios
		.get('/screams')
		.then(response => {
			dispatch({ type: SET_SCREAMS, payload: response.data });
		})
		.catch(error => dispatch({ type: SET_ERRORS, payload: error.response.data }));
	//TODO em caso de erro retornar um array vazio ao reducer
};

export const getScream = screamId => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.get(`/screams/${screamId}`)
		.then(response => {
			dispatch({ type: SET_SCREAM, payload: response.data });
			dispatch({ type: STOP_LOADING_UI });
		})
		.catch(error => dispatch({ type: SET_ERRORS, payload: error.response.data }));
	//TODO em caso de erro retornar um array vazio ao reducer
};

//Like Scream
export const likeScream = screamId => dispatch => {
	axios
		.get(`/screams/${screamId}/like`)
		.then(res => dispatch({ type: LIKE_SCREAM, payload: res.data }))
		.catch(error => console.error(error));
};

//Like Scream
export const unlikeScream = screamId => dispatch => {
	axios
		.get(`/screams/${screamId}/unlike`)
		.then(res => dispatch({ type: UNLIKE_SCREAM, payload: res.data }))
		.catch(error => console.error(error));
};

export const deleteScream = screamId => dispatch => {
	axios
		.delete(`/screams/${screamId}`)
		.then(res => dispatch({ type: DELETE_SCREAM, payload: screamId }))
		.catch(error => console.log(error));
};

export const postScream = newScream => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.post('/screams', newScream)
		.then(res => {
			dispatch({ type: POST_SCREAM, payload: res.data });
			dispatch({ type: CLEAR_ERRORS });
		})
		.catch(error => {
			dispatch({ type: SET_ERRORS, payload: error.response.data });
		});
};

export const clearErrors = () => dispatch => {
	dispatch({ type: CLEAR_ERRORS });
};

export const submitComment = (screamId, commentData) => dispatch => {
	axios
		.post(`/screams/${screamId}/comment`, commentData)
		.then(res => {
			console.log(res.data);
			dispatch({ type: SUBMIT_COMMENT, payload: res.data });
			dispatch(clearErrors());
		})
		.catch(error => {
			console.error(error);
			dispatch({ type: SET_ERRORS, payload: error.response.data });
		});
};

export const getUserData = handle => dispatch => {
	dispatch({ type: LOADING_DATA });
	axios
		.get(`/user/${handle}`)
		.then(res => {
			//dispatch({ type: SET_USER, payload: res.data.user });
			dispatch({ type: SET_SCREAMS, payload: res.data.screams });
			dispatch(clearErrors());
		})
		.catch(error => {
			dispatch({ type: SET_SCREAMS, payload: null });
		});
};
