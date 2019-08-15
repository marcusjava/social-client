import {
	SET_SCREAMS,
	LOADING_DATA,
	SET_SCREAM,
	LIKE_SCREAM,
	UNLIKE_SCREAM,
	DELETE_SCREAM,
	POST_SCREAM,
	SUBMIT_COMMENT,
} from '../types';

const initialState = {
	screams: [],
	scream: {},
	loading: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_SCREAMS:
			return {
				...state,
				screams: action.payload,
				loading: false,
			};
		case POST_SCREAM:
			return {
				...state,
				screams: [...state.screams, action.payload],
			};
		case SET_SCREAM:
			return {
				...state,
				scream: action.payload,
				loading: false,
			};
		case SUBMIT_COMMENT:
			return {
				...state,
				scream: {
					...state.scream,
					comments: [...state.scream.comments, action.payload],
				},
			};
		case LIKE_SCREAM:
		case UNLIKE_SCREAM:
			let index = state.screams.findIndex(scream => scream.screamId === action.payload.screamId);
			state.screams[index] = action.payload;
			//atualizando o scream
			if (state.scream.screamId === action.payload.screamId) {
				state.scream = action.payload;
			}
			return {
				...state,
			};
		case DELETE_SCREAM:
			index = state.screams.findIndex(scream => scream.screamId === action.payload);
			state.screams.splice(index, 1);
			return {
				...state,
			};
		case LOADING_DATA:
			return {
				...state,
				loading: true,
			};

		default:
			return state;
	}
};
