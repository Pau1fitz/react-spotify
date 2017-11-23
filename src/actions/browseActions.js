export const fetchCategoriesSuccess = (categories) => {
  return {
    type: 'FETCH_CATEGORIES_SUCCESS',
    categories
  }
};

export const fetchCategoriesError = () => {
  return {
    type: 'FETCH_CATEGORIES_ERROR'
  }
};

export const fetchCategories = (accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/browse/categories`, {
    	headers: new Headers({
    	 'Authorization': 'Bearer ' + accessToken
      })
    });
    fetch(request).then(res => {
      return res.json();
    }).then(res => {
      console.log(res)
      dispatch(fetchCategoriesSuccess(res.categories));
    }).catch(err => {
      dispatch(fetchCategoriesError());
    });
  }
};

export const fetchNewReleasesSuccess = (newReleases) => {
  return {
    type: 'FETCH_NEW_RELEASES_SUCCESS',
    newReleases
  }
};

export const fetchNewReleasesError = () => {
  return {
    type: 'FETCH_NEW_RELEASES_CATEGORIES_ERROR'
  }
};

export const fetchNewReleases = (accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/browse/new-releases`, {
    	headers: new Headers({
    	 'Authorization': 'Bearer ' + accessToken
      })
    });
    fetch(request).then(res => {
      return res.json();
    }).then(res => {
      dispatch(fetchNewReleasesSuccess(res.albums));
    }).catch(err => {
      dispatch(fetchNewReleasesError());
    });
  }
}
