import BrowseView from "./component";
import { connect } from "react-redux";

const mapStateToProps = (state) => {

  console.log('statess')

  return {
    categories: state.browseReducer.categories
  }

};


export default connect(mapStateToProps)(BrowseView);
