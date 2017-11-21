import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchUser } from './actions/userActions';
import { setToken } from './actions/tokenActions';
import './App.css';

import UserDetails from './components/UserDetails'
import UserPlaylists from './components/UserPlaylists'

class App extends Component {

  componentDidMount() {

    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    if(!hashParams.access_token) {
        window.location.href = 'https://accounts.spotify.com/authorize?client_id=230be2f46909426b8b80cac36446b52a&response_type=token&redirect_uri=http://localhost:3000/callback';
    } else {
      this.props.setToken(hashParams.access_token);
    }

  }

  showProfile = () => {
    this.props.fetchUser(this.props.token);
  }

  render() {
    return (
      <div className='App'>
        <p onClick={this.showProfile}>
          Click here to load profile
        </p>
        <UserDetails />
      </div>
    );
  }
}

const mapStateToProps = (state) => {

	return {
    token: state.tokenReducer.token
	};

};

const mapDispatchToProps = dispatch => {

	return bindActionCreators({
    fetchUser,
    setToken
  },dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(App);
