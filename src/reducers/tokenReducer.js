export const tokenReducer = (state = {}, action) => {

	switch (action.type) {

		case "SET_TOKEN":
			return {
				token: action.token,
				...state
			}

		default:
			return state;
	}

};

export default tokenReducer;
