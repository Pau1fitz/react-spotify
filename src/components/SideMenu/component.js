import React, { Component } from 'react';
import './SideMenu.css';

class SideMenu extends Component {

  handleClick = (name)  => {
    this.props.updateHeaderTitle(name);
    this.props.updateViewType(name);
  }

  renderSideMenu() {
    const menu = [
      {
        name: 'Recently Played',
        action: this.props.fetchRecentlyPlayed
      },
      {
        name: 'Songs',
        action: this.props.fetchSongs
      },
      {
        name: 'Albums',
        action: this.props.fetchAlbums
      },
      {
        name: 'Artists',
        action: this.props.fetchArtists,
        getArtists: true
      }
    ];

    return menu.map(item => {
      return <li key={ item.name } className='side-menu-item' onClick={() => {item.getArtists ? item.action(this.props.token, this.props.artistIds) : item.action(this.props.token); this.handleClick(item.name) }}>{ item.name }</li>
    })
  }



  render() {

    return (
      <ul className='side-menu-container'>
        <h3 className='user-library-header'>Your Library</h3>
        {
          this.renderSideMenu()
        }
      </ul>
    );
  }
}

export default SideMenu;
