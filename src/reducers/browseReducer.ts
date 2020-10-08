// @ts-nocheck
export const browseReducer = (state = {}, action) => {
  switch (action.type) {
  case "FETCH_CATEGORIES_SUCCESS":
    return {
      ...state,
      view: action.categories.items,
      fetchCategoriesError: false
    };

  case "FETCH_CATEGORIES_ERROR":
    return {
      ...state,
      fetchCategoriesError: true
    };

  case "FETCH_NEW_RELEASES_SUCCESS":
    return {
      ...state,
      view: action.newReleases.items,
      fetchNewReleasesError: false
    };

  case "FETCH_NEW_RELEASES_ERROR":
    return {
      ...state,
      fetchNewReleasesError: true
    };

  case "FETCH_FEATURED_SUCCESS":
    return {
      ...state,
      view: action.featured.items,
      fetchFeaturedError: false
    };

  case "FETCH_FEATURED_ERROR":
    return {
      ...state,
      fetchFeaturedError: true
    };

  default:
    return state;
  }
};

export default browseReducer;
