export const userReducer = (state = {}, action) => {

	switch (action.type) {
		case "GET_USER_SUCCESS":
			return {
				user: action.user,
				...state
			};

		case "GET_USER_ERROR":
			return state;

		default:
			return state;
	}

};

export default userReducer;
