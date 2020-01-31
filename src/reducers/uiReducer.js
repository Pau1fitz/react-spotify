const defaultState = {
  title: "Songs"
};

export const uiReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "UPDATE_HEADER_TITLE":
      return {
        ...state,
        title: action.title
      };

    default:
      return state;
  }
};

export default uiReducer;
