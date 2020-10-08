import MainView from './MainView'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    headerTitle: state.uiReducer.title
  }
}

export default connect(mapStateToProps)(MainView)
