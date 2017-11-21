export const userReducer = (state = {}, action) => {

	switch (action.type) {
		case "FETCH_USER_SUCCESS":
			return {
				user: action.user,
				fetchUserError: false,
				...state
			};

		case "FETCH_USER_ERROR":
			return {
				fetchUserError: true,
				...state
			};

		default:
			return state;
	}

};

export default userReducer;
