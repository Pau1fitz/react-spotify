export const tokenReducer = (state = {}, action) => {
  switch (action.type) {

  case "SET_TOKEN":
    return {
      ...state,
      token: action.token
    };

  default:
    return state;
  }

};

export default tokenReducer;
