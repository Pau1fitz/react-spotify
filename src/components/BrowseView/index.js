import BrowseView from "./component";
import { connect } from "react-redux";

const mapStateToProps = (state) => {

  return {
    view: state.browseReducer.view
  }

};


export default connect(mapStateToProps)(BrowseView);
