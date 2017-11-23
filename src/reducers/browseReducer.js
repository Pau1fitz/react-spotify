export const browseReducer = (state = {}, action) => {

	switch (action.type) {

	case "FETCH_CATEGORIES_SUCCESS":
		return {
			...state,
      categories: action.categories,
      fetchCategoriesError: false
		}

  case "FETCH_CATEGORIES_ERROR":
    return {
      ...state,
      fetchCategoriesError: true
    }

	default:
		return state;
	}

};

export default browseReducer;
