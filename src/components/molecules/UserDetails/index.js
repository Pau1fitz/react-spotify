import { connect } from 'react-redux'
import UserDetails from './UserDetails'

const mapStateToProps = (state) => {
	return {
		displayName: state.userReducer.user ? state.userReducer.user.display_name : '',
		userImageUrl: state.userReducer.user && state.userReducer.user.images[0] ? state.userReducer.user.images[0].url : ''
	}
}

export default connect(mapStateToProps)(UserDetails)
