export const userReducer = (state = {}, action) => {

	switch (action.type) {
		case "GET_USER_SUCCESS":
			return {
				user: action.user,
				fetchUserError: false,
				...state
			};

		case "GET_USER_ERROR":
			return {
				fetchUserError: true,
				...state
			};

		default:
			return state;
	}

};

export default userReducer;
