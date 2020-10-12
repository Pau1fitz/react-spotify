import { connect } from 'react-redux'
import UserDetails from './UserDetails'

const mapStateToProps = (state) => {
	return {
		displayName: state.user.user ? state.user.user.display_name : '',
		userImageUrl: state.user.user && state.user.user.images[0] ? state.user.user.images[0].url : ''
	}
}

export default connect(mapStateToProps)(UserDetails)
